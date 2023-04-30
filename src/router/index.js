import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      hidden: true,
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/index',
      name: 'index',
      hidden: false,
      component: () => import('../views/Index.vue'),
      children: [],
    },
  ],
});

export default router;
