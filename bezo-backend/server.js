import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import authRoutes from './routes/authRoutes.js'
import courseRoutes from './routes/courseRoutes.js'


// Скрываем ошибку старости
process.env.UV_THREADPOOL_SIZE = 128;
process.removeAllListeners('warning');

// Конфигурация .env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, '.env') })

// Проверка переменных окружения
console.log('=== Проверка окружения ===')
console.log('Supabase URL:', process.env.SUPABASE_URL || '❌ Отсутствует')
console.log('Supabase Key:', process.env.SUPABASE_KEY ? '✔️ (скрыто)' : '❌ Отсутствует')

// Инициализация Supabase с дополнительной проверкой
let supabase
try {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  )
  console.log('✅ Supabase клиент инициализирован')
} catch (err) {
  console.error('❌ Ошибка инициализации Supabase:', err)
  process.exit(1)
}

const app = express()

// Упрощённый CORS для тестирования
app.use(cors({
  origin: '*',
  methods: '*'
}))

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)

// Логирование всех входящих запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Тестовый маршрут
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Сервер работает!' })
})

// Получить курсы пользователя
app.get('/api/user-courses/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const { data, error } = await supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', userId)

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err.message })
  }
})

// Добавить курс пользователю
app.post('/api/user-courses', async (req, res) => {
  const { user_id, title, progress = 0 } = req.body
  try {
    const { data, error } = await supabase
      .from('user_courses')
      .insert([{ user_id, title, progress }])
      .select()

    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err.message })
  }
})

// Обновить прогресс курса
app.put('/api/user-courses/:id', async (req, res) => {
  const { id } = req.params
  const { progress } = req.body

  try {
    const { data, error } = await supabase
      .from('user_courses')
      .update({ progress })
      .eq('id', id)
      .select()

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err.message })
  }
})

// Обработка 404
app.use((req, res) => {
  console.warn(`Маршрут не найден: ${req.method} ${req.path}`)
  res.status(404).json({ message: 'Маршрут не найден' })
})

// Запуск сервера
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`\n🚀 Сервер запущен на http://localhost:${PORT}`)
  console.log('Доступные маршруты:')
  console.log(`- GET /api/hello`)
  console.log(`- GET /api/courses\n`)
})