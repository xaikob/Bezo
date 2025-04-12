<template>
  <div class="about-page">
    <NavBar />

    <!-- Hero-секция с фоном -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Добро пожаловать в школу информационной безопасности «Bezo»</h1>
        <p>
          Мы обучаем будущих экспертов в сфере кибербезопасности. Онлайн, доступно и эффективно.
        </p>
      </div>
    </section>

    <!-- Миссия -->
    <section class="section mission">
      <h2 class="section-title">Наша миссия</h2>
      <p class="section-text">
        Мы стремимся создать сообщество, где каждый может получить доступ к современным знаниям по кибербезопасности и ИТ. Мы обучаем защищать цифровой мир.
      </p>
    </section>

    <!-- Преимущества -->
    <section class="section features">
      <h2 class="section-title">Почему выбирают нас</h2>
      <div class="feature-cards">
        <div class="feature-card">
          <span>🧑‍🏫</span>
          <h3>Экспертные преподаватели</h3>
          <p>Все курсы ведут специалисты с практическим опытом в кибербезопасности.</p>
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

    <!-- Призыв к действию -->
    <section class="section cta">
      <h2 class="section-title">Готовы начать?</h2>
      <p>Присоединяйтесь к нашему сообществу и начните путь к профессии будущего.</p>
      <router-link to="/register" class="cta-button">Зарегистрироваться</router-link>
    </section>
  </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
</script>

<style scoped>
.about-page {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9fafb;
}

/* Hero-секция */
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
    url('https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1470&q=80') no-repeat center center;
  background-size: cover;
  color: #fff;
  padding: 120px 20px;
  text-align: center;
  animation: fadeIn 1.2s ease-in-out;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.hero-section p {
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
}

/* Общие секции */
.section {
  padding: 60px 20px;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.section-text {
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  color: #475569;
}

/* Карточки преимуществ */
.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

.feature-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card span {
  font-size: 2rem;
  display: block;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #0f172a;
}

.feature-card p {
  font-size: 1rem;
  color: #64748b;
}

/* Призыв к действию */
.cta {
  background: linear-gradient(90deg, #0f172a, #1e3a8a);
  color: white;
  border-radius: 10px;
  padding: 50px 20px;
}

.cta-button {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #38bdf8;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #0ea5e9;
}

.cta h2{
  color: #fff;
}
/* Анимация */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
