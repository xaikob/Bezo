import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Сначала создаём экземпляр приложения
const app = createApp(App)

// Подключаем Pinia с плагином
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia) // Подключаем pinia

// Подключаем маршрутизатор
app.use(router)

// Монтируем приложение
app.mount('#app')
