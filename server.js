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


const PORT = process.env.PORT || 5000;


//main coding of web app
app.listen(PORT, () => {
    console.log('server is running on ',PORT);
})

