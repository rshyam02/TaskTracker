const fs=require("fs");
const mongoose= require("mongoose");

//const mongouri="mongodb://localhost:27017/admin";
// const mongouri="mongodb+srv://shyam:<shyam>@cluster0.rlavi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongouri = "mongodb+srv://shyam:shyam02@cluster0.vojjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongouri,{useNewUrlParser:true,useUnifiedTopology:true,serverSelectionTimeoutMS: 30000,  // Set 30 seconds timeout for initial connection
    socketTimeoutMS: 60000,})
    .then(()=>console.log("mongodb connected successfully"))
    .catch((err)=>console.log("mongodb connection error "+err));

const taskschema=new mongoose.Schema({
    taskname: String,
    priority: String,
    datetime: String,
    time: String,
    status: Boolean

});

const task= mongoose.models.task || mongoose.model("Task",taskschema);
module.exports=task;
const taskrecievedstatus=async(taskname,priority,datetime)=>{
    let date="",time="";
    let flag=0;
  
    for(let i=0;i<datetime.length;i++){
        if(datetime[i]=='T'){
            flag=1;
            continue;
        }
        if(flag==1){
            time+=datetime[i];
        }
        else{
            date+=datetime[i];
        }
        
    }
    const jsdata={taskname: taskname,
        priority: priority,
        datetime: date,
        time: time,
        status: false
    };
    try{
        const newtask=new task(jsdata);
        await newtask.save();
        console.log("data saved successfully");
        return "Message saved successfully";
    }
    catch(err){
        console.log("error while saving to database"+err);
        return "error in saving";
    }
    
     
    
}
module.exports={taskrecievedstatus};


// app.post('/taskname',(req,res)=>{
    
//     const taskname=req.body;
//     if(taskname){
//         res.status(200).send("Message recieved successsfully");
        
//     }
//     else{
//         res.status(401).send("Invalid details");
//     }
    
// });

// app.listen(PORT,()=>{
//     console.log(`HOST IS RUNNING IN https://localhost:${PORT}`);
// });

// const mongoose = require("mongoose");
 
// // MongoDB connection string (update if needed)
// const mongoURI = "mongodb://localhost:27017/admin"; // Ensure your MongoDB is running at this URI
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error: " + err));
 
// // Task Schema definition
// const taskSchema = new mongoose.Schema({
//   taskname: String,
//   priority: String,
//   datetime: String,
//   time: String
// });
 
// // Create a model based on the schema
// const Task = mongoose.model("Task", taskSchema);
 
// const taskrecievedstatus = async (taskname, priority, datetime) => {
//   let date = "", time = "";
//   let flag = 0;
 
//   // Split datetime into date and time
//   for (let i = 0; i < datetime.length; i++) {
//     if (datetime[i] === 'T') {
//       flag = 1;
//       continue;
//     }
//     if (flag === 1) {
//       time += datetime[i];
//     } else {
//       date += datetime[i];
//     }
//   }
 
//   const jsdata = { taskname: taskname, priority: priority, datetime: date, time: time };
 
//   try {
//     // Create a new task document
//     const newTask = new Task(jsdata);
 
//     // Save the task to MongoDB using async/await
//     await newTask.save();
//     console.log("Task saved successfully to MongoDB");
 
//     if (taskname) {
//       return "Message received successfully";
//     } else {
//       return "Invalid details";
//     }
//   } catch (err) {
//     console.log("Error saving task to MongoDB: ", err);
//     return "Error saving task";
//   }
// };
 
// module.exports = { taskrecievedstatus };
 