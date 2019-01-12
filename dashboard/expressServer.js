/* eslint-disable no-console */
const express = require('express');
const uuidv1 = require('uuid/v1');
const cors = require('cors')
const Redis = require('redis');
const app = express();
app.use(cors());
const Worker = require('./redisWorker');

const client = Redis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});

const beginDateTime = new Date();
let transactionsRequested = null;
let jobStack = [];
const jobDescription = {
  jobName:'',
  consumerCount:10,
  doneDone:false,
  transactionsRequested:0,
  transactionsCompleted:0
}

app.get('/', (req, res) => res.send('Example: http://localhost:3001/initialize?jobName=OneHundredThousand&transactions=100000'));

app.get('/jobStatus', (req, res) => { 

  client.get("oneMillionDoneDone", function(err, reply) {
    // reply is null when the key is missing
    console.log(typeof reply);
    jobDescription.transactionsCompleted = parseInt(reply);
    jobDescription.doneDone= (jobDescription.transactionsCompleted === jobDescription.transactionsRequested)?true:false;
    console.log(jobDescription.transactionsCompleted,jobDescription.transactionsRequested)
    jobDescription.consumerCount = jobStack.length;    
    res.send(jobDescription);
  });
})

app.get('/workers', (req, res) => { 
  jobStack = [];
  console.log('Workers Needed: ', req.query.workers)
  const workers = parseInt(req.query.workers); 

  // Create Workers aka Consumers
  for (let index = 0; index < workers; index++) {
    console.log('creating worker....')
    jobStack.push(new Worker(uuidv1()));
    console.log('length:', jobStack.length)
  }
  res.send(`workers: ${req.query.workers} created: ${jobStack.length}`);
});

app.get('/initialize', (req, res) => {

  jobStack = [];

  jobDescription.jobName = req.query.jobName;
  jobDescription.consumerCount = parseInt(req.query.consumers);
  jobDescription.doneDone = false;
  jobDescription.transactionsRequested = parseInt(req.query.transactions);
  jobDescription.transactionsCompleted = 0;

  console.log('type of worker is:', typeof Worker, Worker);
  console.log('Request Query Values: ', jobDescription.transactionsRequested);
  client.set(`jobName`, req.query.jobName, Redis.print);
  client.set(`numberOfObjects`, req.query.transactions, Redis.print);
  client.set(`producerCount`, 0, Redis.print);
  client.set(`consumerCount`, jobDescription.consumerCount, Redis.print);
  client.set('oneMillionDoneDone', 0, Redis.print);

  // Create Workers aka Consumers
  for (let index = 0; index < jobDescription.consumerCount; index++) {
    console.log('creating worker....')
    jobStack.push(new Worker(uuidv1()));
    console.log('length:', jobStack.length)
  }

  console.log(`Initialize JobStack Count:${jobStack.length}`)

  res.send(`Initialize Job: ${jobDescription.jobName} Transactions: ${jobDescription.transactionsRequested }`);
});

// Compact jobStack
setInterval(() => {
  process.stdout.write('\033c');
  const used = process.memoryUsage();
  //for (let key in used) {
  //   console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  //  }
  console.log(`Interval JobStack Count:${jobStack.length}`)

}, 300000);


app.listen(3001, () => console.log('Example app listening on port 3001!'));