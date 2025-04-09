import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'  // подключаем CORS
import authRoutes from './routes/authRoutes.js' // Подключаем роуты

dotenv.config()

const app = express()

// Настройка CORS
const corsOptions = {
  origin: 'http://localhost:5173',  // URL фронтенда (Vite по умолчанию работает на 5173)
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}
app.use(cors(corsOptions))

app.use(express.json()) // Для парсинга JSON в запросах

// Тестовый маршрут
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend работает!' })
})

// Подключаем роуты авторизации
app.use('/api/auth', authRoutes)

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Подключено к MongoDB')
    app.listen(5174, () => console.log('🚀 Сервер на порту 5174'))
  })
  .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err))
