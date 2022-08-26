const express = require('express')
const router = express.Router()

const {
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
  createJob
} = require('../controllers/jobs')

router.post('/',createJob)
router.get('/',getAllJobs)
router.get('/:id',getJob)
router.delete('/:id',deleteJob)
router.patch('/:id',updateJob)
module.exports = router