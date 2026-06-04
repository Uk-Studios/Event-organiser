import asyncHandler from 'express-async-handler'
import Gallery from '../models/galleryModel.js'

const createGalleryItem = asyncHandler(
  async (req, res) => {
    const galleryItem = await Gallery.create(req.body)

    res.status(201).json(galleryItem)
  }
)

const getGalleryItems = asyncHandler(
  async (req, res) => {
    const galleryItems = await Gallery.find().sort({
      createdAt: -1,
    })

    res.json(galleryItems)
  }
)

const updateGalleryItem = asyncHandler(
  async (req, res) => {
    const galleryItem = await Gallery.findById(
      req.params.id
    )

    if (!galleryItem) {
      res.status(404)
      throw new Error('Gallery item not found')
    }

    galleryItem.image =
      req.body.image || galleryItem.image

    galleryItem.description =
      req.body.description ||
      galleryItem.description

    const updatedGalleryItem =
      await galleryItem.save()

    res.json(updatedGalleryItem)
  }
)

const deleteGalleryItem = asyncHandler(
  async (req, res) => {
    const galleryItem = await Gallery.findById(
      req.params.id
    )

    if (!galleryItem) {
      res.status(404)
      throw new Error('Gallery item not found')
    }

    await galleryItem.deleteOne()

    res.json({
      message: 'Gallery item removed',
    })
  }
)

export {
  createGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
}
