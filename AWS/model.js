const { link } = require('fs')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
 link:{
  type: String,
  required:[true,'link is required'],
  trim:true,
 }
})

module.exports = mongoose.model('user',schema)