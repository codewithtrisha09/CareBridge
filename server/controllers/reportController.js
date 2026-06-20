const Report = require('../models/Report')
const axios = require('axios')
const Tesseract = require('tesseract.js')
const fs = require('fs')
const path = require('path')

const extractTextFromImage = async (file) => {
  const filePath = file.path
  const ext = path.extname(file.originalname || filePath).toLowerCase()
  const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif'].includes(ext)

  if (!isImage && !file.mimetype?.startsWith('image/')) {
    throw new Error('Only image files are supported for OCR right now. Please upload JPG or PNG.')
  }

  if (!fs.existsSync(filePath)) {
    throw new Error('Uploaded file was not found on the server.')
  }

  console.log('Starting OCR on image:', filePath)

  const { data } = await Tesseract.recognize(filePath, 'eng', {
    logger: (message) => {
      if (message.status && typeof message.progress === 'number') {
        console.log(`OCR ${message.status}: ${Math.round(message.progress * 100)}%`)
      }
    }
  })

  const text = (data?.text || '').trim()
  console.log('OCR complete. Text length:', text.length)

  if (!text) {
    throw new Error('OCR completed but no readable text was found. Try a clearer image.')
  }

  return text
}

const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const title = (req.body.title || '').trim()
    if (!title) {
      return res.status(400).json({ message: 'Report title is required' })
    }

    const extractedText = await extractTextFromImage(req.file)

    const report = await Report.create({
      user: req.user._id,
      title,
      filePath: req.file.path,
      extractedText
    })

    res.status(201).json(report)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(reports)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, user: req.user._id })
    if (!report) {
      return res.status(404).json({ message: 'Report not found' })
    }
    res.json(report)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const simplifyReport = async (req, res) => {
  try {
    const { reportId } = req.body

    if (!reportId) {
      return res.status(400).json({ message: 'Report id is required' })
    }

    const report = await Report.findOne({ _id: reportId, user: req.user._id })
    if (!report) {
      return res.status(404).json({ message: 'Report not found' })
    }

    const textToSimplify = (req.body.extractedText || report.extractedText || '').trim()
    if (!textToSimplify) {
      return res.status(400).json({ message: 'No text to simplify' })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'Gemini API key not configured' })
    }

    const prompt = `
Simplify this medical report for a regular patient. Explain in simple language:
- What each test/result means
- Whether values are normal or abnormal
- What the patient should do next

Medical Report:
${textToSimplify}

Keep it clear and concise (max 200 words).
    `

    const models = [
      process.env.GEMINI_MODEL,
      'gemini-2.5-flash',
      'gemini-2.0-flash'
    ].filter(Boolean)

    let response
    let lastError

    for (const model of models) {
      try {
        console.log('Sending report to Gemini model:', model)
        response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          },
          { timeout: 30000 }
        )
        break
      } catch (error) {
        lastError = error
        if (error.response?.status !== 404) {
          throw error
        }
        console.log(`Gemini model unavailable: ${model}`)
      }
    }

    if (!response) {
      throw lastError || new Error('No Gemini model was available')
    }

    const aiSimplifiedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!aiSimplifiedText) {
      return res.status(502).json({ message: 'AI did not return a summary. Please try again.' })
    }

    report.simplifiedText = aiSimplifiedText
    report.aiSimplifiedAt = new Date()
    await report.save()

    res.json({ simplifiedText: aiSimplifiedText })
  } catch (error) {
    console.log('AI error:', error.message)
    if (error.response) {
      console.log('Response status:', error.response.status)
      console.log('Response data:', JSON.stringify(error.response.data))
    }

    const apiMessage = error.response?.data?.error?.message
    res.status(500).json({ message: apiMessage || error.message })
  }
}

module.exports = { uploadReport, getReports, getReport, simplifyReport }
