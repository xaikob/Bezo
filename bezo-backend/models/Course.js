import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  title: String,
  author: String,
  rating: Number,
  duration: String
})

export default mongoose.model('Course', courseSchema)
