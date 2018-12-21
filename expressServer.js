/* eslint-disable no-console */
const express = require('express');
const kue = require('kue');
const uuidv1 = require('uuid/v1');


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
        jobStack.push(job);

        job.on('complete', (result) => {
          // Job index removed from the stack
          var index = jobStack.findIndex((i) => {
            //console.log('i:',i.data.title, result.title)
            return i.data.title === result.title
          }); // 0
          // Remove Job from jobStack
          if (index>0) {
           jobStack.splice(index,1);
          }

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
  }

  res.send(`Job Created and Submitted to stack ${jobStack.length} Transactions: ${req.query.jobName}`);

});

// Compact jobStack
setInterval(()=>{

  process.stdout.write('\033c');
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }

},5000);

app.listen(3001, () => console.log('Example app listening on port 3001!'));
