const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Admin = require("../models/Admin");
const Car = require("../models/Car");
const User = require("../models/User");

mongoose.connect('mongodb+srv://harshpanwar3600:doodu01@cluster0.ve5v2cz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=>{
    console.log('mongoDB is connnected');
}).catch((err)=>{
    console.log('mongoDB failed to connect',err);
});

const app = express();

//MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.set('view', path.join(__dirname, 'view'));
app.set(express.static(path.join(__dirname, 'view')));
app.use(express.static('public'));
app.use(express.static('view'));


//ROUTES
app.get('/', (req,res) =>{
    res.render('index.ejs');
})


app.post('/update', async(req,res)=>{
    const{carName, manufYear, price,_id} = req.body;
    console.log(carName);
    console.log(manufYear);
    try{
        const car = await Car.findOneAndUpdate({_id : _id} ,{carName : carName, manufYear : manufYear ,price : price},{new: true});
        if(!car)
            console.log("car not found");
        return res.redirect("/dashboard");
    }
    catch(error){
        console.log("error in updating the data");
    }
})

app.post("/delete", async(req,res)=>{
    const{_id} = req.body;
        const car = await Car.deleteOne({ _id : _id})
        return res.redirect("/dashboard");
})


app.post('/login', async(req,res) =>{
    //const {adminname,apassword } = req.body;
    const {username,password} = req.body;
    console.log(username);
    console.log(password);

    const admin = await Admin.findOne({adminname: username, apassword: password});
    if(!admin){           
        const user = await User.findOne({username,password});
        if(!user){
            console.error("Wrong password");
            res.redirect('/');
        }
        else
            res.redirect("/userdashboard");
    }
    else
        return res.redirect("/dashboard");
});


app.post('/addData', async(req,res)=>{
    const{carName,manufYear,price} = req.body;
    const car = await new Car({
        carName : carName,
        manufYear : manufYear,
        price : price
    });
    car.save();
    console.log(car);
    return res.redirect("/dashboard");
})


app.get('/dashboard', async (req,res) =>{
    //const adminname = req.query.adminname;
    Car.find({})
    
    .then((x)=>{
        res.render('adminhome.ejs',{x});
        //console.log(x)
    })
    .catch((y)=>{
        //console.log(y)
    })
   
});

app.get('/userdashboard', async (req,res) =>{
    //const username = req.query.adminname;
    Car.find({})
    
    .then((x)=>{
        res.render('userhome.ejs',{x});
        //console.log(x)
    })
    .catch((y)=>{
        //console.log(y)
    })
   
});

module.exports = app;