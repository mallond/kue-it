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
    "tags": [
      "dolor",
      "adipisicing",
      "exercitation",
      "Lorem",
      "deserunt",
      "cillum",
      "magna"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Richmond Bridges"
      },
      {
        "id": 1,
        "name": "Sheena Mckinney"
      },
      {
        "id": 2,
        "name": "Daisy Keith"
      }
    ],
    "greeting": "Hello, Samantha Browning! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5c265a654644442901e72dcf",
    "index": 1,
    "guid": "68a9ebfc-7f99-4d6a-9fda-3b30da8aec61",
    "isActive": true,
    "balance": "$1,589.72",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "blue",
    "name": "Twila Hill",
    "gender": "female",
    "company": "SCENTRIC",
    "email": "twilahill@scentric.com",
    "phone": "+1 (970) 535-3557",
    "address": "945 Albemarle Road, Avalon, Alabama, 2224",
    "about": "Aliquip culpa deserunt pariatur dolore excepteur est. Enim et eiusmod non incididunt aute voluptate dolore magna fugiat esse cillum. Enim dolore et id do dolor in reprehenderit commodo aute cillum.\r\n",
    "registered": "2016-05-08T06:09:51 +07:00",
    "latitude": -62.223812,
    "longitude": -167.850181,
    "tags": [
      "officia",
      "enim",
      "mollit",
      "mollit",
      "irure",
      "exercitation",
      "velit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Tanner Hensley"
      },
      {
        "id": 1,
        "name": "Mariana Hardin"
      },
      {
        "id": 2,
        "name": "Mcdonald Gamble"
      }
    ],
    "greeting": "Hello, Twila Hill! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5c265a65b3670ddef03c8325",
    "index": 2,
    "guid": "2ce1887f-0da2-4a86-9476-6f21106c9bcb",
    "isActive": true,
    "balance": "$1,318.45",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "green",
    "name": "Darla Newman",
    "gender": "female",
    "company": "OTHERWAY",
    "email": "darlanewman@otherway.com",
    "phone": "+1 (903) 582-2157",
    "address": "313 Jefferson Street, Tyro, Michigan, 7637",
    "about": "Ad consectetur ad commodo eiusmod duis tempor non culpa occaecat minim. Eiusmod excepteur est sit nulla mollit pariatur ut fugiat id aute nulla eu commodo ullamco. Laborum fugiat magna qui mollit. Ex quis ea dolor cillum laboris ullamco.\r\n",
    "registered": "2017-08-25T09:39:21 +07:00",
    "latitude": -20.117229,
    "longitude": 70.782312,
    "tags": [
      "anim",
      "aliqua",
      "enim",
      "et",
      "anim",
      "aliqua",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Stokes Garrett"
      },
      {
        "id": 1,
        "name": "Olsen Galloway"
      },
      {
        "id": 2,
        "name": "Alexis Long"
      }
    ],
    "greeting": "Hello, Darla Newman! You have 8 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5c265a65807ed615baafc3eb",
    "index": 3,
    "guid": "3c03b5cc-6264-403c-8082-164e186b05a2",
    "isActive": true,
    "balance": "$2,253.84",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "green",
    "name": "Walls Wilkins",
    "gender": "male",
    "company": "SOFTMICRO",
    "email": "wallswilkins@softmicro.com",
    "phone": "+1 (943) 401-3188",
    "address": "359 Sackman Street, Bayview, Nevada, 7684",
    "about": "Minim veniam elit irure consequat ut officia anim veniam aliqua esse consectetur. Eu esse aute Lorem id ea officia non dolore duis ad id. Pariatur exercitation ipsum consectetur magna dolor ea. Ex et eu laborum aute.\r\n",
    "registered": "2018-02-24T05:01:58 +08:00",
    "latitude": -71.214629,
    "longitude": 28.83565,
    "tags": [
      "Lorem",
      "excepteur",
      "id",
      "quis",
      "consectetur",
      "nostrud",
      "reprehenderit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Rice Stevenson"
      },
      {
        "id": 1,
        "name": "Irwin Moreno"
      },
      {
        "id": 2,
        "name": "Carey Rasmussen"
      }
    ],
    "greeting": "Hello, Walls Wilkins! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5c265a65cdd9d89d3eea2a5e",
    "index": 4,
    "guid": "73cc01a5-868d-4d61-ab2c-11e8bdfd7d56",
    "isActive": true,
    "balance": "$3,988.59",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "green",
    "name": "Edwina Davidson",
    "gender": "female",
    "company": "QUORDATE",
    "email": "edwinadavidson@quordate.com",
    "phone": "+1 (967) 411-2797",
    "address": "810 Boynton Place, Highland, Tennessee, 6372",
    "about": "Aliqua officia aliqua ad incididunt. Eu ex officia nisi cupidatat mollit deserunt duis consectetur cillum laboris sunt ullamco culpa. Laboris dolor ut commodo cupidatat officia. Sit duis nulla incididunt pariatur laborum officia laborum elit consectetur do minim ad ipsum ut. Sint enim magna Lorem nulla quis. Labore enim exercitation veniam ad dolor ad. Do ad reprehenderit labore occaecat incididunt exercitation id voluptate sit sit dolore.\r\n",
    "registered": "2016-02-14T11:40:59 +08:00",
    "latitude": -18.301093,
    "longitude": -139.280632,
    "tags": [
      "nisi",
      "et",
      "fugiat",
      "nostrud",
      "incididunt",
      "deserunt",
      "labore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Tessa Johnston"
      },
      {
        "id": 1,
        "name": "Good Stanley"
      },
      {
        "id": 2,
        "name": "King Blanchard"
      }
    ],
    "greeting": "Hello, Edwina Davidson! You have 1 unread messages.",
    "favoriteFruit": "apple"
  }
];

// Stringify to be stored on the list
const testDataString = JSON.stringify(testData, 2, null);

//lpush.pipe(process.stdout) // fyi: Displays to console

const startDate = new Date();

let lpush = client.stream('lpush', 'onemillion');

const processThisMany = 500000;
let counter = 0;
console.log(`Loading ${processThisMany} ...`);
for (var i = 0; i < processThisMany; i++) {
  counter++;
  lpush.write(`{"increment":"${i}", "data":${testDataString}}`);
  // Clear the Buffer after 100K and Data is this size
  if (i % 1000===0) {
     lpush.end();
     lpush = client.stream('lpush', 'onemillion');
     forceGC();
  }
}
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
  console.log(`Finish loading ${processThisMany} to Redis ${(endDate - startDate)/1000}s`);
});


setInterval(()=>{

  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
  console.log('job count ', counter)


},1000);


