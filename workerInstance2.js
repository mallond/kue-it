/* eslint-disable no-console */


'use strict';
const redis = require('redis');
const publisher = redis.createClient();
const consumerList = [];

let consumers = 0;

class Consumer {
  constructor() {

    this.client = redis.createClient();
    this.client.id = consumers++;
    this.client.on('message', function (channel, message) {
      console.log(`Client: ${this.id}  ${channel} : ${message}`);
    });
    this.client.subscribe(`onemillion:${this.client.id}`);
    this.client.on('ready', function () {
      console.log(`Client:${this.id}`)

    });

  }
  set name(name) {
    this._name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  get name() {
    return this._name;
  }
  sayHello() {
    console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id);
  }
}

consumerList.push(new Consumer());
consumerList.push(new Consumer());
consumerList.push(new Consumer());
consumerList.push(new Consumer());
consumerList.push(new Consumer());
consumerList.push(new Consumer());
consumerList.push(new Consumer());

let cnt = 0;
let total = 0;
setInterval(()=>{


  publisher.publish(`onemillion:${cnt}`, total++);
  if (cnt>consumerList.length) {
    cnt = 0;
  } else {
    cnt++
  }


},1);


