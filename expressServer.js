/* eslint-disable no-console */
const express = require('express');
const kue = require('kue');
const uuidv1 = require('uuid/v1');
const _ = require('underscore');

const app = express();
const queue = kue.createQueue();

let jobStack = [];

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
          jobStack = _.reject(jobStack, (d)=>{
            return d.index === result.title;
          });
        });
        job.on('failed', () => {
          console.log('error');
        });
      });

  // Job index put on the stack
  const jobIndex = {index: title, job: job};
  jobStack.push(jobIndex);

};

app.get('/', (req, res) => res.send('Example: http://localhost:3001/create?jobName=tada&transactions=11'));
app.get('/create', (req, res) => {

  console.log(req.query)
  const transactions = parseInt(req.query.transactions);

  for (let i=0; i<transactions; i++) {
    createJob(req.query.jobName, i);
  }

  res.send(`Job Created and Submitted to stack ${jobStack.length} Transactions: ${req.query.jobName}`);


});

// Dump the JobStack length
setInterval(()=>{
  if (jobStack.length>0) {
    console.log('Objects on the JobStack:',jobStack.length)
  }
},1000);

app.listen(3001, () => console.log('Example app listening on port 3001!'));
