const redis = require('redis');
const client = redis.createClient();

class Worker {
  constructor(id) {
    this.id = id;
    let counter = 0;
    const they = this;

    console.log(`WorkerId:${this.id}`)

    // BRPOP Block on Pop - keep promise chain alive
    const waitForPush = (message) => {
      return new Promise((resolve, reject) => {

        client.brpop(['onemillion', 0], function (listName, item) {
          // do stuff
          const data = {};
          const result = JSON.parse(item[1]);
          resolve(data.increment)
          counter++;
        });

        client.incr('oneMillionDoneDone', function (err, reply) {
          if (err) {
            console.log(`oneMilllionDoneDone errors ${err}`); // 11
          } else {
            //console.log(they.id)
          }
        });

      }).then((message) => {
        //console.log(`Increment: ${message}`)
        waitForPush();
      })
    };

    waitForPush();

  }
}

module.exports = Worker;