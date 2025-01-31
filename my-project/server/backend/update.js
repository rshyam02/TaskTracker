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

const updatetask=async(id,taskname,priority,datetime,time)=>{
    try{
        const updatestatus=await task.findByIdAndUpdate(id,{taskname,priority,datetime,time},{new:true});
        console.log("UPDATE STATUS\n\n\n" + updatestatus);
        if(!updatestatus){
            return "task not found";
        }
        return updatetask;
    }
    catch(err){
        console.log("error while updating: ",err);
        return "error updating task";
    }
    
};
module.exports={updatetask};

