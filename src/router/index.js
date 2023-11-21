import { createRouter, createWebHistory } from 'vue-router'
import feed from '../views/feed.vue'
import denuncias from '../views/denuncias.vue'
import mapa from '../views/mapa.vue'
import cadastro from '../views/cadastro.vue'
import login from '../login.vue'
import tipoDeCrime from '../views/tipoDeCrime.vue'
import denunciasConfirm from '../views/denunciasConfirm.vue'

const token = localStorage.getItem('token')

      // Dividir o token nas partes (header, payload, signature)
      const [header, payload, signature] = token.split('.');

      // Decodificar a parte do payload
      const decodedPayload = atob(payload);

      // Converter a string decodificada em um objeto JavaScript
      const payloadObject = JSON.parse(decodedPayload);

      // console.log(payloadObject.UsuarioId);
      const user = payloadObject.UsuarioId
      console.log(user)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
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
      path: '/feed',
      name: 'feed',
      component: feed
    },
    {
      path: '/tipoDeCrime',
      name: 'tipoDeCrime',
      component: tipoDeCrime,
      meta: { requiresAuth: true },
    },
    {
      path: '/denunciasConfirm',
      name: 'denunciasConfirm',
      component: denunciasConfirm,
      meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Verifica se a rota requer autenticação
  if (to.meta.requiresAuth) {
    // Verifica se o usuário está autenticado
    const isAuthenticated = user/* lógica para verificar autenticação */;

    if (isAuthenticated == 1) {
      // Permite a navegação
      next();
    } else {
      // Redireciona para a página de login
      next('/');
    }
  } else {
    // Se a rota não requer autenticação, permite a navegação
    next();
  }
});

export default router
  