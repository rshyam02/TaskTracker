const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jwt=require("jsonwebtoken");
const {authentication} = require('./login_authentication');
const {taskrecievedstatus} = require('./getusertask');
 const {printtask}= require('./printtasklist'); 
 const {deletetask}= require('./deletetask');
const { ReturnDocument } = require('mongodb');
const {registeration}=require("./registeration.js");
const {updatetask}= require('./update.js');
const {updatestatus}= require('./updatestatus.js');
const {taskinfo}=require('./taskinfo.js');
const { JsonWebTokenError } = require('jsonwebtoken');
const {profile}=require("./profile.js");


dotenv.config();
 
const app = express();
const port = process.env.PORT || 5000;


 
app.use(cors());
app.use(express.json());  

 
app.use(bodyParser.json());


 
app.post('/login',async(req, res) => {
  const { username,password} = req.body;
  const token=await authentication(username,password);
  if(token){
    res.json({message:"Login successful",token});
  }
  else{
    res.json({error:"username or password incorrect"});
  }
 
  // try {
  //   // Call authenticateUser function from auth.js
  //   const result = authentication(username, password);
  //   res.json({ message: result});
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
});
const authMiddleware=(req,res,next)=>{
  const token=req.headers["authorization"];
  if(!token){
    return res.json({error:"token missing"});
  }
  jwt.verify(token,"secret123",(err,decoded)=>{
    if(err){
      return res.json({error:"invalid token"});
    }
    req.user=decoded;
    next();
  })  
}

app.get("/profile",authMiddleware,async(req,res)=>{
  const userid=await req.user.id;
  const user=profile(userid);
  res.json({username:user.username});

  

});
app.post("/register",async(req,res)=>{
  const {username,password}=req.body;
  const registerstatus=await registeration(username,password);
  if(registerstatus=="username already present"){
    res.status(409).json({ error: "username already present" });

  }
  else{
    res.status(201).json({ message: "registered successfully" });

  }
})

app.post('/taskname', async (req, res) => {

  console.log("REQUEST BODY:", req.body);   

  const { username, taskname, priority, datetime } = req.body;

  const tasknamestatus = await taskrecievedstatus(
    username,
    taskname,
    priority,
    datetime
  );

  res.status(200).send(tasknamestatus);
});

app.post('/tasks',async(req,res)=>{
  const username=req.body.username;
  console.log(username);
  const gettask= await printtask(username);
  if(gettask=="error fetching task:"){
    res.status(500).send("error fetching");
  }
  else{
    console.log(gettask);
    res.status(200).json(gettask);

  }
  
  
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

 
app.post("/taskstatus",async(req,res)=>{
  const username=req.body.username;
  const {high_priority,low_priority,completed,not_completed,total_task}=await taskinfo(username);
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
 
