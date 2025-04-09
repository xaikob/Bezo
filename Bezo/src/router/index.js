import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import RegisterComponenet from '@/components/layout/RegisterComponenet.vue'
import CoursesPage from '@/pages/CoursesPage.vue'
import LoginComponenet from '@/components/layout/LoginComponenet.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/registrate',
      component: RegisterComponenet,
    },
    {
      path: '/login',
      component: LoginComponenet,
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
