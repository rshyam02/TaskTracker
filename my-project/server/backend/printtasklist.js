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
    time: String
    
});
const task= mongoose.models.Task || mongoose.model("Task",taskschema);
const printtask=async(req,res)=>{
    try{
        const tasks= await task.find();
        return tasks;
    }
    catch(err){
        console.log("error fetching task:"+err);
        return "error fetching task:";

    }
}
module.exports={printtask};
