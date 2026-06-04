import express from 'express'

import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItems,
  updateGalleryItem,
} from '../controllers/galleryController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(getGalleryItems)
  .post(protect, createGalleryItem)

router
  .route('/:id')
  .put(protect, updateGalleryItem)
  .delete(protect, deleteGalleryItem)

export default router
