<template>
  <NavBar />
  <div class="sql-lab">
    <h2>Лаборатория SQL-инъекций</h2>

    <div class="terminal">
      <div v-for="(log, index) in logs" :key="index" class="log-entry">
        {{ log }}
      </div>
      <div class="input-line">
        <span class="prompt">SQL&gt;</span>
        <input
          v-model="currentCommand"
          @keyup.enter="executeCommand"
          placeholder="Введите SQL-запрос"
        />
      </div>
    </div>

    <div class="tutorial-section">
      <h3>Примеры для тестирования:</h3>
      <button @click="loadExample(1)">Простая инъекция</button>
      <button @click="loadExample(2)">Обход аутентификации</button>
      <button @click="loadExample(3)">Извлечение данных</button>
    </div>

    <div class="safety-warning">
      ⚠️ Это изолированная среда. Не пытайтесь использовать эти техники на реальных сайтах.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'

const currentCommand = ref('')
const logs = ref([])
const vulnerableBackend = ref(null)

const initializeBackend = () => {
  vulnerableBackend.value = {
    users: [
      { id: 1, login: 'admin', password: 'weakpass' },
      { id: 2, login: 'user1', password: '123456' },
    ],
  }
}

const simulateVulnerableQuery = (query) => {
  if (query.includes("' OR '1'='1")) {
    return vulnerableBackend.value.users
  }

  if (query.includes('SELECT * FROM users WHERE login =')) {
    const login = query.match(/login = '([^']+)'/)?.[1]
    return vulnerableBackend.value.users.filter((u) => u.login === login)
  }

  return { message: 'Неверный запрос', query }
}

const executeCommand = () => {
  if (!currentCommand.value.trim()) return

  logs.value.push(`> ${currentCommand.value}`)

  try {
    const result = simulateVulnerableQuery(currentCommand.value)
    logs.value.push(`Результат: ${JSON.stringify(result)}`)
  } catch (error) {
    logs.value.push(`Ошибка: ${error.message}`)
  }

  currentCommand.value = ''
}

const loadExample = (num) => {
  const examples = [
    '',
    "SELECT * FROM users WHERE login = 'admin' AND password = 'wrongpass'",
    "SELECT * FROM users WHERE login = 'admin' OR '1'='1' --",
    "SELECT * FROM users WHERE login = 'admin' UNION SELECT 1,table_name,3 FROM information_schema.tables --",
  ]

  currentCommand.value = examples[num]
  logs.value.push(`Загружен пример #${num}`)
}

onMounted(() => {
  logs.value.push('Добро пожаловать в лабораторию SQL-инъекций!')
  logs.value.push('Введите SQL-запрос или выберите пример из списка.')
  initializeBackend()
})
</script>

<style scoped>
@import '@/assets/css/SQLLab.css';
</style>
