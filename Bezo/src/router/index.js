import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import CoursesPage from '@/pages/CoursesPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import UserPage from '@/pages/UserPage.vue'
import SQLInjectionn from '@/pages/SQLInjectionn.vue'

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
      component: AboutPage
    },
    {
      path: '/contact',
      component: ContactPage
    },
    {
      path: '/user',
      component: UserPage
    },
    {
      path: '/sql',
      component: SQLInjectionn
    }
  ],
})

export default router
