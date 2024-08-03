const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    carName :{
        type : String,
        require : true
    },
    manufYear :{
        type : Date,
        require : true
    },
    price : {
        type : Number,
        require : true
    }
})

const Car = mongoose.model("Car",carSchema);
module.exports = Car;