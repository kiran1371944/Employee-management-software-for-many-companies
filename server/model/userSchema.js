const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const userSchema = new mongoose.Schema({
  
    company_name:{
        type:String,
        required:true
    },
    cemail:{
        type:String,
        required:true
    },
    cphone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens: [
        {
            token: {
                type:String,
                required:true
            } 
        }
    ]
})
//hashing the password
userSchema.pre('save',async function (next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,8);
        this.cpassword = await bcrypt.hash(this.cpassword,8);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function (){
    try{
         let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
         this.tokens = this.tokens.concat({ token: token});
         await this.save();
         return token;
    }catch(err) {
        console.log(err);
    }
};
const Login = mongoose.model('LOGIN',userSchema); 
module.exports = Login;
