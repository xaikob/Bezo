import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { supabase } from '../supabaseClient.js'

dotenv.config()

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  try {
    // Вариант 1: Проверка JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Проверяем пользователя в Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .single()

    if (error || !user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    next()

  } catch (err) {
    console.error('Auth error:', err)
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}