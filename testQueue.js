const faQueue = require("faqueue");
const queue = require("faqueue/queue");

faQueue.connect("0.0.0.0",8586,3);
let queueObject =  new queue({name: "test", interval: 3000, cb: receivedQueue,max_try:2});

async function receivedQueue(data) {
    console.log(data.message);
    if(data.message.status===false)
        await queueObject.setAsFailed(data);
}

async function testQueue() {
    await queueObject.addToQueue({data: "hello",status:false});
    await queueObject.addToQueue({data: "hello world",status:true});
    await queueObject.startFetch();
}

testQueue();