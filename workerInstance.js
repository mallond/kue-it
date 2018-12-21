/* eslint-disable no-console */
const kue = require('kue');

const queue = kue.createQueue();
console.log('Worker Connected and Waiting to process job: Queue is oneMillion');
queue.process('oneMillion', (job, done) => {

  const sequence = parseInt(job.data.sequence);
  //if ((sequence % 1000) === 1) {
    console.log(`Worker job completed: ${job.data.title} ${job.data.jobName} ${job.data.sequence}`)
  //}

  //done(null, `Title: ${job.data.title} Job: ${job.data.jobName} Sequence: ${job.data.sequence} completed`);
  done(null, {jobName: job.data.jobName, title:job.data.title, sequence:job.data.sequence})



});

