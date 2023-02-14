const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    companyId:{
        type:String
    }, 
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    jdate:{
        type:String,
         required:true 
    } 

})

const Employees = mongoose.model('EMPLOYEES',userSchema); 
module.exports = Employees;
