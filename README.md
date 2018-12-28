# kue-it
A Distributed Queue Batch Job - POC

## Objective
I want to See 1 Million Objects run and Scale!

### Use Case 100000 Pass through objects

This demo is super simple, in that it only pass is an object to the queue worker. 

1. Start up 20 simulated servers
`
 open a terminal - start 20 instances 
 
 >  pm2 start pm2.json 
 
 >  pm2 logs  

We could use PM2 scaling; however, we are on cheap single core AWS instances. We can simulate this with pm2 

`

2. Start the server
`
  open 1 terminal and start the express server. This will be used to submit the job
  > node expressServer.js 
  
  Execute this browser url: http://localhost:3001/create?jobName=tada&transactions=100000
  
`

The result on my Mac Pro was 100,000 transactions in 45 seconds




### Use Case 100000 JSON objects using piping and streams









