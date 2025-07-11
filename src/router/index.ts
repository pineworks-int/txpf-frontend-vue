import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about-me',
    name: 'aboutMe',
    component: () => import('../views/AboutMeView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from) => {
  const authStore = useAuthStore()

  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !authStore.isUserLoggedIn) {
    console.warn('You are not authorized to see this page. Redirecting...')
    return { name: 'home' }
  }
})

export default router
