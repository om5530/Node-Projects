
const aws = require('aws-sdk');



//Promises
// you  can never use await on callback if you awaited something,then you can be sure it is within a promise

//how to write promise - wrap your entire code inside:"return new promise (function(resolve, reject){"... and when error return reject (err) ... else when all ok and you  have data, return resolve (data)"}"

aws.config.update({
  accessKeyId: 'AKIAY3L35MCRUJ6WPO6J',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

// let uploadFile = async (file) => {
//   return new Promise((resolve, reject) => {
//     //this function will upload file to aws and return the link
//     let s3 = new aws.S3({ apiVersion: '2006-03-01' }); //we will be using the s3 service of aws

//     var uploadParams = {
//       ACL: 'public-read', //Access control list   enable you to manage access to buckets and objects. Each bucket and object has an ACL attached to it as a subresource.
//       //whoever has the acces to it they can access
//       Bucket: 'classroom-training-bucket', //folder in which we are uploading the file
//       key: 'omkar/' + file.originalname, //folder inside bucket  //file.originalname ---- file name + timestamp for creating unique names
//       Body: file.buffer, //in body we send file data
//     };

//     s3.upload(uploadParams, function (err, data) {
//       if (err) {
//         return reject({ "error": err });
//       }else{
//       console.log(data);
//       console.log('file uploaded successfully');
//       return resolve(data.Location); 
//       }//location key in data object-- in that we get url link
//     }); //It uploads file which is in body with the help of ACL, bucket and key
//   });
// };


const uploadFile = async (file) => {
  // Promisify the Function because we can not use await on callBack Function
  return new Promise((resolve, reject) => {
    // Using SIMPLE STORAGE SERVICE
    let s3 = new aws.S3({ apiVersion: '2006-03-01' });

    //create A Object for uploading
    const uploadParams = {
      ACL: 'public-read', // Access Control List tells us access to which users
      Bucket: 'classroom-training-bucket', // Folder in which we are uploading our files
      Key: 'Sai/' + file.originalname, // Folder inside a Bucket for storing indistinct datas
      Body: file.buffer, // Will send file data in body as buffer
    };

    // Upload Body (file) with help of ACL, Bucket, and Key
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        return reject({ error: err });
      } else {
        return resolve(data.Location);
      }
    });

    // If s3 will upload data then it will receive a object as all properties in it including a kry called location in which we got the url where the file is stored.
  });
};

module.exports = { uploadFile };