const express = require('express')
const auth = require('../middleware/auth')
const { getMedicines, addMedicine, updateMedicine, deleteMedicine } = require('../controllers/medicineController')

const router = express.Router()

router.use(auth)

router.get('/', getMedicines)
router.post('/', addMedicine)
router.put('/:id', updateMedicine)
router.delete('/:id', deleteMedicine)

module.exports = router