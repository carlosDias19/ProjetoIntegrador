import { createRouter, createWebHistory } from 'vue-router'
import feed from '../views/feed.vue'
import denuncias from '../views/denuncias.vue'
import mapa from '../views/mapa.vue'
import cadastro from '../views/cadastro.vue'
import login from '../views/login.vue'
import tipoDeCrime from '../views/tipoDeCrime.vue'
import denunciasConfirm from '../views/denunciasConfirm.vue'

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
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: cadastro
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/tipoDeCrime',
      name: 'tipoDeCrime',
      component: tipoDeCrime
    },
    {
      path: '/denunciasConfirm',
      name: 'denunciasConfirm',
      component: denunciasConfirm
    }
  ]
})

export default router
  