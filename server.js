const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Admin = require("./models/Admin");
const app = require("./backend/adminlog");
const Car = require("./models/Car");
const User = require("./models/User");

//const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static('public'));
app.use(express.static('view'));

mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://harshpanwar3600:doodu01@cluster0.ve5v2cz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=>{
    console.log('mongoDB is connnected');
}).catch((err)=>{
    console.log('mongoDB failed to connect',err);
});

const PORT = process.env.PORT || 5000;


//main coding of web app
app.listen(PORT, () => {
    console.log('server is running on ',PORT);
})

