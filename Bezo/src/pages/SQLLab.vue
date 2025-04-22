<template>
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

<script>
export default {
  data() {
    return {
      currentCommand: '',
      logs: [],
      vulnerableBackend: null
    }
  },
  mounted() {
    this.logs.push('Добро пожаловать в лабораторию SQL-инъекций!');
    this.logs.push('Введите SQL-запрос или выберите пример из списка.');
    this.initializeBackend();
  },
  methods: {
    async initializeBackend() {
      // Здесь можно инициализировать подключение к изолированному бэкенду
      // Например, через WebSocket или API
      this.vulnerableBackend = {
        users: [
          {id: 1, login: 'admin', password: 'weakpass'},
          {id: 2, login: 'user1', password: '123456'}
        ]
      };
    },
    executeCommand() {
      if (!this.currentCommand.trim()) return;

      this.logs.push(`> ${this.currentCommand}`);

      // Эмуляция уязвимого бэкенда
      try {
        const result = this.simulateVulnerableQuery(this.currentCommand);
        this.logs.push(`Результат: ${JSON.stringify(result)}`);
      } catch (error) {
        this.logs.push(`Ошибка: ${error.message}`);
      }

      this.currentCommand = '';
    },
    simulateVulnerableQuery(query) {
      // Очень упрощенная эмуляция SQL-инъекции
      if (query.includes("' OR '1'='1")) {
        return this.vulnerableBackend.users;
      }

      if (query.includes("SELECT * FROM users WHERE login =")) {
        const login = query.match(/login = '([^']+)'/)?.[1];
        return this.vulnerableBackend.users.filter(u => u.login === login);
      }

      return {message: "Неверный запрос", query};
    },
    loadExample(num) {
      const examples = [
        "",
        "SELECT * FROM users WHERE login = 'admin' AND password = 'wrongpass'",
        "SELECT * FROM users WHERE login = 'admin' OR '1'='1' --",
        "SELECT * FROM users WHERE login = 'admin' UNION SELECT 1,table_name,3 FROM information_schema.tables --"
      ];

      this.currentCommand = examples[num];
      this.logs.push(`Загружен пример #${num}`);
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/SQLLab.css';
</style>
