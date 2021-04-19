require("./models/User")
require("./models/Track")
const express = require("express")
const mongoose = require("mongoose")
const authRoutes= require("./routes/authRoutes")
const trackRoutes= require("./routes/trackRoutes")
const bodyParser= require("body-parser")
const requireAuth = require("./middlewares/requireAuth");

const app = express() 

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri= "mongodb+srv://men3malgmatti:adminadmin@cluster0.rmh9d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
   useNewUrlParser:true,
   useCreateIndex:true 
});

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo instance");
})

mongoose.connection.on("error",(err)=>{
    console.error("Error connecting to mongo",err);
})

app.get("/",requireAuth,(req,res)=>{
    res.send(`your email ${req.user.email}`)
})



app.listen(3001, ()=>{
    console.log("listening on port 3001");
})