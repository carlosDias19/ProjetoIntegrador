<script>
import { RouterLink, RouterView } from 'vue-router'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    RouterLink, RouterView, LMap, LTileLayer, LMarker, LPopup, LTooltip
  },
  data: function () {
    return {
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
    gravarModal(){
    },


    limparDadosManipulando(){
      this.dadosManipulando = {
      }
    }
  },
  mounted: function () {
  }
}
</script>

<template>

      <!--Mapa leaflet-->

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-5 h100 w-100" style="height:600px; width:800px;">
              <l-map ref="map" v-model:zoom="zoom" :center="[-21.92783, -50.51616]">
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>
                <div style="" class="col-6 mt-4 d-flex justify-content-center">
                  <l-marker v-for="key in markerLatLng" :lat-lng="key">
                  <l-tooltip>teste</l-tooltip>
                  </l-marker>
                </div>
              </l-map>
            </div>


</template>

<style>

</style>
