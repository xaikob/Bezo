import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { body, validationResult } from 'express-validator'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// Регистрация
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, email, password } = req.body

    try {
      // Проверяем, существует ли уже пользователь
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      user = new User({
        username,
        email,
        password,
      })

      await user.save()

      // Создание JWT токена
      const payload = {
        userId: user._id,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

      res.status(201).json({
        message: 'User registered successfully',
        token,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
)

// Вход
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // Сравниваем пароль
      const isMatch = await user.matchPassword(password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // Создание JWT токена
      const payload = {
        userId: user._id,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

      res.status(200).json({
        message: 'Login successful',
        token,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
)

export default router
