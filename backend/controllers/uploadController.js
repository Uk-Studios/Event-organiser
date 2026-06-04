import asyncHandler from 'express-async-handler'

import {
  cloudinary,
  configureCloudinary,
} from '../config/cloudinary.js'

const uploadImages = asyncHandler(
  async (req, res) => {

    configureCloudinary()

    if (!req.files || req.files.length === 0) {
      res.status(400)

      throw new Error('No files uploaded')
    }

    const uploadedImages = []

    for (const file of req.files) {

      const imageUrl = await new Promise(
        (resolve, reject) => {

          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: 'event-management',
              },
              (error, result) => {

                if (error) {
                  reject(error)
                } else {
                  resolve(result.secure_url)
                }
              }
            )

          stream.end(file.buffer)
        }
      )

      uploadedImages.push(imageUrl)
    }

    res.status(201).json({
      images: uploadedImages,
    })
  }
)

export { uploadImages }