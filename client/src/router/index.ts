import { createRouter, createWebHistory } from 'vue-router'
import FilesView from '@/views/FilesView.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/disk/:diskHash',
      name: 'disk',
      component: FilesView
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

export default router
