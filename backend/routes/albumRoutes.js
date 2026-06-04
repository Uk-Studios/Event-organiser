import express from 'express'

import {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from '../controllers/albumController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(getAlbums)
  .post(protect, createAlbum)

router
  .route('/:id')
  .get(getAlbumById)
  .put(protect, updateAlbum)
  .delete(protect, deleteAlbum)

export default router