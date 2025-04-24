<template>
  <section class="reviews-section">
    <h2>Отзывы наших студентов</h2>
    <div class="reviews-container">
      <button class="nav-button prev" @click="prevReview">&#10094;</button>

      <div class="reviews-grid" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(review, index) in reviews" :key="index" class="review-item">
          <div class="review-content">
            <img :src="review.avatar" :alt="review.name" class="review-avatar" />
            <div class="review-text">
              <h3>{{ review.name }}</h3>
              <p class="review-position">{{ review.position }}</p>
              <div class="stars">
                <span v-for="i in 5" :key="i" :class="{ filled: i <= review.rating }">★</span>
              </div>
              <p class="review-comment">"{{ review.comment }}"</p>
            </div>
          </div>
        </div>
      </div>

      <button class="nav-button next" @click="nextReview">&#10095;</button>
    </div>

    <div class="dots">
      <span
        v-for="(review, index) in reviews"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="goToReview(index)"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const reviews = [
  {
    name: 'Алексей Петров',
    position: 'Специалист по кибербезопасности',
    comment:
      'Отличные курсы! Материал подается структурированно, всегда готовы помочь. Особенно понравились практические задания.',
    rating: 5,
    avatar: './src/assets/img/review/review1.png',
  },
  {
    name: 'Мария Иванова',
    position: 'Системный администратор',
    comment:
      'Прошла курс по этичному хакингу. Получила много практических навыков, которые сразу применила на работе. Рекомендую!',
    rating: 4,
    avatar: './src/assets/img/review/review2.png',
  },
  {
    name: 'Дмитрий Смирнов',
    position: 'Разработчик',
    comment:
      'Хорошая подача материала, но хотелось бы больше практики. В целом остался доволен обучением.',
    rating: 4,
    avatar: './src/assets/img/review/review1.png',
  },
  {
    name: 'Елена Козлова',
    position: 'IT-менеджер',
    comment:
      'Лучшие курсы по информационной безопасности, которые я встречала. Особенно ценю индивидуальный подход к каждому студенту.',
    rating: 5,
    avatar: './src/assets/img/review/review1.png',
  },
]

const currentIndex = ref(0)

const nextReview = () => {
  currentIndex.value = (currentIndex.value + 1) % reviews.length
}

const prevReview = () => {
  currentIndex.value = (currentIndex.value - 1 + reviews.length) % reviews.length
}

const goToReview = (index) => {
  currentIndex.value = index
}
</script>

<style scoped>
@import '@/assets/css/FeedbackSection.css';
</style>
