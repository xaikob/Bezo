<template>
  <NavBar />
  <div class="courses-page">
    <aside class="filter-sidebar">
      <h2>Фильтр</h2>
      <div class="filter-group">
        <label>Сложность:</label>
        <select v-model="selectedLevel">
          <option value="">Все</option>
          <option value="beginner">Начальный</option>
          <option value="intermediate">Средний</option>
          <option value="advanced">Продвинутый</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Продолжительность:</label>
        <select v-model="selectedDuration">
          <option value="">Любая</option>
          <option value="short">До 2 часов</option>
          <option value="medium">2–5 часов</option>
          <option value="long">Более 5 часов</option>
        </select>
      </div>
    </aside>

    <main class="course-list">
      <h1>Наши курсы</h1>
      <div class="courses-grid">
        <CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import CourseCard from '@/components/ui/CourseCard.vue'

// Состояния
const courses = ref([])
const isLoading = ref(false)
const error = ref(null)
const selectedLevel = ref('')
const selectedDuration = ref('')

// Загрузка курсов через бекенд
const fetchCourses = async () => {
  try {
    isLoading.value = true
    error.value = null

    const response = await fetch('http://localhost:5174/api/courses')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    courses.value = data
  } catch (err) {
    console.error('Ошибка загрузки курсов:', err)
    error.value = 'Не удалось загрузить курсы. Попробуйте позже.'
  } finally {
    isLoading.value = false
  }
}

// Фильтрация курсов
const filteredCourses = computed(() => {
  return courses.value.filter((course) => {
    const levelMatch = !selectedLevel.value || course.level === selectedLevel.value
    const hours = parseFloat(course.duration) || 0
    let durationMatch = true
    switch (selectedDuration.value) {
      case 'short':
        durationMatch = hours <= 2
        break
      case 'medium':
        durationMatch = hours > 2 && hours <= 5
        break
      case 'long':
        durationMatch = hours > 5
        break
    }
    return levelMatch && durationMatch
  })
})

onMounted(fetchCourses)
</script>

<style scoped>
@import '@/assets/css/CoursePage.css';
</style>
