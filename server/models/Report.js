const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  filePath: { type: String, required: true },
  extractedText: { type: String }, // OCR text from image
  simplifiedText: { type: String }, // AI simplified text
  aiSimplifiedAt: { type: Date }
}, { timestamps: true })

module.exports = mongoose.model('Report', reportSchema)