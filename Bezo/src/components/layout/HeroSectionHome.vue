<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Добро пожаловать в онлайн школу информационной безопасности</h1>
      <p>Изучайте лучшие курсы по защите информации с опытными преподавателями и практическими заданиями.</p>
      <div class="hero-buttons">
        <router-link to="/courses"><a class="btn-primary">Посмотреть курсы</a></router-link>
        <!-- <a href="#courses" class="btn-primary">Посмотреть курсы</a> -->
        <router-link to="/about"><a class="btn-secondary">О школе</a></router-link>
        <!-- <a href="#about" class="btn-secondary">О школе</a> -->
      </div>
    </div>
    <div class="hero-image">
      <img src="/src/assets/img/heroImage.png" alt="Школа информационной безопасности" />
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
@import '@/assets/css/HeroSectionHome.css';
</style>
