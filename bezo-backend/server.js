import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

// Конфигурация .env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, '.env') })

// Проверка переменных окружения (можно удалить после настройки)
console.log('Проверка окружения:')
console.log('Supabase URL:', process.env.SUPABASE_URL ? '✔️' : '❌')
console.log('Supabase Key:', process.env.SUPABASE_KEY ? '✔️' : '❌')
console.log('JWT Secret:', process.env.JWT_SECRET ? '✔️' : '❌')

// Инициализация Express
const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))
app.use(express.json())

// Тестовый маршрут
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend работает!',
    envCheck: {
      supabaseUrl: !!process.env.SUPABASE_URL,
      supabaseKey: !!process.env.SUPABASE_KEY,
      jwtSecret: !!process.env.JWT_SECRET
    }
  })
})

// Подключение роутов
app.use('/api/auth', authRoutes)

// Защищенный маршрут для теста аутентификации
app.get('/api/protected', (req, res) => {
  // Временный тест - позже замените на настоящий middleware
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Требуется аутентификация' })
  }
  res.json({ message: 'Доступ к защищенным данным разрешен' })
})

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' })
})

// Запуск сервера
const PORT = process.env.PORT || 5174
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`)
  console.log(`➡️  Тестовый запрос: http://localhost:${PORT}/api/test`)
})