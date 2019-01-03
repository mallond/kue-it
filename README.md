# kue-it
A Distributed Queue Batch Job - POC

## Objective
I want to See 1 Million Objects run and Scale!

### Use Case 100,000 Pass through objects using Kue - FAIL too slow (relative fail). I am wanting sub second pass-through 

This demo is super simple, in that it only pass is an object to the queue worker. 

1. Start up 20 simulated servers
```
 open a terminal - start 20 instances 
 
 $ pm2 start pm2-20-instances.json
 
 $  pm2 logs 
 
```  

We could use PM2 scaling; however, we are on cheap single core AWS instances. We can simulate this with pm2 



2. Start the server
```
  open 1 terminal and start the express server. This will be used to submit the job
  $ node expressServer.js 
  
  Execute this browser url: http://localhost:3001/create?jobName=tada&transactions=100000
  
```

The result on my Mac Pro was 100,000 transactions in 1.43 seconds




### Use Case 1,000,000 JSON objects using streams

>> A medium complex payload processed a million times. Which intails loading 1 million into a Redis List and processing these with twenty workers. 

1. Start 20 instances via pm2

```

> pm2 start pm2-20-fromList-instances.json


```

2. Load 1,000,000 Json objects 

```
$ npm run oneMillion

This basicaly chunks streams into 100 K writes x 10

```
>> Result: 1 Million JSONS Queued and processed in 1 minute 8 seconds.

Problem: 
I needed to Load 100000 at a time; otherwise when I did load 1 Million
the system would crash - Chunking the process down seems to help. Seems that on my laptop when Redis reached 500mb of memory the system would lock. 

Solution: 
redis-cli enter this command $ config set maxmemory 4gb












