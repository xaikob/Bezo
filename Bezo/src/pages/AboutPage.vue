<template>
  <div class="about-page">
    <NavBar />
    <section class="hero-section">
      <div class="hero-content">
        <h1>Добро пожаловать в школу информационной безопасности «Bezo»</h1>
        <p>
          Мы обучаем будущих экспертов в сфере кибербезопасности. Онлайн, доступно и эффективно.
        </p>
      </div>
    </section>

    <section class="section mission">
      <h2 class="section-title">Наша миссия</h2>
      <p class="section-text">
        Мы стремимся создать сообщество, где каждый может получить доступ к современным знаниям по
        кибербезопасности и ИТ. Мы обучаем защищать цифровой мир.
      </p>
    </section>

    <section class="section features">
      <h2 class="section-title">Почему выбирают нас</h2>
      <div class="feature-cards">
        <div class="feature-card">
          <span>🧑‍🏫</span>
          <h3>Практический подход</h3>
          <p>Все курсы созданы специалистами с практическим опытом в кибербезопасности.</p>
        </div>
        <div class="feature-card">
          <span>🛡️</span>
          <h3>Фокус на безопасность</h3>
          <p>Мы не распыляемся — мы обучаем защищать инфраструктуру и данные.</p>
        </div>
        <div class="feature-card">
          <span>💡</span>
          <h3>Проектное обучение</h3>
          <p>Каждый курс сопровождается практическими задачами и кейсами.</p>
        </div>
        <div class="feature-card">
          <span>🌍</span>
          <h3>Онлайн-доступность</h3>
          <p>Проходите курсы из любой точки мира — в удобном темпе.</p>
        </div>
      </div>
    </section>

    <section class="section cta">
      <h2 class="section-title">Готовы начать?</h2>
      <p>Присоединяйтесь к нашему сообществу и начните путь к профессии будущего.</p>
      <router-link to="/registrate" class="cta-button">Зарегистрироваться</router-link>
    </section>
  </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
</script>

<style scoped>
@import '@/assets/css/AboutPage.css';
</style>
