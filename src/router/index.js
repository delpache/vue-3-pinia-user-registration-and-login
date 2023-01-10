import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores'
import authRoutes from './auth.routes'
import usersRoutes from './users.routes'

import HomeView from '../views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { ...authRoutes },
    { ...usersRoutes },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

router.beforeEach(async (to) => {

  // Redirige vers la page de connexion si vous n'êtes pas connecté
  // et que vous essayez d'accéder à une page à accès restreint.
  const publicPages = ['/auth/login', '/auth/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return '/auth/login';
  }
})
