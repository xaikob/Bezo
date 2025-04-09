<template>
  <div class="course-card">
    <h3>{{ course.title }}</h3>
    <p><strong>Автор:</strong> {{ course.author }}</p>
    <p><strong>Оценка:</strong> <span class="stars">{{ stars }}</span></p>
    <p><strong>Продолжительность:</strong> {{ course.duration }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const stars = '★'.repeat(Math.round(props.course.rating)) + '☆'.repeat(5 - Math.round(props.course.rating))
</script>

<style scoped>
.course-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.course-card:hover {
  transform: translateY(-4px);
}

.course-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.stars {
  color: #fbbf24; /* жёлтые звезды */
  font-size: 16px;
}
</style>
