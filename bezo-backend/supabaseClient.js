import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and SERVICE_ROLE_KEY must be provided in .env file')
}

// Этот клиент можно использовать на сервере с расширенными правами
export const supabase = createClient(supabaseUrl, supabaseKey)
