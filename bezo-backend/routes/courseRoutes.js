import express from 'express'
import { supabase } from '../supabaseClient.js'

const router = express.Router()

// Получение всех курсов
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('rating', { ascending: false })
    
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error('Ошибка получения курсов:', err)
    res.status(500).json({ 
      error: 'Ошибка сервера',
      details: err.message 
    })
  }
})

export default router