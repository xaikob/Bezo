<template>
  <header class="header">
    <div class="logo" @click="$router.push('/')">
      <img class="logo_img" src="/src/assets/img/logo.svg" alt="Logo" />
      <span>Bezo</span>
    </div>

    <nav class="nav">
      <ul class="desctopNav">
        <li><router-link to="/about">О школе</router-link></li>
        <li><router-link to="/courses">Курсы</router-link></li>
        <li><router-link to="/contact">Контакты</router-link></li>
        <li><router-link :to="userStore.isLoggedIn ? '/user' : '/registrate'"><img class="userLogo" src="/src/assets/img/userAvatar.svg" alt="User" /></router-link></li>
        <button v-if="userStore.isLoggedIn" @click="logout">Выйти</button>
      </ul>
    </nav>

    <div class="burger" @click="toggleMenu">
      <div class="burger-line"></div>
      <div class="burger-line"></div>
      <div class="burger-line"></div>
    </div>

    <nav v-if="menuOpen" class="mobile-nav">
      <ul>
        <li><router-link to="/about" @click="closeMenu">О школе</router-link></li>
        <li><router-link to="/courses" @click="closeMenu">Курсы</router-link></li>
        <li><router-link to="/contact" @click="closeMenu">Контакты</router-link></li>
        <li><router-link to="/login" @click="closeMenu">Войти</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
// Состояние для отображения меню на мобильных устройствах
const menuOpen = ref(false)

// Открытие/закрытие мобильного меню
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// Закрытие после выбора пункта
const closeMenu = () => {
  menuOpen.value = false
}
</script>

<style scoped>
@import '@/assets/css/NavBar.css';
</style>
