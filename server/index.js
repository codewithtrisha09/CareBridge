const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Database
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/carebridge')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err))

// Routes
app.use('/api/auth', require('./routes/userRoutes')) 
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/reports', require('./routes/reportRoutes'))
app.use('/api/medicines', require('./routes/medicineRoutes'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CAREBRIDGE API is running' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Server error', error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})