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

function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/adminlogin');
}
app.use('/dashboard', isAuthenticated);



const PORT = process.env.PORT || 5000;




//routes

//app.get('/dashboard', (req,res) =>{
  //  res.sendFile(path.join(__dirname,'view','adminhome.html'));
//})


//main coding of web app
app.listen(PORT, () => {
    console.log('server is running on ',PORT);
})
console.log("hello motherfucker");

/*const user = new User({
    username : "user",
    password : "password123"
});
user.save()*/


/*const admin = new Admin({
    adminname : "admin",
    apassword : "admin123"
});
admin.save()*/

