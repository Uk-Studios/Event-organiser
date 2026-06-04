import express from 'express'

import upload from '../middleware/uploadMiddleware.js'

import { protect } from '../middleware/authMiddleware.js'

import { uploadImages } from '../controllers/uploadController.js'

const router = express.Router()

router.post(
  '/',
  protect,
  upload.array('images', 10),
  uploadImages
)

export default router