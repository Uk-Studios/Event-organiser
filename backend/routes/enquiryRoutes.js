import express from 'express'

import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from '../controllers/enquiryController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(createEnquiry)
  .get(protect, getEnquiries)

router
  .route('/:id')
  .get(protect, getEnquiryById)
  .put(protect, updateEnquiry)
  .delete(protect, deleteEnquiry)


export default router