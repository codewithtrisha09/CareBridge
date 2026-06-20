const User = require('../models/User')

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({ name, email, password })
    const token = user.getAuthToken()

    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email },
      token
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = user.getAuthToken()

    res.json({
      user: { _id: user._id, name: user.name, email: user.email },
      token
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { signup, login }