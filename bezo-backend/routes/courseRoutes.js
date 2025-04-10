import express from 'express'
import { supabase } from '../supabaseClient.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
    
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([req.body])
      .select()
    
    if (error) throw error
    res.status(201).json(data[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Добавьте default export
export default router