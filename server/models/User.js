const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getAuthToken = function() {
  return jwt.sign({ id: this._id, _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

module.exports = mongoose.model('User', UserSchema)
