/**
 *
 * Lets test One Million tid bits of Data
 * bizrez.com David Mallon
 *
 */
const Redis = require('redis-stream');
let client = new Redis(6379, 'localhost');

// Test Data from https://www.json-generator.com
const testData = [
  {
    "_id": "5c265a65fb64deb6d260bff0",
    "index": 0,
    "guid": "06d12c3e-8645-4ba2-89c0-46816e2be6a5",
    "isActive": true,
    "balance": "$1,534.24",
    "picture": "http://placehold.it/32x32",
    "age": 36,
    "eyeColor": "blue",
    "name": "Samantha Browning",
    "gender": "female",
    "company": "CEMENTION",
    "email": "samanthabrowning@cemention.com",
    "phone": "+1 (876) 431-3062",
    "address": "227 Lake Street, Tolu, Wisconsin, 9135",
    "about": "Cillum commodo exercitation cillum officia in veniam nulla cillum sit nulla magna sunt labore nisi. Cillum velit ipsum adipisicing voluptate veniam eu ipsum eu pariatur. Sit amet commodo commodo aliquip in qui velit in voluptate aliqua. In exercitation incididunt consequat quis id cillum nostrud. Culpa do ad laborum magna veniam laborum velit eu ad Lorem minim esse.\r\n",
    "registered": "2015-01-21T04:09:13 +08:00",
    "latitude": 32.387261,
    "longitude": -57.933106,
    "greeting": "Hello, Samantha Browning! You have 6 unread messages.",
    "favoriteFruit": "banana"
  }
];

const printMem = ()=>{
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  console.log('job count ', counter)
  forceGC();
};

// Stringify to be stored on the list
const testDataString = JSON.stringify(testData, 2, null);

//lpush.pipe(process.stdout) // fyi: Displays to console

const startDate = new Date();

let lpush = client.stream('lpush', 'onemillion');

const processThisMany = 100000;
let counter = 0;



// Load the List super Fast
let processList = [];
let inc = 0;
for (let i=0; i<processThisMany; i++ ) {
  processList.push(testDataString);
}

const doIt = (processList)=>{
  console.log(`Loading ${processThisMany} ...`);
  // Asynchronously process the loaded list
  processList.forEach((item)=>{
    counter++;
    lpush.write(`{"increment":"${inc++}", "data":${item}}`);
    // Clear the Buffer after 100K and Data is this size
    if (inc % 1000===0) {
      lpush.end();
      lpush = client.stream('lpush', 'onemillion');
      //forceGC();
    }
  });


};

// You need to Check in groups; otherwise REDIS will hang
doIt(processList);


processList=null;
lpush.end();

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
  console.log(`Finish loading JSON to Redis ${(endDate - startDate)/1000}s`);
});




