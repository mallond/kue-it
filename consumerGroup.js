//const RedisStreams= require("redis-streams-aggregator");
//const streams = new RedisStreams({
//  host: "127.0.0.1",
//  port: 6379
//}); // options like: { host: ..., port: ... } etc

//// Sign up for XREAD, get all messages to 'testId' in real-time
//streams.subscribe("onemillion", messages => {
//  console.log("I got messages!", { messages });
//});

// Write data to a stream (very thin wrapper around XADD)
//streams.add("testId", { value: "foobar" });
//streams.add("testId", { value: "foobar" });
//streams.add("testId", { value: "foobar" });
//streams.add("testId", { value: "foobar" });
//streams.add("testId", { value: "foobar" });
//streams.add("testId", { value: "foobar" });
//streams.add("testId", { value: "foobar" });
//streams.add("testId", { value: "foobar" });

