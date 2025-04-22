<template>
  <div class="sql-course">
    <header class="course-header">
      <h1>SQL-инъекции</h1>
      <p class="course-description">Изучите методы обнаружения и эксплуатации уязвимостей SQL-инъекций</p>
      <div class="course-meta">
        <span class="difficulty">Средний</span>
        <span class="duration">30 мин</span>
      </div>
    </header>

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      <span class="progress-text">Прогресс ({{ progress }}%)</span>
    </div>

    <div class="tasks-container">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="task-item"
        :class="{ 'active': activeTask === index }"
      >
        <div class="task-header" @click="toggleTask(index)">
          <span class="task-number">Задание.{{ index + 1 }}</span>
          <span class="task-title">{{ task.title }}</span>
          <span class="task-arrow">{{ activeTask === index ? '▼' : '▶' }}</span>
        </div>

        <div v-if="activeTask === index" class="task-content">
          <div class="content-text" v-html="task.content"></div>

          <div v-if="task.quiz" class="quiz-container" @click.stop>
            <h3>Тест</h3>
            <div v-for="(question, qIndex) in task.quiz.questions" :key="qIndex" class="question">
              <p class="question-text">{{ question.text }}</p>
              <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option">
                <input
                  type="radio"
                  :name="'question' + qIndex"
                  :id="'q' + qIndex + 'o' + oIndex"
                  :value="option"
                  v-model="quizAnswers[index][qIndex]"
                >
                <label :for="'q' + qIndex + 'o' + oIndex">{{ option }}</label>
              </div>
            </div>
            <button
              class="btn submit-quiz"
              @click="submitQuiz(index)"
              :disabled="!isQuizComplete(index)"
            >
              Отправить
            </button>
            <p v-if="task.quizSubmitted" class="quiz-feedback">
              {{ task.quizCorrect ? 'Правильно! Переходим к следующему заданию...' : 'Пожалуйста, попробуйте еще раз.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 9,
      activeTask: null,
      quizAnswers: {},
      tasks: [
        {
          title: 'Введение',
          content: `
            <h2>Что такое SQL-инъекция?</h2>
            <p>SQL-инъекция — это техника внедрения вредоносного SQL-кода в запросы к базе данных. Это одна из самых опасных уязвимостей веб-приложений, позволяющая злоумышленнику:</p>
            <ul>
              <li>Читать конфиденциальные данные из базы</li>
              <li>Изменять или удалять данные</li>
              <li>Обходить аутентификацию</li>
              <li>Выполнять административные операции</li>
            </ul>
            <div class="code-example">
              <p>Пример уязвимого кода на PHP:</p>
              <pre><code>$query = "SELECT * FROM users WHERE id = " . $_GET['id'];</code></pre>
            </div>
          `,
          quiz: {
            questions: [
              {
                text: 'Что такое SQL-инъекция?',
                options: [
                  'Метод оптимизации SQL-запросов',
                  'Техника внедрения вредоносного SQL-кода',
                  'Способ резервного копирования баз данных',
                  'Язык программирования для работы с базами данных'
                ],
                correctAnswer: 1
              }
            ],
            submitted: false,
            correct: false
          }
        },
        // Остальные задачи остаются без изменений
        {
          title: 'Что такое база данных?',
          content: `
            <h2>Базы данных</h2>
            <p>База данных — это организованная коллекция структурированных данных, хранящихся в электронном виде. Основные типы:</p>
            <ul>
              <li><strong>Реляционные (SQL)</strong>: MySQL, PostgreSQL, Oracle - данные в таблицах со связями</li>
              <li><strong>NoSQL</strong>: MongoDB, Cassandra - документы, ключ-значение, графы</li>
              <li><strong>Иерархические</strong>: XML, LDAP - древовидная структура</li>
            </ul>
            <p>SQL (Structured Query Language) — язык для управления реляционными базами данных.</p>
          `,
          quiz: {
            questions: [
              {
                text: 'Какой из этих типов НЕ является типом базы данных?',
                options: [
                  'Реляционная',
                  'NoSQL',
                  'Иерархическая',
                  'Линейная'
                ],
                correctAnswer: 3
              },
              {
                text: 'Какой язык используется для работы с реляционными базами?',
                options: [
                  'Python',
                  'SQL',
                  'Java',
                  'PHP'
                ],
                correctAnswer: 1
              }
            ],
            submitted: false,
            correct: false
          }
        },
        {
          title: 'Виды SQL-инъекций',
          content: `
            <h2>Основные виды SQL-инъекций</h2>
            <h3>1. In-Band SQLi</h3>
            <p>Злоумышленник использует тот же канал для атаки и получения результатов. Два подтипа:</p>
            <ul>
              <li><strong>Error-based</strong> - получение информации из сообщений об ошибках</li>
              <li><strong>Union-based</strong> - использование оператора UNION для объединения результатов</li>
            </ul>

            <h3>2. Blind SQLi</h3>
            <p>Когда приложение не возвращает данных напрямую:</p>
            <ul>
              <li><strong>Boolean-based</strong> - анализ логических ответов (true/false)</li>
              <li><strong>Time-based</strong> - анализ временных задержек</li>
            </ul>

            <h3>3. Out-of-Band SQLi</h3>
            <p>Используются альтернативные каналы передачи данных (DNS, HTTP-запросы).</p>
          `,
          quiz: {
            questions: [
              {
                text: 'Какой вид SQLi использует оператор UNION?',
                options: [
                  'Error-based',
                  'Union-based',
                  'Boolean-based',
                  'Time-based'
                ],
                correctAnswer: 1
              }
            ],
            submitted: false,
            correct: false
          }
        }
      ]
    }
  },
  created() {
    this.tasks.forEach((task, index) => {
      if (task.quiz) {
        if (!this.quizAnswers[index]) {
          this.quizAnswers[index] = {};
        }
      }
    });

    const savedProgress = localStorage.getItem('sqlCourseProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        this.progress = progress.progress || 9;
        this.activeTask = progress.activeTask || null;
        this.quizAnswers = progress.quizAnswers || {};

        this.tasks.forEach((task, index) => {
          if (task.quiz && this.quizAnswers[index]) {
            const answers = Object.values(this.quizAnswers[index]);
            if (answers.length === task.quiz.questions.length) {
              task.quizSubmitted = true;
              task.quizCorrect = task.quiz.questions.every((q, qIndex) => {
                return answers[qIndex] === q.options[q.correctAnswer];
              });
            }
          }
        });
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
  },
  methods: {
    toggleTask(index) {
      if (this.activeTask === index) {
        this.activeTask = null;
      } else {
        this.activeTask = index;
      }
      this.saveProgress();
    },
    isQuizComplete(index) {
      if (!this.tasks[index].quiz) return true;
      const answers = this.quizAnswers[index];
      return answers && Object.keys(answers).length === this.tasks[index].quiz.questions.length;
    },
    submitQuiz(index) {
      const task = this.tasks[index];
      let allCorrect = true;

      task.quiz.questions.forEach((question, qIndex) => {
        const userAnswer = this.quizAnswers[index][qIndex];
        const correctAnswer = question.options[question.correctAnswer];
        if (userAnswer !== correctAnswer) {
          allCorrect = false;
        }
      });

      task.quiz.submitted = true;
      task.quiz.correct = allCorrect;

      if (allCorrect) {
        setTimeout(() => {
          this.activeTask = index + 1 < this.tasks.length ? index + 1 : null;
          this.updateProgress();
          this.saveProgress();
        }, 1500);
      } else {
        this.saveProgress();
      }
    },
    updateProgress() {
      const totalTasksWithQuiz = this.tasks.filter(t => t.quiz).length;
      const completedTasks = this.tasks.filter(t => t.quiz && t.quiz.correct).length;
      this.progress = Math.round((completedTasks / totalTasksWithQuiz) * 100);
    },
    saveProgress() {
      const progressData = {
        progress: this.progress,
        activeTask: this.activeTask,
        quizAnswers: this.quizAnswers
      };
      localStorage.setItem('sqlCourseProgress', JSON.stringify(progressData));
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/SQLInjection.css';
</style>
