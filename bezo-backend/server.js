import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

// Конфигурация .env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, '.env') })

// Явная проверка переменных окружения
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

// Логирование всех входящих запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Тестовый маршрут
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Сервер работает!' })
})

// Роут для курсов (упрощённая версия)
app.get('/api/courses', async (req, res) => {
  console.log('Запрос к /api/courses начал обработку')
  
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .limit(10)

    console.log('Результат запроса к Supabase:', { data, error })

    if (error) {
      console.error('Ошибка Supabase:', error)
      return res.status(500).json({ 
        error: 'Database Error',
        details: error.message 
      })
    }

    if (!data || data.length === 0) {
      console.warn('Получен пустой массив курсов')
      return res.status(200).json([])
    }

    res.json(data)
  } catch (err) {
    console.error('Неожиданная ошибка:', err)
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: err.message 
    })
  }
})

// Обработка 404
app.use((req, res) => {
  console.warn(`Маршрут не найден: ${req.method} ${req.path}`)
  res.status(404).json({ message: 'Маршрут не найден' })
})

// Запуск сервера
const PORT = process.env.PORT || 5174
app.listen(PORT, () => {
  console.log(`\n🚀 Сервер запущен на http://localhost:${PORT}`)
  console.log('Доступные маршруты:')
  console.log(`- GET /api/hello`)
  console.log(`- GET /api/courses\n`)
})