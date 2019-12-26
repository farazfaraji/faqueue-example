const faQueue = require("faqueue");
const job = require("faqueue/job");

faQueue.connect("0.0.0.0",8586,3);
let jobObject =  new job({name: "test",max_try:2},jobReceived);

async function jobReceived(data){
    console.log(data.message);
    if(data.message.status===false)
        await jobObject.setAsFailed(data);
}

async function testJob(){
    await jobObject.addJob({data:"hello",status:false},{second:3});
    await jobObject.addJob({data:"hello 1",status:true},{second:3,hour:4});
    await jobObject.addJob({data:"hello 2",status:false},{second:3,minute:21,hour:3,day:2});
}
testJob();