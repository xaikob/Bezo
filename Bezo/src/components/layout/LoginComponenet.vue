<template>
  <NavBar/>
  <div class="formCard">
    <form class="form" @submit="handleSubmit">
      <p class="title">Войти </p>
      <p class="message">Снова рады вас видеть. </p>
      <label>
        <input v-model="formData.email" required="true" placeholder="" type="email" class="input">
        <span>Email</span>
      </label>

      <label>
        <input v-model="formData.password" required="true" placeholder="" type="password" class="input">
        <span>Пароль...</span>
      </label>
      <button type="submit" class="submit">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import NavBar from './NavBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const handleSubmit = async (e) => {
  e.preventDefault()  // Останавливаем стандартное поведение формы (перезагрузку страницы)

  try {
    const response = await axios.post('http://localhost:5174/api/auth/login', {
      email: formData.value.email,
      password: formData.value.password
    })

    // Сохраняем токен в localStorage
    localStorage.setItem('token', response.data.token)

    // После успешного логина перенаправляем пользователя
    router.push('/')
  } catch (error) {
    console.error('Ошибка при входе:', error.response?.data || error.message)
    alert('Неверный email или пароль!')
  }
}
</script>


<style scoped>
@import '@/assets/css/LoginComponenet.css';
</style>
