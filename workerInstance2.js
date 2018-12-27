/* eslint-disable no-console */
const kue = require('kue');
var Redis = require('ioredis');

var client = new Redis();

const queue = kue.createQueue();
console.log('Worker Connected and Waiting to process job: Queue is oneMillion');
queue.process('oneMillion', (job, done) => {

  const sequence = parseInt(job.data.sequence);
  if ((sequence % 10000) === 1) {
    console.log(`Worker job completed: ${job.data.title} ${job.data.jobName} ${job.data.sequence}`)
  }

  //done(null, `Title: ${job.data.title} Job: ${job.data.jobName} Sequence: ${job.data.sequence} completed`);
  done(null, {jobName: job.data.jobName, title:job.data.title, sequence:job.data.sequence})



  client.incr(job.data.jobName, function(err, reply) {
    //console.log(reply); // 11
  });

  client.get('tada').then((value)=>{
    client.publish('tada', value);
  })




});

