
'use strict';
const redis = require('redis');
const client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);


function waitForPush () {
  client.brpop(['onemillion',0], function (listName, item) {
    // do stuff
    const data = JSON.parse(item[1])
    if (data.increment % 1000 === 0) {
      console.log(`Increment: ${data.increment}`)
    }

    //console.log(`item: ${item[1].data}`);
    return waitForPush();
  })
};

waitForPush();

