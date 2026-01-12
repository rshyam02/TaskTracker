const { response } = require("express");
const mongoose=require("mongoose");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");

const mongouri = "mongodb+srv://shyam:shyam02@cluster0.vojjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongouri,{useNewUrlParser:true,useUnifiedTopology:true,serverSelectionTimeoutMS:30000,socketTimeoutMS:60000})
    .then(()=>console.log("mongodb connected successfully"))
    .catch((err)=>console.log("mongodb connection error "+err));

const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

const Login = mongoose.models.Login || mongoose.model("login_details", loginSchema);


const authentication=async(username,password)=>{
    const user=await Login.findOne({username});
    if(!user){
        return false;
    }
    const password_match=await bcrypt.compare(password,user.password);
    if(!password_match){
        return false;
    }
    const token=jwt.sign({id:user._id},"secret123",{expiresIn:"1h"});
    return token;
    
 }


module.exports={authentication};
