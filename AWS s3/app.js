const express = require('express');
const multer = require('multer');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use(multer().any());
const route = require('./routes')
mongoose
  .connect(
    'mongodb+srv://Omkarbaacha25:R12rr6VoiyHryNDD@cluster0.gnlxf.mongodb.net/AWS',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('mongoDB is Successfully connected.');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/', route);

app.listen(3000,()=>{console.log('Server is running on port 3000')})