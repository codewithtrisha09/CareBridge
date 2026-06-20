const express = require('express')
const multer = require('multer')
const path = require('path')
const auth = require('../middleware/auth')
const { uploadReport, getReports, getReport, simplifyReport } = require('../controllers/reportController')

const router = express.Router()

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '')
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype?.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image uploads are supported for OCR right now.'))
    }
  }
})

router.use(auth)

router.post('/upload', upload.single('file'), uploadReport)
router.get('/', getReports)
router.get('/:id', getReport)
router.post('/simplify', simplifyReport)

module.exports = router
