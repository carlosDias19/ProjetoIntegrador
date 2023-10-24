<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink, RouterView
  },
  data: function () {
    return {
      dadosManipulando:{
      }
    }
  },
  computed: {
  },
  methods: {
  },
  mounted: function () {

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
        <a class="navbar-brand nav-link" href="/">
            <strong>Report Radar</strong>
        </a>
        <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarExample01">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item active">
                <a class="nav-link" href="/">Pagina Inícial</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/denuncias">Denúncias</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/mapa" >Mapa</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" target="_blank">Sobre</a>
            </li>
            </ul>
        </div>
        </div>
        <hr style="color: #ffffff; background-color: #00000; height: 1px;">
        </nav>
        <!-- Navbar -->

</template>