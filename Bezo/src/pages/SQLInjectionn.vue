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
              <div 
                v-for="(option, oIndex) in question.options" 
                :key="oIndex" 
                class="option"
                :class="{
                  'selected': quizAnswers[index] && quizAnswers[index][qIndex] === option,
                  'correct': task.quiz.submitted && oIndex === question.correctAnswer,
                  'incorrect': task.quiz.submitted && quizAnswers[index] && 
                              quizAnswers[index][qIndex] === option && 
                              oIndex !== question.correctAnswer
                }"
              >
                <input 
                  type="radio" 
                  :name="'question' + qIndex" 
                  :id="'q' + qIndex + 'o' + oIndex"
                  :value="option"
                  v-model="quizAnswers[index][qIndex]"
                  :disabled="task.quiz.submitted"
                >
                <label :for="'q' + qIndex + 'o' + oIndex">{{ option }}</label>
              </div>
            </div>
            <button 
              class="btn submit-quiz" 
              @click="submitQuiz(index)"
              :disabled="!isQuizComplete(index) || task.quiz.submitted"
            >
              {{ task.quiz.submitted ? 'Тест завершен' : 'Отправить' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно с результатом -->
    <div v-if="showResultModal" class="result-modal" @click.self="closeResultModal">
      <div class="modal-content" :style="{ borderColor: resultModal.color }">
        <span class="result-icon" :style="{ color: resultModal.color }">
          {{ resultModal.icon }}
        </span>
        <h3>{{ resultModal.title }}</h3>
        <p>{{ resultModal.message }}</p>
        <button @click="closeResultModal">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { tasks } from '@/assets/dataSQL/courseData.js';
import { quizResults } from '@/assets/dataSQL/quizResults';

export default {
  data() {
    return {
      progress: 0,
      activeTask: 0,
      quizAnswers: {},
      tasks: JSON.parse(JSON.stringify(tasks)), // глубокое копирование
      showResultModal: false,
      resultModal: {}
    };
  },
  created() {
    this.initializeQuizData();
    this.loadProgress();
  },
  methods: {
    initializeQuizData() {
      this.tasks.forEach((task, index) => {
        if (task.quiz) {
          this.$set(this.quizAnswers, index, {});
          if (!task.quiz.submitted) {
            this.$set(this.tasks[index].quiz, 'submitted', false);
          }
          if (!task.quiz.correct) {
            this.$set(this.tasks[index].quiz, 'correct', false);
          }
        }
      });
    },
    
    loadProgress() {
      const savedProgress = localStorage.getItem('sqlCourseProgress');
      if (savedProgress) {
        try {
          const progressData = JSON.parse(savedProgress);
          this.progress = progressData.progress || 0;
          this.activeTask = progressData.activeTask || 0;
          this.quizAnswers = progressData.quizAnswers || {};
          
          // Восстанавливаем состояние тестов
          this.tasks.forEach((task, index) => {
            if (task.quiz && this.quizAnswers[index]) {
              const answers = Object.values(this.quizAnswers[index]);
              if (answers.length === task.quiz.questions.length) {
                task.quiz.submitted = true;
                task.quiz.correct = task.quiz.questions.every((q, qIndex) => {
                  return answers[qIndex] === q.options[q.correctAnswer];
                });
              }
            }
          });
        } catch (e) {
          console.error('Ошибка загрузки прогресса:', e);
        }
      }
    },
    
    toggleTask(index) {
      this.activeTask = this.activeTask === index ? null : index;
    },
    
    isQuizComplete(index) {
      if (!this.tasks[index].quiz) return true;
      const answers = this.quizAnswers[index];
      return answers && Object.keys(answers).length === this.tasks[index].quiz.questions.length;
    },
    
    submitQuiz(index) {
      const task = this.tasks[index];
      const allCorrect = task.quiz.questions.every((question, qIndex) => {
        return this.quizAnswers[index][qIndex] === question.options[question.correctAnswer];
      });
      
      task.quiz.submitted = true;
      task.quiz.correct = allCorrect;
      
      // Показываем соответствующий результат
      this.resultModal = allCorrect ? quizResults.correct : quizResults.incorrect;
      this.showResultModal = true;
      
      this.updateProgress();
      this.saveProgress();
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
    },
    
    closeResultModal() {
      this.showResultModal = false;
      if (this.tasks[this.activeTask].quiz.correct && this.activeTask < this.tasks.length - 1) {
        setTimeout(() => {
          this.activeTask++;
        }, 300);
      }
    }
  }
};
</script>

<style scoped>
.sql-course {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.course-header {
  text-align: center;
  margin-bottom: 20px;
}

.course-meta {
  margin: 10px 0;
}

.difficulty, .duration {
  display: inline-block;
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.progress-container {
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin: 20px 0;
  position: relative;
}

.progress-bar {
  height: 20px;
  background-color: #4CAF50;
  border-radius: 4px;
  transition: width 0.5s;
}

.progress-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #333;
}

.tasks-container {
  margin-top: 30px;
}

.task-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
}

.task-header {
  padding: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.task-header:hover {
  background-color: #f0f0f0;
}

.task-number {
  font-weight: bold;
  margin-right: 10px;
}

.task-title {
  flex-grow: 1;
}

.task-arrow {
  margin-left: auto;
}

.task-content {
  padding: 15px;
  background-color: white;
}

/* Новые стили для контента */
.content-text {
  line-height: 1.6;
}

.content-text h2 {
  color: #2c3e50;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1.5em;
}

.content-text h3 {
  color: #34495e;
  margin-top: 15px;
  margin-bottom: 8px;
  font-size: 1.2em;
}

.content-text p {
  margin-bottom: 10px;
}

.content-text ul {
  margin: 10px 0;
  padding-left: 20px;
}

.content-text li {
  margin-bottom: 5px;
}

.code-example {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  margin: 15px 0;
}

.code-example pre {
  margin: 0;
  overflow-x: auto;
}

.code-example code {
  font-family: 'Courier New', Courier, monospace;
  color: #c7254e;
}

.quiz-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.question {
  margin-bottom: 15px;
}

.question-text {
  font-weight: bold;
  margin-bottom: 8px;
}

.option {
  margin: 5px 0;
  display: flex;
  align-items: center;
}

.option input {
  margin-right: 8px;
}

.submit-quiz {
  background-color: #4CAF50;
  color: white;
  margin-top: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-quiz:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.quiz-feedback {
  margin-top: 10px;
  font-weight: bold;
  color: #4CAF50;
}

.result-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.result-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.option.correct {
  background-color: #e8f5e9;
}

.option.incorrect {
  background-color: #ffebee;
}

.option.selected {
  font-weight: bold;
}
</style>
