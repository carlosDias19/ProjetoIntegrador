<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink, RouterView
  },
  data: function () {
    return {
      user: null,
      dadosManipulando:{
      }
    }
  },
  computed: {
  },
  methods: {
    getUser(){
      const token = localStorage.getItem('token')

      // Dividir o token nas partes (header, payload, signature)
      const [header, payload, signature] = token.split('.');

      // Decodificar a parte do payload
      const decodedPayload = atob(payload);

      // Converter a string decodificada em um objeto JavaScript
      const payloadObject = JSON.parse(decodedPayload);

      // console.log(payloadObject.UsuarioId);
      this.user = payloadObject.UsuarioId
    }
  },
  mounted: function () {
    this.getUser();
  }
}
</script>

<template>

       <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark d-none d-lg-block" style="z-index: 2000;">
        <div class="container-fluid">
        <!-- Navbar brand -->
        <img src="Logo.png" height="100" alt=""
        loading="lazy" />
        <a class="navbar-brand nav-link" href="/feed">
            <strong>Report Radar</strong>
        </a>
        <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarExample01">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item active">
                <a class="nav-link" href="/feed">Pagina Inícial</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/denuncias">Denúncias</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/mapa" >Mapa</a>
            </li>
            <li v-if="user == 1" class="nav-item">
                <a class="nav-link" aria-current="page" href="/tipoDeCrime">Tipo de Crime</a>
            </li>
            <li v-if="user == 1" class="nav-item">
              <a class="nav-link" aria-current="page" href="/denunciasConfirm">Confirmar Denúncias</a>
            </li>
            </ul>
        </div>
        </div>
        <hr style="color: #ffffff; background-color: #00000; height: 1px;">
        </nav>
        <!-- Navbar -->

</template>