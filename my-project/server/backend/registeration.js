
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const mongouri="mongodb+srv://shyam:shyam02@cluster0.vojjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongouri,{useNewUrlParser:true,useUnifiedTopology:true,serverSelectionTimeoutMS:30000,socketTimeoutMS:60000 })
    .then(()=>console.log("mongodb connected successfully"))
    .catch((err)=>console.log("mongodb connection error "+err));

const registerSchema=new mongoose.Schema({
    username:String,
    password:String
})

const register=mongoose.models.login_details ||  mongoose.model("login_details", registerSchema, "login_details");

const registeration=async(username,password)=>{
    const username_present= await register.findOne({username:username});
    const hashedpassword=await bcrypt.hash(password,10);
    console.log("username present", username_present);
    if(!username_present){
        const jsdata={
            username:username,
            password:hashedpassword
        }
        try{
            const newuser=new register(jsdata);
            await newuser.save();
            console.log("data saved successfully");
            return "Message saved successfully";
        }
        catch(err){
            console.log("error while saving to database"+err);
            return "error in saving";
        }
    }
    else{
        return "username already present";
    }
        

}
module.exports={register,registeration};
