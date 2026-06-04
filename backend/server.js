import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import connectDB from './config/db.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import {
  notFound,
  errorHandler,
} from './middleware/errorMiddleware.js'
import albumRoutes from './routes/albumRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/admins', adminRoutes)

app.use('/api/albums', albumRoutes)
app.use('/api/gallery', galleryRoutes)

app.use('/api/upload', uploadRoutes)

app.get('/', (req, res) => {
  res.send('API Running...')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
