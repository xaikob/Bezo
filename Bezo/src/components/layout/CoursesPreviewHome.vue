<template>
  <section class="courses-preview">
    <h2>Популярные курсы</h2>
    <div class="courses-grid">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.image" alt="course.name" class="course-image" />
        <div class="course-info">
          <h3>{{ course.name }}</h3>
          <p class="course-description">{{ course.description }}</p>
          <a :href="course.link" class="btn-primary">Подробнее</a>
        </div>
      </div>
    </div>
    <div class="see-all">
      <router-link to="/courses"><a class="btn-secondary">Посмотреть все курсы</a></router-link>
    </div>
  </section>
</template>

<script setup>
import courseOne from '@/assets/img/courseOne.png'
import courseTwo from '@/assets/img/courseTwo.png'
import courseThre from '@/assets/img/courseThre.png'

import { ref } from 'vue'

const courses = ref([
  {
    id: 1,
    name: 'Основы информационной безопасности',
    description: 'Познакомьтесь с основами защиты информации в этом курсе.',
    image: courseOne,
    link: '#course1',
  },
  {
    id: 2,
    name: 'Этика и правовые вопросы в информационной безопасности',
    description:
      'Изучите юридические аспекты и этические вопросы в сфере информационной безопасности.',
    image: courseTwo,
    link: '#course2',
  },
  {
    id: 3,
    name: 'Практика взлома и защиты систем',
    description: 'Погрузитесь в мир этичного хакинга и защиты от атак.',
    image: courseThre,
    link: '#course3',
  },
])
</script>

<style scoped>
@import '@/assets/css/CoursesPreviewHome.css';
</style>
