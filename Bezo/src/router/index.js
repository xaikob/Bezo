import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import CoursesPage from '@/pages/CoursesPage.vue'
import LoginPage from '@/pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/registrate',
      component: RegisterPage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/courses',
      component: CoursesPage,
    },
    {
      path: '/about',
    },
    {
      path: '/contact',
    }
  ],
})

export default router
