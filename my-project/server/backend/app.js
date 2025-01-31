const app=require('express');
 
const http = require('http').Server(app);
 
const mongoose = require('mongoose');
 
mongoose.connect("mongodb+srv://shyam:<shyam123>@cluster0.rlavi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
http.listen(3000, function(){
 
console.log('Server is running'); 
});