import express from 'express'
import { supabase } from '../supabaseClient.js'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, lastName } = req.body;

    // Регистрация в Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });
    if (authError) throw authError;

    // Сохранение в public.users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        email: authData.user.email,
        first_name: username,
        last_name: lastName
      }])
      .select();

    if (userError) throw userError;
    res.status(201).json(userData[0]);

  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Вход пользователя
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').notEmpty().withMessage('Введите пароль'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      // 1. Аутентификация в Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Обработка конкретных ошибок аутентификации
        if (error.code === 'email_not_confirmed') {
          return res.status(403).json({
            message: 'Требуется подтверждение email. Проверьте вашу почту (включая папку спам)',
            code: error.code
          })
        }
        throw error
      }

      // 2. Проверка, существует ли пользователь в таблице public.users
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError || !userProfile) {
        console.warn(`Пользователь ${data.user.id} не найден в public.users`)
        return res.status(404).json({
          message: 'Профиль пользователя не найден',
          details: 'Пользователь аутентифицирован, но отсутствует в базе данных'
        })
      }

      // 3. Генерация JWT токена
      const token = jwt.sign(
        { userId: data.user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      // 4. Успешный ответ
      res.json({
        message: 'Вход выполнен успешно',
        user: {
          id: data.user.id,
          email: data.user.email,
          first_name: userProfile.first_name,
          last_name: userProfile.last_name
        },
        token: token
      })

    } catch (error) {
      console.error('Ошибка входа:', error)
      
      // Детализированные ошибки
      const response = {
        message: 'Ошибка аутентификации',
        details: error.message
      }
      
      if (error.code) {
        response.code = error.code
        // Специфичные сообщения для известных кодов ошибок
        if (error.code === 'invalid_credentials') {
          response.message = 'Неверный email или пароль'
        }
      }
      
      res.status(401).json(response)
    }
  }
)
// Получение данных текущего пользователя
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Требуется авторизация' })
    }

    // Верификация JWT токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Получение данных пользователя
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .single()

    if (error || !user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Ошибка получения данных:', error)
    res.status(401).json({ message: 'Неверный или просроченный токен' })
  }
})

// Выход пользователя
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    res.json({ message: 'Выход выполнен успешно' })
  } catch (error) {
    console.error('Ошибка выхода:', error)
    res.status(500).json({ message: 'Ошибка при выходе из системы' })
  }
})

export default router