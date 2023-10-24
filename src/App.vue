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
