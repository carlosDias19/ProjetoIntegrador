<script>
import {RouterLink, RouterView} from 'vue-router'


export default{
    components:{
        RouterLink, RouterView
    },
    data: function () {
        return {
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
        <img src="Logo.png" height="70" alt=""
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
                <a class="nav-link" href="#" target="_blank">Mapa</a>
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

  <div class="app">
    <router-view></router-view>
  </div>

</template>
<style>
  @import "../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css"; 
/* Color of the links BEFORE scroll */
.navbar-scroll .nav-link,
.navbar-scroll .fa-bars,
.navbar-scroll .navar-brand {
  color: #4f4f4f;
}

.navbar-scroll .nav-link:hover {
  color: #1266f1;
}

/* Color of the links AFTER scroll */
.navbar-scrolled .nav-link,
.navbar-scrolled .fa-bars,
.navbar-scrolled .navar-brand {
  color: #4f4f4f;
}

/* Color of the navbar AFTER scroll */
.navbar-scroll,
.navbar-scrolled {
  background-color: #fff;
}

/* An optional height of the navbar AFTER scroll */
.navbar.navbar-scroll.navbar-scrolled {
  padding-top: 5px;
  padding-bottom: 5px;
}

body {
  background-color: #eee;
}
</style>
