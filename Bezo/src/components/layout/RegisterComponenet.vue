<template>
  <NavBar/>
  <div class="formCard">
    <form class="form" @submit="handleSubmit">
      <p class="title">Регистрация </p>
      <p class="message">Зарегистрируйтесь и получите полный доступ. </p>
      <div class="flex">
        <label>
          <input v-model="formData.firstName" required="true" placeholder="" type="text" class="input">
          <span>Имя</span>
        </label>

        <label>
          <input v-model="formData.lastName" required="true" placeholder="" type="text" class="input">
          <span>Фамилия</span>
        </label>
      </div>

      <label>
        <input v-model="formData.email" required="true" placeholder="" type="email" class="input">
        <span>Email</span>
      </label>

      <label>
        <input v-model="formData.password" required="true" placeholder="" type="password" class="input">
        <span>Пароль...</span>
      </label>
      <label>
        <input v-model="formData.confirmPassword" required="true" placeholder="" type="password" class="input">
        <span>Подтверждение пароля</span>
      </label>
      <button class="submit">Зарегистрироваться</button>
      <p class="signin">Уже есть аккаунт? <router-link to='/login'>Войти</router-link></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import NavBar from './NavBar.vue'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = async (e) => {
  e.preventDefault()  // Останавливаем стандартное поведение формы (перезагрузку страницы)

  // Проверяем совпадение паролей
  if (formData.value.password !== formData.value.confirmPassword) {
    alert("Пароли не совпадают!")
    return
  }

  try {
    const response = await axios.post('http://localhost:5174/api/auth/register', {
      username: formData.value.firstName,
      email: formData.value.email,
      password: formData.value.password
    })

    // В случае успешной регистрации
    alert("Регистрация прошла успешно!")
    // console.log(response.data)
  } catch (error) {
    // Выводим детальную ошибку
    console.error("Ошибка регистрации:", error.response?.data || error.message)
    alert("Произошла ошибка при регистрации!")
  }
}

</script>

<style scoped>
@import '@/assets/css/RegisterComponenet.css';
</style>
