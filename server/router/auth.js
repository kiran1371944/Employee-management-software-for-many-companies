const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../model/userSchema');
const Emp = require('../model/empSchema');
const authenticate = require("../middleware/authentication");

router.post('/register',async(req,res) =>{
    const { company_name,cemail,cphone,password,cpassword} = req.body;
    if(!company_name || !cemail || !cphone || !password || !cpassword){

        return res.status(422).json({ error:"require all the fields."});
          
       }  
       try{   
        const userExist = await User.findOne({ cemail:cemail });
        
            if(userExist) { 
                 res.status(409).json({ error:"Email already exist"});
            } else if( password != cpassword) {
                 res.status(422).json({ error:"Passwords are not matching"});                  
            } else{
                const user = new User({company_name,cemail,cphone,password,cpassword});
            
                await user.save();
                res.status(201).json({ message: "user registered successfully"});
            }
       }catch (err) {
        res.status(500).json(err);
       } 
    });
//login route
router.post('/login',async(req,res) =>{ 
    const { cemail,password } = req.body; 
    if(!cemail || !password) {
        return res.status(400).json({error:"Please enter the credentials"})
    }
    try{       
        const userLogin = await User.findOne({ cemail:cemail });//findOne is kind of a method return a promise so await given
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
    
            const token = await userLogin.generateAuthToken();
            res.cookie("emtoken",token,{
                expires:new Date(Date.now() + 2160000),
                httpOnly:true     
            });
            
            if(isMatch){
                res.json({ message: "User Signin Successfully. "});
            }
            else{
                res.status(400).json({ error:"Invalid credentials "});
            }
        }
        else{
            res.status(400).json({ error:"Invalid credentials."});
        }        
      }catch(err){
        console.log(err);  
      }  
}); 
//data page
router.get('/data',authenticate,(req,res) =>{  
    res.send(req.rootUser)
});
router.get('/getdata',authenticate,(req,res) =>{   
    res.send(req.rootUser)
});
router.get('/logout',(req,res) =>{  
    res.clearCookie('emtoken',{path:'/'}); 
    res.status(200).send('user loggedout') ;
});
  
//add emp
router.post('/add',async(req,res) =>{ 
        // console.log(req.body);
        const { companyId,name ,position ,email ,phone, salary ,gender,jdate} = req.body;
        if(!name  || !position  || !email  || !phone || ! salary  || !gender || !jdate){

            return res.status(422).json({ error:"require all the fields."});
                  
           }
           try{
            const userExist = await Emp.findOne({ email:email });
            
                if(userExist) {
                     res.status(409).json({ error:"Email already exist"});
                } else{
                    const emp = new Emp({companyId,name ,position ,email ,phone, salary ,gender,jdate});
                
                    await emp.save();
                    res.status(201).json({ message: "Employee registered successfully"});
                } 
           }catch (err) {
            res.status(500).json(err);
           }
});
router.post('/getCompanyEmployees',async(req,res) =>{
    let result = await Emp.find({companyId:req.body.companyId})
    // console.log(result);
    res.send(result);
    // try{     
    //     const employeesDls = await Emp.find({companyId:req.body.companyId})
    //     console.log(employeesDls);
    //     res.send(employeesDls);
    // }           
    // catch(err){  
  
    // }
});      
//delete      
router.post('/handleDelete',async(req,res) =>{
    try {
        const _id = req.body._id;
        const emplyDoesExist = await Emp.findOne({ _id: _id });
            
        if (emplyDoesExist) {
            await Emp.deleteOne({ _id: _id });
            res.status(200).json({ success: "Employ deleted successfully" });
        } 
        else {
            res.status(422).json({ error: "Employ doesn't exist" });
        }
    }            
    catch(err){  
        console.log(err); 
    } 
});
//Edit 
router.post('/handleEdits',async(req,res) =>{
    try {  
        const _id = req.body._id;
        const emplyDoesExist = await Emp.findOne({ _id: _id });
        console.log(emplyDoesExist,'edittt');     
        if (emplyDoesExist) {     
            res.status(200).status(200).send(emplyDoesExist);
            }
        else {
            res.status(422).json({ error: "Employ doesn't exist" });
        }
    }catch(err){    
        console.log(err);   
    } 
});  
  //update
router.put('/handleUpdate', async (req, res) => {
    console.log(req.body,'sss'); 
    try {
      const { _id } = req.body; 
      const updatedEmployee = await Emp.findOneAndUpdate({ _id }, req.body, { new: true });
      res.status(200).json(updatedEmployee);
    } catch (err) {
        console.log(err);
    }      
  });
 
module.exports = router;                    