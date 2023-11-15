const express=require('express');
const cors = require('cors');
const playersRouter=require('./routes/playerRoures');
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/players',playersRouter);
module.exports=app;