/**
 *
 * Lets test One Million tid bits of Data
 * bizrez.com David Mallon
 *
 */
const Redis = require('redis-stream');
let client = new Redis(6379, 'localhost');
const csv = require('fast-csv');

// Test Data from https://www.json-generator.com


const printMem = ()=>{
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }

  forceGC();
};

const doIt = (howManyObjects)=>{

let lpush = client.stream('lpush', 'onemillion');  

const processThisMany = howManyObjects;

// Load the List super Fast
  let processList = [];
  let inc = 0;
  csv
    .fromPath("./csv/01/100k.csv")
    .on("data", function (data) {
      const payload = {};
      payload.fname = data[1];
      payload.lname = data[2];
      payload.email = data[3]
      processList.push(JSON.stringify(payload));
      //console.log(payload);
    })
    .on("end", function () {
      console.log("done");
      processList.forEach((item)=>{
        
        lpush.write(`{"increment":"${inc++}", "data":${item}}`);
        // Clear the Buffer after 100K and Data is this size
        if (inc % 1000===0) {
          lpush.end();
          lpush = client.stream('lpush', 'onemillion');
          //forceGC();
        }
      });
      lpush.end();
    });

  console.log(`Loading ${processThisMany} ...`);


};

function forceGC() {
  if (global.gc) {
    global.gc();
  } else {
    console.warn('No GC hook! Start your program as `node --expose-gc file.js`.');
  }
}

process.on('exit', function (){
  console.log('Goodbye!');
  let endDate = new Date();
});

module.exports = doIt
