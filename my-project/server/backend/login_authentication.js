
const userdetails=[
    {username:'user1', password:'pass1'},
    {username:'user2', password:'pass2'}
];

const authentication=(username,password)=>{
    const user=userdetails.find(i=>i.username===username && i.password===password);
    console.log(user);
    if(user){
        return "Login Successful";        
    }
    else{
        return "Invalid Details";
    }
};
module.exports={authentication};

