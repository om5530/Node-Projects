const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

 //setup authentication so only the request with JWT can access thr dashboard

//check username , password in post(login) request
//if exist create new JWT
//send back to front-end

//setup authentication so only the request with JWT can access thr dashboard

const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  //for dummy id
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.status(StatusCodes.OK).send({ status: true, msg: 'User Created', token });
};

const dashboard = async (req, res) => {
// console.log(req)
// console.log('oooooooooooo');
// console.log(req.user)
      const luckyNumber = Math.floor(Math.random() * 100);
      res.status(StatusCodes.OK).json({
        msg: `hello,${req.user.username.trim()}`,
        secret: `Here is your authorized data, Your lucky number is ${luckyNumber}`,
      });
};

module.exports = {
  login,
  dashboard,
};
