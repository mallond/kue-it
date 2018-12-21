/* eslint-disable no-console */
const express = require('express');
const kue = require('kue');
const uuidv1 = require('uuid/v1');
const _ = require('underscore');

const app = express();
const queue = kue.createQueue();

let jobStack = 0;

const createJob = (jobName, sequence)=>{

  const title = uuidv1();
  const job = queue.create('oneMillion', {
    title: title,
    jobName: jobName,
    sequence: sequence
  })
      .removeOnComplete(true)
      .save((err) => {
        if (err) {
          console.log('error');
          return;
        }
        job.on('complete', (result) => {
          // Job index removed from the stack
          jobStack--;
        });
        job.on('failed', () => {
          console.log('error');
        });
      });

};

app.get('/', (req, res) => res.send('Example: http://localhost:3001/create?jobName=tada&transactions=11'));
app.get('/create', (req, res) => {

  console.log(req.query)
  const transactions = parseInt(req.query.transactions);

  for (let i=0; i<transactions; i++) {
    createJob(req.query.jobName, i);
    jobStack++;
  }

  res.send(`Job Created and Submitted to stack ${jobStack.length} Transactions: ${req.query.jobName}`);


});

// Compact jobStack
setInterval(()=>{
  if (jobStack>0) {
    console.log('Objects on the JobStack:',jobStack);
  }
},1000);

app.listen(3001, () => console.log('Example app listening on port 3001!'));
