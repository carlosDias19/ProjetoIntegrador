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
      tipo: null,
      teste: "aqui",
      filtrarEstado: [-23.5505, -46.6333],
      zoom: 5,
      markerLatLng: [
                    ],
      dadosTooltip: [
                      ['teste'],
                      ['teste2']
                    ],
      dadosManipulando:{
        ESTADO: null,
      },
    }
  },
  computed: {
  },
  methods: {
    getDenuncias(){
      axios.get(`https://localhost:7127/api/Denuncias/`,
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Adicione outros cabeçalhos necessários aqui
        }
      }).then(response => {
            this.tipo = null
            this.teste = null
            response.data.forEach(element => {
              axios.get(`https://localhost:7127/api/TipoDeCrime/${element.tipoId}`,
                {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                  // Adicione outros cabeçalhos necessários aqui
                }
              }).then(response => {
                this.tipo = response.data.descricao + ' - ' + response.data.tipoId
                console.log(this.tipo)
              });
              if(element.latitude != null && element.longitude != null){
                const denuncias = JSON.parse(`[${element.latitude},${element.longitude}]`);
                this.markerLatLng.push(denuncias)
                this.teste = `Endereço: ${element.endereco}, Nº: ${element.numero}, CEP: ${element.cep}`
                console.log(this.tipo)
              }
            });
            
            
            
          
          // this.filtrarEstado = filtrarEstado
          // this.zoom = 5
      });
    },

    getFiltroEstado(){
      axios.get(`https://localhost:7127/api/Estado`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Adicione outros cabeçalhos necessários aqui
        }
      }).then(response => {
        this.estados = response.data
      })
      .catch(error => {
        console.log("Erro.")
      });
    },
    getFiltroTipoDeCrime(){
      axios.get(`https://localhost:7127/api/TipoDeCrime`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Adicione outros cabeçalhos necessários aqui
        }
      }).then(response => {
        this.tipoDeCrime = response.data
      })
      .catch(error => {
        console.log("Erro.")
      });
    },

    async filtroEstado(args){
      if(this.dadosManipulando.ESTADO == "Selecione o filtro"){
          const filtrarEstado = JSON.parse(`[-23.5505, -46.6333]`);
          this.filtrarEstado = filtrarEstado
          this.zoom = 5
      }else{
      axios.get(`https://localhost:7127/api/Estado/${this.dadosManipulando.ESTADO}`,
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Adicione outros cabeçalhos necessários aqui
        }
      }).then(response => {
        // console.log(`[${response.data.latitude}, ${response.data.longitude}]`)
          const filtrarEstado = JSON.parse(`[${response.data.latitude}, ${response.data.longitude}]`);
          this.filtrarEstado = filtrarEstado
          this.zoom = 6
      });
    }
    },

    limparDadosManipulando(){
      this.dadosManipulando = {
      }
    }
  },
  mounted: function () {
    this.getFiltroEstado();
    this.getFiltroTipoDeCrime();
    this.getDenuncias();
  }
}
</script>

<template>
        <navBar></navBar>
        <div class="row col-12 d-flex justify-content-center">
          <div  class="mt-4 col-3">
            <span style='color: white;'>Filtro de estado</span>
            <select  @change="filtroEstado" v-model="dadosManipulando.ESTADO" class="form-select" aria-label="Default select example">
              <option selected>Selecione o filtro</option>
              <option v-for="c in this.estados" :value="c.estadoId" >{{ c.nomeEstado + ' - ' + c.siglaEstado}}</option>
            </select>
          </div>
          <!-- <div class="mt-4 col-3">
            <span style="color:white">Filtro de crimes</span>
            <select  class="form-select" aria-label="Default select example">
              <option selected>Selecione o filtro</option>
              <option v-for="c in this.tipoDeCrime" value="1">{{ c.descricao }}</option>
            </select>
          </div> -->
        </div>
        
      <!--Mapa leaflet-->
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-5 h100 w-100" style="height:600px; width:800px;">
                <l-map ref="map" v-model:zoom="zoom" :center="filtrarEstado">
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                  ></l-tile-layer>
                  <div style="" class="col-6 mt-4 d-flex justify-content-center">
                    <l-marker  v-for="key in markerLatLng" :lat-lng="key">
                      <l-tooltip>{{this.teste}}</l-tooltip>
                    </l-marker>
                  </div>
                </l-map>
              </div>
            </div>


</template>

<style>

</style>
