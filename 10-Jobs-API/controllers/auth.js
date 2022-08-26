const userModel = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async(req,res) => {
  try {
    const {name,email,password} = req.body
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password,salt)
  // const tempUser = {name,email,password:hashedPassword}
  // await userModel.deleteMany();
    const user = await userModel.create({...req.body}) 
    const token = user.createJWT()
    // res.status(StatusCodes.CREATED).send({user:{name:user.getName()},token})

    res.status(StatusCodes.CREATED).send({user:{name:user.name},token})
  } catch (error) {
    res.send(error.message)
  }
}
 
const login = async (req, res) => {
  try {
    const { email, password } = req.body
  
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password')
    }
    const user = await userModel.findOne({ email })
    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    // console.log(!isPasswordCorrect)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    console.log(!isPasswordCorrect)
    // compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
    
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  register,login
}