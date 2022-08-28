const express = require('express')
const router = express.Router()

const {
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
  createJob
} = require('../controllers/jobs')

router.route('/').post(createJob).get(getAllJobs);
router.get('/',getAllJobs)
router.get('/:id',getJob)
router.delete('/:id',deleteJob)
router.patch('/:id',updateJob)
module.exports = router