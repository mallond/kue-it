
'use strict';
const redis = require('redis');
const client = redis.createClient();

let counter = 0;

// BRPOP Block on Pop - keep promise chain alive
const waitForPush = (message)=>{
  return new Promise((resolve, reject)=>{

    client.brpop(['onemillion',0], function (listName, item) {
      // do stuff
      const data = JSON.parse(item[1]);
      resolve(data.increment)
      counter++;

    });

    client.incr('oneMillionDoneDone', function(err, reply) {
      console.log(err); // 11
    });

  }).then((message)=>{
    //console.log(`Increment: ${message}`)
    waitForPush();
  })
};

waitForPush();


setInterval(()=>{

  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  console.log('job count ', counter)

},1000);


