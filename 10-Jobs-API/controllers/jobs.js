const jobModel = require('../models/Job')
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,UnauthenticatedError,NotFoundError} = require('../errors')

const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body);
    res.status(StatusCodes.CREATED).send({job})
  } catch (error) {
    throw new UnauthenticatedError(error.message)
  }
};
const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).send({count:jobs.length,jobs}) 
  } catch (error) {
    throw new UnauthenticatedError(error.message)
  }
};

const getJob = async (req, res) => {
  try {
     const {
       user: { userId },
       params: { id: jobId },
     } = req; //nested Destructuring
     const job = await jobModel.findOne({
       _id: jobId,
       createdBy: userId,
     });
     if (!job) {
       throw new NotFoundError(`No job with id ${jobId}`);
     }
     res.status(StatusCodes.OK).send({ job });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
  }
};

const updateJob = async (req, res) => {
    try {
      const {
        body:{company, position},
        user: { userId },
        params: { id: jobId },
      } = req; //nested Destructuring

      if(company === '' || position === ''){
        throw new BadRequestError('Company or position fields cannot be empty.')
      }
      const job = await jobModel.findByIdAndUpdate({ _id: jobId, createdBy: userId },req.body,{new:true, runValidators:true});
          console.log(21);
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
      }
             res.status(StatusCodes.OK).json({ job });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

const deleteJob = async (req, res) => {
  res.send('delete job');
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
};

