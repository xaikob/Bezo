<template>
  <NavBar />
  <div class="dashboard">
    <h1>Добро пожаловать, {{ userName }}!</h1>
    <h2>Ваши курсы</h2>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="courses.length === 0">Вы пока не записаны на курсы.</div>

    <div class="courses-grid">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <h3>{{ course.title }}</h3>
        <p>Прогресс: {{ course.progress }}%</p>
        <progress :value="course.progress" max="100"></progress>
        <button @click="continueCourse(course.id)">Продолжить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import NavBar from '@/components/layout/NavBar.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const userName = userStore.username
const userId = userStore.userId

const courses = ref([])
const loading = ref(true)

const fetchUserCourses = async () => {
  try {
    const response = await axios.get(`http://localhost:5174/api/user-courses/${userId}`)
    courses.value = response.data
  } catch (err) {
    console.error('Ошибка при загрузке курсов:', err)
  } finally {
    loading.value = false
  }
}

const continueCourse = (courseId) => {
  window.location.href = `/courses/${courseId}`
}

onMounted(fetchUserCourses)
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.course-card {
  background: #f7f7f7;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.course-card h3 {
  margin: 0;
}

button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4338ca;
}
</style>
