const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const reportRoutes = require('./routes/reportRoutes')
const medicineRoutes = require('./routes/medicineRoutes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', userRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/medicines', medicineRoutes)
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.json({ message: 'Server running' })
})

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI
const port = process.env.PORT || 5000

if (!mongoUri) {
  throw new Error('MONGO_URI or MONGODB_URI must be set in server/.env')
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(err => console.error(err))

module.exports = app
