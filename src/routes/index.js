const express =require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.text({limit: '10mb'}));
//Include Routes Dependecies
const Rooms = require('./rooms.js');
const Public = require('./public.js');

//Add endo point routes
app.use("/room",Rooms);
app.use("/",Public);
module.exports=app;