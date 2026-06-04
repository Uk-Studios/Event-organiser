import Album from '../models/albumModel.js'
import asyncHandler from 'express-async-handler'

const createAlbum = asyncHandler(
  async (req, res) => {
    const album = await Album.create(req.body)

    res.status(201).json(album)
  }
)

const getAlbums = asyncHandler(
  async (req, res) => {
    const albums = await Album.find().sort({
      createdAt: -1,
    })

    res.json(albums)
  }
)

const getAlbumById = asyncHandler(
  async (req, res) => {
    const album = await Album.findById(
      req.params.id
    )

    if (!album) {
      res.status(404)

      throw new Error('Album not found')
    }

    res.json(album)
  }
)

const updateAlbum = asyncHandler(
  async (req, res) => {
    const album = await Album.findById(
      req.params.id
    )

    if (!album) {
      res.status(404)

      throw new Error('Album not found')
    }

    album.title =
      req.body.title || album.title

    album.category =
      req.body.category || album.category

    album.description =
      req.body.description ||
      album.description

    album.coverImage =
      req.body.coverImage ||
      album.coverImage

    album.images =
      req.body.images || album.images

    album.videos =
      req.body.videos || album.videos

    album.featured =
      req.body.featured ?? album.featured

    const updatedAlbum =
      await album.save()

    res.json(updatedAlbum)
  }
)

const deleteAlbum = asyncHandler(
  async (req, res) => {
    const album = await Album.findById(
      req.params.id
    )

    if (!album) {
      res.status(404)

      throw new Error('Album not found')
    }

    await album.deleteOne()

    res.json({
      message: 'Album removed',
    })
  }
)



export {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
}