import { createRouter, createWebHistory } from 'vue-router'
import feed from '../views/feed.vue'
import denuncias from '../views/denuncias.vue'
import mapa from '../views/mapa.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      component: feed
    },
    {
      path: '/denuncias',
      name: 'denuncias',
      component: denuncias
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: mapa
    }
  ]
})

export default router
  