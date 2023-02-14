const express = require('express');
const app =express();
const jwt = require('jsonwebtoken');
// const cors = require('cors');
// app.use(cors());

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
require('./db/conn');
app.use(express.json()); 
app.use(cookieParser());

app.use(require('./router/auth'));
 
const PORT = process.env.PORT;

// app.get('/edit',(req,res) =>{
//     res.send('Helloedit world from the server')
// });


app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
});

