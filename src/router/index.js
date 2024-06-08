import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import RepositoryDetails from '../views/RepositoryDetails.vue'
import RepositoryList from '../views/RepositoryList.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'RepositoryList',
      component: RepositoryList
    },
    {
      path: '/RepositoryDetails/:name',
      name: 'RepositoryDetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RepositoryDetails.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/ErrorBoundary.vue')
    },
    {
      path: '/ErrorBoundary',
      name: 'ErrorBoundary',
      component: () => import('../views/ErrorBoundary.vue')
    }
  ]
})

export default router