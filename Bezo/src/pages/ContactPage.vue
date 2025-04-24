<template>
  <div class="contact-page">
    <NavBar />

    <section class="contact-hero">
      <h1>Свяжитесь с нами</h1>
      <p>Мы всегда готовы ответить на ваши вопросы и помочь вам.</p>
    </section>

    <section class="contact-content">
      <div class="contact-info">
        <h2>Контактная информация</h2>
        <p><strong>Адрес:</strong> г. Москва, ул. Пушкина, д. 666</p>
        <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
        <p><strong>Email:</strong> info@bezoschool.ru</p>
        <p><strong>Часы работы:</strong> Пн-Пт: 10:00–18:00</p>
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <h2>Обратная связь</h2>

        <label>
          Имя:
          <input v-model="form.name" type="text" required />
        </label>

        <label>
          Email:
          <input v-model="form.email" type="email" required />
        </label>

        <label>
          Сообщение:
          <textarea v-model="form.message" rows="5" required></textarea>
        </label>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Отправка...' : 'Отправить' }}
        </button>

        <p v-if="submitted" class="success-message">
          Спасибо! Мы свяжемся с вами в ближайшее время.
        </p>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    // Это можно заменить на отправку в Supabase
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(form.value),
      headers: { 'Content-Type': 'application/json' },
    })

    submitted.value = true
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    alert('Произошла ошибка при отправке формы.')
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import '@/assets/css/ContactPage.css';
</style>
