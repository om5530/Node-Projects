const jobModel = require('../models/Job')
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,UnauthenticatedError,NotFoundError} = require('../errors')

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body);
   res.status(StatusCodes.CREATED).send({job})
};
const getAllJobs = async (req, res) => {
    const jobs = await jobModel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).send({count:jobs.length,jobs}) 
};

const getJob = async (req, res) => {
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
};

const updateJob = async (req, res) => {
      const {
        body:{company, position},
        user: { userId },
        params: { id: jobId },
      } = req; //nested Destructuring

      if(company === '' || position === ''){
        throw new BadRequestError('Company or position fields cannot be empty.')
      }
      const job = await jobModel.findByIdAndUpdate({ _id: jobId, createdBy: userId },req.body,{new:true, runValidators:true});
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
      }
       res.status(StatusCodes.OK).json({ job });
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

