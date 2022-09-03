const express = require('express')
const router = express.Router()
const {uploadFile} = require('./AWS')
const model = require('./model')

router.post('/write-file-aws',async function(req,res){
  // try {
    let files = req.files
    if(files && files.length > 0){
    //upload to s3 and get the uploaded link
    //res.send the link back to frontend/postman
    let uploadFileURL = await uploadFile(files[0])
    // let file = await model.create({ link: uploadFileURL });
    res
      .status(201)
      .send({ msg: 'file uploaded successfully', data: uploadFileURL });
    }
    else{
      res.status(400).send({msg:"No file found"})
    }

  // } catch (error) {
  //   res.status(500).send({msg:error})
  // }
})

module.exports = router