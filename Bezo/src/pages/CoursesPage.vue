<template>
  <NavBar/>
  <div class="courses-page">
    <aside class="filter-sidebar">
      <h2>Фильтр</h2>
      <div class="filter-group">
        <label>Категория:</label>
        <select>
          <option value="">Все</option>
          <option value="beginner">Начальный</option>
          <option value="intermediate">Средний</option>
          <option value="advanced">Продвинутый</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Продолжительность:</label>
        <select>
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
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue';
import CourseCard from '@/components/ui/CourseCard.vue'

const courses = [
  {
    id: 1,
    title: 'Введение в кибербезопасность',
    author: 'Иван Иванов',
    rating: 4.8,
    duration: '3 часа'
  },
  {
    id: 2,
    title: 'Этика хакеров и тестирование на проникновение',
    author: 'Анна Смирнова',
    rating: 4.5,
    duration: '5.5 часов'
  },
  {
    id: 3,
    title: 'Безопасность веб-приложений',
    author: 'Дмитрий К.',
    rating: 2.9,
    duration: '2.5 часа'
  }
  // Добавь больше курсов при необходимости
]
</script>

<style scoped>
@import '../assets/css/CoursePage';
</style>
