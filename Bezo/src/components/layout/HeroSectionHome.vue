<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Добро пожаловать в онлайн школу информационной безопасности</h1>
      <p>
        Изучайте лучшие курсы по защите информации с хорошим наполнением и возможностью применить
        свои знания на практике.
      </p>
      <div class="hero-buttons">
        <router-link to="/courses"><a class="btn-primary">Посмотреть курсы</a></router-link>
        <router-link to="/about"><a class="btn-secondary">О школе</a></router-link>
      </div>
    </div>
    <div class="hero-image">
      <img src="/src/assets/img/heroImage.png" alt="Школа информационной безопасности" />
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
@import '@/assets/css/HeroSectionHome.css';
</style>
