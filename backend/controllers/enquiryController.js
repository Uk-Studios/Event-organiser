import Enquiry from '../models/enquiryModel.js'
import asyncHandler from 'express-async-handler'

const createEnquiry = asyncHandler(
  async (req, res) => {
    const enquiry = await Enquiry.create(req.body)

    res.status(201).json(enquiry)
  }
)

const getEnquiries = asyncHandler(
  async (req, res) => {
    const enquiries = await Enquiry.find().sort({
      createdAt: -1,
    })

    res.json(enquiries)
  }
)

const getEnquiryById = asyncHandler(
  async (req, res) => {
    const enquiry = await Enquiry.findById(
      req.params.id
    )

    if (!enquiry) {
      res.status(404)

      throw new Error('Enquiry not found')
    }

    res.json(enquiry)
  }
)

const updateEnquiry = asyncHandler(
  async (req, res) => {
    const enquiry = await Enquiry.findById(
      req.params.id
    )

    if (!enquiry) {
      res.status(404)

      throw new Error('Enquiry not found')
    }

    enquiry.name =
      req.body.name || enquiry.name

    enquiry.phone =
      req.body.phone || enquiry.phone

    enquiry.email =
      req.body.email || enquiry.email

    enquiry.eventType =
      req.body.eventType || enquiry.eventType

    enquiry.location =
      req.body.location || enquiry.location

    enquiry.budget =
      req.body.budget || enquiry.budget

    enquiry.message =
      req.body.message || enquiry.message

    enquiry.status =
      req.body.status || enquiry.status

    enquiry.notes =
      req.body.notes || enquiry.notes

    const updatedEnquiry =
      await enquiry.save()

    res.json(updatedEnquiry)
  }
)

const deleteEnquiry = asyncHandler(
  async (req, res) => {
    const enquiry = await Enquiry.findById(
      req.params.id
    )

    if (!enquiry) {
      res.status(404)

      throw new Error('Enquiry not found')
    }

    await enquiry.deleteOne()

    res.json({
      message: 'Enquiry removed',
    })
  }
)

export {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
}