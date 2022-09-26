const express = require("express");
const route = require("./route/route");
const bodyParser = require("body-parser")
const app = express();
const mongoose = require("mongoose")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose
  .connect(
    "mongodb+srv://Omkarbaacha25:R12rr6VoiyHryNDD@cluster0.gnlxf.mongodb.net/Book_Management",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('MongoDB is Successfully Connected');
  })
  .catch((err) => {
    console.log(err.message);
  });


app.use('/',route);

app.listen( 3000, ()=>{console.log("Express App is running on Port 3000")})


