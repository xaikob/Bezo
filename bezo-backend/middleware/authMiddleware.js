import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { supabase } from '../supabaseClient.js'

dotenv.config()

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Token required' })

    // Проверяем токен через Supabase
    const { data, error } = await supabase.auth.getUser(token)
    if (error) throw error

    // Получаем полный профиль пользователя
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (userError || !user) throw new Error('User not found')

    req.user = user
    next()
  } catch (err) {
    console.error('Auth error:', err)
    res.status(401).json({ message: 'Invalid token' })
  }
}