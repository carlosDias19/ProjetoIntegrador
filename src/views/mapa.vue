<script>
import { RouterLink, RouterView } from 'vue-router'
import navBar from '../components/navBar.vue' //ddddd
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    RouterLink, RouterView, LMap, LTileLayer, LMarker, LPopup, LTooltip, navBar
  },
  data: function () {
    return {
      estados: [],
      tipoDeCrime: [],
      zoom: 15,
      markerLatLng: [
                       [-21.92783, -50.51616],
                       [-21.92297, -50.51649],
                       [-21.92297, -50.51648],
                       [-21.92297, -50.51647],
                   ],
      dadosTooltip: [
                      ['teste'],
                      ['teste2']
                    ],
      dadosManipulando:{
      },
    }
  },
  computed: {
  },
  methods: {
    getFiltroEstado(){
      axios.get(`https://localhost:7127/api/Estado`).then(response => {
          this.estados = response.data.$values;
          //window.location.href = "/";
      })
      .catch(error => {
        console.log("Erro.")
      });
    },
    getFiltroTipoDeCrime(){
      axios.get(`https://localhost:7127/api/TipoDeCrime`).then(response => {
          this.tipoDeCrime = response.data.$values;
          //window.location.href = "/";
      })
      .catch(error => {
        console.log("Erro.")
      });
    },
    gravarModal(){
    },


    limparDadosManipulando(){
      this.dadosManipulando = {
      }
    }
  },
  mounted: function () {
    this.getFiltroEstado();
    this.getFiltroTipoDeCrime();
  }
}
</script>

<template>
        <navBar></navBar>
        <div class="row col-12 d-flex justify-content-center">
          <div  class="mt-4 col-3">
            <span style='color: white;'>Filtro de estado</span>
            <select  class="form-select" aria-label="Default select example">
              <option selected>Selecione o filtro</option>
              <option v-for="c in this.estados" value="1">{{ c.nomeEstado + ' - ' + c.siglaEstado}}</option>
            </select>
          </div>
          <div class="mt-4 col-3">
            <span style="color:white">Filtro de crimes</span>
            <select  class="form-select" aria-label="Default select example">
              <option selected>Selecione o filtro</option>
              <option v-for="c in this.tipoDeCrime" value="1">{{ c.descricao }}</option>
            </select>
          </div>
        </div>
        
      <!--Mapa leaflet-->
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-5 h100 w-100" style="height:600px; width:800px;">
                <l-map ref="map" v-model:zoom="zoom" :center="[-21.92783, -50.51616]">
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                  ></l-tile-layer>
                  <div style="" class="col-6 mt-4 d-flex justify-content-center">
                    <l-marker  v-for="key in markerLatLng" :lat-lng="key">
                    <l-tooltip>teste</l-tooltip>
                    </l-marker>
                  </div>
                </l-map>
              </div>
            </div>


</template>

<style>

</style>
