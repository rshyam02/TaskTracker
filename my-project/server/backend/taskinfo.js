const fs=require("fs");
const mongoose= require("mongoose");
 
const mongouri="mongodb://localhost:27017/admin";
mongoose.connect(mongouri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("mongodb connected successfully"))
    .catch((err)=>console.log("mongodb connection error "+err));
 
const taskschema=new mongoose.Schema({
    taskname: String,
    priority: String,
    datetime: String,
    time: String,
    status: Boolean
   
});
const task= mongoose.models.Task || mongoose.model("Task",taskschema);
 
const taskinfo=async(req,res)=>{
    let high_priority=0,completed=0,not_completed=0,low_priority=0,total_task=0;
    total_task=await task.countDocuments();
    high_priority= await task.countDocuments({priority:'high'});
    low_priority=  await task.countDocuments({priority:'low'});
    completed= await task.countDocuments({status:true});
    not_completed= await task.countDocuments({status:false});
 
    const tasks= await task.find();
 
    // tasks.forEach((taskDocument)=>{
    //     console.log("Task Document:");
    //     for(const field in taskDocument.toObject()){
    //         if(field=="priority"){
    //             if(taskDocument[field]=="high"){
    //                 high_priority++;
    //             }
    //             else{
    //                 low_priority++;
    //             }
    //         }
    //         if(field=="status"){
               
    //             if(taskDocument[field]==true){
    //                 completed++;
    //             }
    //             else{
    //                 not_completed++;
    //             }
    //         }
 
           
    //     }
    // });
    return {high_priority,low_priority,completed,not_completed,total_task};
 
}
module.exports={taskinfo};