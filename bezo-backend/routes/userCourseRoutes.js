import express from 'express'
import supabase from '../supabaseClient.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

// Получить курсы пользователя
router.get('/:userId', async (req, res) => {
  const { userId } = req.params

  const { data, error } = await supabase
    .from('user_courses')
    .select('*')
    .eq('user_id', userId)

  if (error) return res.status(500).json({ message: error.message })
  return res.json(data)
})

// Добавить курс пользователю
router.post(
  '/',
  [
    body('user_id').notEmpty(),
    body('title').notEmpty(),
    body('progress').isInt({ min: 0, max: 100 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { user_id, title, progress } = req.body

    const { data, error } = await supabase
      .from('user_courses')
      .insert([{ user_id, title, progress }])

    if (error) return res.status(500).json({ message: error.message })
    return res.status(201).json(data)
  }
)

// Обновить прогресс
router.put('/:courseId', async (req, res) => {
  const { courseId } = req.params
  const { progress } = req.body

  const { data, error } = await supabase
    .from('user_courses')
    .update({ progress })
    .eq('id', courseId)

  if (error) return res.status(500).json({ message: error.message })
  return res.json(data)
})

export default router
