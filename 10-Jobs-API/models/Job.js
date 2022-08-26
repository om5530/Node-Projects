const mongoose = require('mongoose')


const jobsSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum:['inteview','declined','pending'],
    default:'pending'
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:[true,'Please provide an user']
  }
},{timestamps:true});

module.exports = mongoose.model('job',jobsSchema)