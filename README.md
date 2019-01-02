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




### Use Case 1,000,000 JSON objects using piping and streams

>> A medium complex payload processed a million times. Which intails loading 1 million into a Redis List and processing these with five workers. 

1. Start 5 instances of the below

```
> node JSONs_fromList.js 
> node JSONs_fromList.js 
> node JSONs_fromList.js 
> node JSONs_fromList.js 
> node JSONs_fromList.js 

```

2. Load 1,000,000 Json objects X5 

```
500,000

$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 

Next 500,000
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js  
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 
$ node --max-old-space-size=8192 --expose-gc JSONs_toList.js 
```

Note: I needed to Load 100000 at a time; otherwise when I did load 1 Million
the system would crash - Chunking the process down seems to help. Seems that on my laptop when Redis reached 500mb of memory the system would lock. 

>> Result: 1 Million JSONS Queued and processed in 1 minute 41 seconds.









