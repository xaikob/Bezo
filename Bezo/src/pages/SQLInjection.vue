<template>
  <NavBar />
  <div class="sql-course">
    <header class="course-header">
      <h1>{{ courseMeta.title }}</h1>
      <p class="course-description">{{ courseMeta.description }}</p>
      <div class="course-meta">
        <span class="difficulty">{{ courseMeta.difficulty }}</span>
        <span class="duration">{{ courseMeta.duration }}</span>
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
        :class="{ active: activeTask === index }"
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
                  :name="'question' + qIndex + '_' + index"
                  :id="'q' + qIndex + 'o' + oIndex + '_' + index"
                  :value="option"
                  v-model="quizAnswers[index][qIndex]"
                />
                <label :for="'q' + qIndex + 'o' + oIndex + '_' + index" class="option-label">
                  {{ option }}
                </label>
              </div>
            </div>
            <p
              v-if="task.quiz.submitted"
              class="quiz-feedback"
              :class="{ correct: task.quiz.correct, incorrect: !task.quiz.correct }"
            >
              {{
                task.quiz.correct
                  ? '✓ Правильно! Можете перейти к следующему заданию.'
                  : '✗ Есть ошибки. Проверьте ответы и попробуйте снова.'
              }}
            </p>
            <button
              class="btn submit-quiz"
              @click="submitQuiz(index)"
              :disabled="!isQuizComplete(index)"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { courseData } from '@/data/courseData'
import NavBar from '@/components/layout/NavBar.vue'

// Инициализация реактивных переменных
const courseMeta = ref(courseData.meta)
const progress = ref(courseData.meta.initialProgress)
const activeTask = ref(null)
const quizAnswers = ref({})
const tasks = ref(
  courseData.tasks.map((task) => ({
    ...task,
    quiz: task.quiz ? { ...task.quiz, submitted: false, correct: false } : null,
  })),
)

// Загрузка сохраненного прогресса
onMounted(() => {
  tasks.value.forEach((task, index) => {
    if (task.quiz && !quizAnswers.value[index]) {
      quizAnswers.value[index] = {}
    }
  })

  const savedProgress = localStorage.getItem('sqlCourseProgress')
  if (savedProgress) {
    try {
      const progressData = JSON.parse(savedProgress)
      progress.value = progressData.progress || courseData.meta.initialProgress
      activeTask.value = progressData.activeTask || null
      quizAnswers.value = progressData.quizAnswers || {}

      tasks.value.forEach((task, index) => {
        if (task.quiz && quizAnswers.value[index]) {
          const answers = Object.values(quizAnswers.value[index])
          if (answers.length === task.quiz.questions.length) {
            task.quiz.submitted = true
            task.quiz.correct = task.quiz.questions.every((q, qIndex) => {
              return answers[qIndex] === q.options[q.correctAnswer]
            })
          }
        }
      })
    } catch (e) {
      console.error('Error loading progress:', e)
    }
  }
})

// Методы компонента
const toggleTask = (index) => {
  activeTask.value = activeTask.value === index ? null : index
  saveProgress()
}

const isQuizComplete = (index) => {
  if (!tasks.value[index].quiz) return true
  const answers = quizAnswers.value[index]
  return answers && Object.keys(answers).length === tasks.value[index].quiz.questions.length
}

const submitQuiz = (index) => {
  const task = tasks.value[index]
  let allCorrect = true

  task.quiz.questions.forEach((question, qIndex) => {
    const userAnswer = quizAnswers.value[index][qIndex]
    const correctAnswer = question.options[question.correctAnswer]
    if (userAnswer !== correctAnswer) {
      allCorrect = false
    }
  })

  // Используем Object.assign для сохранения реактивности
  tasks.value[index].quiz = Object.assign({}, tasks.value[index].quiz, {
    submitted: true,
    correct: allCorrect,
  })

  // Обновляем прогресс
  updateProgress()
  // Сохраняем состояние
  saveProgress()
}

const updateProgress = () => {
  const totalTasksWithQuiz = tasks.value.filter((t) => t.quiz).length
  const completedTasks = tasks.value.filter((t) => t.quiz && t.quiz.correct).length
  progress.value = Math.round((completedTasks / totalTasksWithQuiz) * 100)
}

const saveProgress = () => {
  const progressData = {
    progress: progress.value,
    activeTask: activeTask.value,
    quizAnswers: quizAnswers.value,
  }
  localStorage.setItem('sqlCourseProgress', JSON.stringify(progressData))
}
</script>

<style scoped>
@import '@/assets/css/SQLInjectionn.css';
</style>
