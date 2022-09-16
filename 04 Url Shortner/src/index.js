const express = require("express") ;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const route = require("./route/route");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true })) ;

mongoose
  .connect(
    'mongodb+srv://Omkarbaacha25:R12rr6VoiyHryNDD@cluster0.gnlxf.mongodb.net/urlShortener',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('MongoDB is Successfully Connected😍😍');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/', route);

app.listen( process.env.PORT || 3000 , function () {
    console.log("Express app is running on port " + (process.env.PORT || 3000 )+"😍😍");
});
