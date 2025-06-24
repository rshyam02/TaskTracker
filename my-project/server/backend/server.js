const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const {authentication} = require('./login_authentication');
const {taskrecievedstatus} = require('./getusertask');
 const {printtask}= require('./printtasklist'); 
 const {deletetask}= require('./deletetask');
const { ReturnDocument } = require('mongodb');
const {updatetask}= require('./update.js');
const {updatestatus}= require('./updatestatus.js');
const {taskinfo}=require('./taskinfo.js');

dotenv.config();
 
const app = express();
const port = process.env.PORT || 5000;


 
app.use(cors());
 
app.use(bodyParser.json());


 
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(password);
  const result = authentication(username, password);
  res.status(200).send("Login successful");
 
  // try {
  //   // Call authenticateUser function from auth.js
  //   const result = authentication(username, password);
  //   res.json({ message: result});
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
});

app.post('/taskname',(req,res)=>{
    
  const {taskname,priority,datetime}=req.body;
  // console.log(taskname);
  const tasknamestatus=taskrecievedstatus(taskname,priority,datetime);
  
  res.status(200).send(tasknamestatus);
  
});

app.get('/tasks',async(req,res)=>{
  const gettask= await printtask();
  if(gettask=="error fetching task:"){
    res.status(500).send("error fetching");
  }
  console.log(gettask);
  res.status(200).json(gettask);
  
});
app.delete("/tasks/:id",async(req,res)=>{
  const {id}=req.params;
  const deletestatus=deletetask(id);
  if(deletestatus=="task not found"){
    return res.status(404).send("Task not found");
  }
  
  res.status(200).send("task deleted succcessfully");
  
})
app.put("/tasks/:id",async(req,res)=>{
  const {id}= req.params;
  const {taskname, priority, datetime, time}= req.body;
  const updatedtask=await updatetask(id,taskname,priority,datetime,time);
  if(updatedtask==="task not found"){
    res.status(404).send("task not found");
  }
  else if(updatedtask=="=error updating task"){
    res.status(500).send("error updating task");
  }
  res.status(200).json(updatedtask);
  
})
app.put("/taskstatus/:id",async(req,res)=>{
  const {id}= req.params;
  const {status}=req.body;
  console.log("task status changed");
  const statusresult=await updatestatus(id,status);
  console.log(statusresult);
  if(statusresult==="Task not found"){
    res.status(404).send("task not found");

  }
  res.status(200).json(statusresult);

  

  
})

 
app.get("/taskstatus",async(req,res)=>{
  const {high_priority,low_priority,completed,not_completed,total_task}=await taskinfo();
  res.json({high_priority,low_priority,completed,not_completed,total_task});
 
 
  // console.log("status recieved",r);
 
})
 
// app.get('/welcome/:username', (req, res) => {
//   const { username } = req.params;
 
//   try {
//     // Call getWelcomeMessage function from welcome.js
//     const welcomeMessage = getWelcomeMessage(username);
//     res.json({ message: welcomeMessage });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 