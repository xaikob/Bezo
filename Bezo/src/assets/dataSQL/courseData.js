export const tasks = [
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
