<template>
  <NavBar />
  <div class="formCard">
    <form class="form" @submit="handleSubmit">
      <p class="title">Войти</p>
      <p class="message">Снова рады вас видеть.</p>
      <label>
        <input v-model="email" required="true" placeholder="" type="email" class="input" />
        <span>Email</span>
      </label>

      <label>
        <input v-model="password" required="true" placeholder="" type="password" class="input" />
        <span>Пароль...</span>
      </label>
      <button type="submit" class="submit">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')

const userStore = useUserStore()
const router = useRouter()

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value,
    })

    const { user, token } = res.data

    if (user && token) {
      userStore.setUser({
        userId: user.id,
        username: user.first_name || user.email.split('@')[0],
      })
      localStorage.setItem('token', token) // Сохраняем токен
      router.push('/user')
    } else {
      console.error('Нет данных пользователя в ответе:', res.data)
    }
  } catch (err) {
    console.error('Ошибка при входе:', err.response?.data || err.message)
    alert(err.response?.data?.message || 'Ошибка при входе')
  }
}
</script>

<style scoped>
@import '@/assets/css/LoginComponenet.css';
</style>
