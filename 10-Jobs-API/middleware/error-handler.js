const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.name === 'ValidationError') {
    // console.log(Object.values(err.errors))
    CustomError.msg = Object.values(err.errors).map(item=>item.message).join(',');
    CustomError.statusCode = 400
  }
  
  if(err.name == 'CastError'){
    // console.log(err.value)
    CustomError.msg = `No item found with id:${err.value._id}`
    CustomError.statusCode = 404
  }
  if (err.code && err.code === 11000) {
    CustomError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value.`;
    CustomError.statusCode = 400
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err:err}); 
  return res.status(CustomError.statusCode).json({ err: CustomError.msg });
}

module.exports = errorHandlerMiddleware
