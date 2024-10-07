<template>
  <div>
    <ul class="menu">
      <li title="Página Inicial">
        <a href="#" class="menu-button home" aria-label="Menu">menu</a>
      </li>
      <li title="Infomar ponto de coleta">
        <a href="#" class="search" aria-label="Search">Informar</a>
      </li>
      <li title="Conta">
        <a href="#" class="active about" aria-label="About">Conta</a>
      </li>
    </ul>

    <ul class="menu-bar">
      <li>
        <a href="#" class="menu-button" aria-label="Menu">Menu</a>
      </li>
      <li><a href="#">Home</a></li>
      <li><a href="#">Profile</a></li>
      <li><a href="#">Editorial</a></li>
      <li><a href="#">About</a></li>
      <li v-if="user"><a href="#" @click="logout">Logout</a></li>
      <li v-else><a href="/login">Login</a></li>
    </ul>

    <router-view />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {
      user: null,
      dadosManipulando: {}
    };
  },
  methods: {
    getUser() {
      const token = localStorage.getItem('token');

      if (token) {
        const [header, payload, signature] = token.split('.');
        const decodedPayload = atob(payload);
        const payloadObject = JSON.parse(decodedPayload);
        this.user = payloadObject.UsuarioId;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.user = null;
      this.$router.push('/login');
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style>
@import url("//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css");

/* Estilos principais */
.menu, .menu-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background: #f7f7f7;
    z-index: 10;
    overflow: hidden;
    box-shadow: 2px 0 18px rgba(0, 0, 0, 0.26);
}

.menu li a {
    display: inline-block;
    text-indent: -500em;
    height: 5em;
    width: 5em;
    line-height: 5em;
    text-align: center;
    color: #72739f;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: background 0.1s ease-in-out;
}

.menu li a:before {
    font-family: FontAwesome;
    speak: none;
    text-indent: 0em;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1.4em;
}

.menu li a.search:before { content: "\f002"; }
.menu li a.archive:before { content: "\f187"; }
.menu li a.pencil:before { content: "\f040"; }
.menu li a.contact:before { content: "\f003"; }
.menu li a.about:before { content: "\f007"; }
.menu li a.home:before { content: "\f039"; }

.menu-bar li a:hover,
.menu li a:hover,
.menu li:first-child a {
    background: rgb(167, 186, 89);
    color: #fff;
}

.menu-bar {
    overflow: hidden;
    left: 5em;
    z-index: 5;
    width: 0;
    height: 0;
    transition: all 0.1s ease-in-out;
}

.menu-bar li a {
    display: block;
    height: 4em;
    line-height: 4em;
    text-align: center;
    color: #72739f;
    text-decoration: none;
    position: relative;
    font-family: verdana;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: background 0.1s ease-in-out;
}

.menu-bar li:first-child a {
    height: 5em;
    background: #267fdd;
    color: #fff;
    line-height: 5;
}

.para {
    color: #033f72;
    padding-left: 100px;
    font-size: 3em;
    margin-bottom: 20px;
}

.open {
    width: 10em;
    height: 100%;
}

/* Unificação das media queries */
@media all and (max-width: 500px) {
    .container {
        margin-top: 100px;
    }
    .menu {
        height: 5em;
        width: 100%;
    }
    .menu li {
        display: inline-block;
    }
    .menu-bar li a {
        width: 100%;
    }
    .menu-bar {
        width: 100%;
        left: 0;
        bottom: 0;
        height: 0;
    }
    .open {
        width: 100%;
        height: auto;
    }
    .para {
        padding-left: 5px;
    }
    .menu li,
    .menu-bar {
        font-size: 70%;
    }
}

/* Ajustes para telas menores em altura */
@media screen and (max-height: 34em) {
    .menu li,
    .menu-bar {
        font-size: 70%;
    }
}
@media screen and (max-height: 34em) and (max-width: 500px) {
    .menu {
        height: 3.5em;
    }
}
</style>
