import express from 'express'
import Course from '../models/Course.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const courses = await Course.find()
  res.json(courses)
})

router.post('/', async (req, res) => {
  const course = new Course(req.body)
  await course.save()
  res.status(201).json(course)
})

export default router
