var Redis = require('../')
    , client = new Redis(6379, 'localhost')
    , lpush = client.stream('lpush', 'onemillion');

lpush.pipe(process.stdout)
var startDate = new Date();
for (var i=0; i<1000000; i++) {
  lpush.write(`value:${i}`);
}
var endDate = new Date();
console.log(endDate-startDate);

lpush.end()