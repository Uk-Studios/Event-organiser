import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    eventType: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
    },

    location: {
      type: String,
    },

    budget: {
      type: String,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'closed'],
      default: 'new',
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Enquiry = mongoose.model('Enquiry', enquirySchema)

export default Enquiry