const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
const {unauthenticatedError} = require('../errors')
const authentication = async (req, res, next) => {
  // console.log(req.headers);
  // console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new unauthenticatedError('No token Provided')
  }

  const token = authHeader.split(' ')[1]; //to get only token without bearer
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const {id ,username} = decoded
    req.user = {id ,username}
    // console.log(req.user.username);
    next();
 
  } catch (err) {
    throw new unauthenticatedError('Not authorized to access this route');
  }
};;

module.exports = { authentication };
