<template>
  <navBar></navBar>
  <div id="main-content" style="padding-left: 80px;">
    <div style="padding: 40px; text-align: center; box-sizing: border-box;">
      <h1 style="font-size: 28px; color: #825400; margin-bottom: 20px;">
        <strong>Bem-vindo ao ReciclaNew!</strong>
      </h1>
      <p style="font-size: 18px; color: white;">
        O ReciclaNew é uma ferramenta inovadora que permite aos cidadãos localizar facilmente todos os pontos de coleta de materiais recicláveis em sua área. Com informações atualizadas, você pode visualizar onde encontrar recicláveis e até mesmo saber os dias em que a coleta passa em frente à sua casa.
        <br><br>
        Junte-se a nós na promoção de um futuro mais sustentável!
      </p>
    </div>

    <!-- Mapa leaflet -->
    <div class="card-body row">
      <div class="row mt-5 d-flex justify-content-center">
        <div style="color:white; margin-top:80px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 ms-3">
          <h1 style="text-align: center; margin-top: -80px; color: #825400;"><strong>Mapa de Reciclagem</strong></h1>
          <p>
            A conscientização ambiental é uma parte fundamental do nosso compromisso com um futuro sustentável. Para facilitar o acesso às informações sobre reciclagem, apresentamos o Mapa de Reciclagem, uma ferramenta interativa que permite que os cidadãos encontrem os pontos de coleta recicláveis mais próximos e verifiquem a programação de coleta na sua região.
            <br><br><strong><span style="color: #825400;">O que é o Mapa de Reciclagem?</span></strong><br>
            O Mapa de Reciclagem é uma plataforma digital que exibe todos os locais dedicados à coleta de materiais recicláveis, como papel, plástico, vidro e metais. Ao invés de apenas informações estáticas, os usuários podem navegar pelo mapa, identificar pontos de coleta e obter detalhes sobre os tipos de materiais aceitos.
            <br><br><strong><span style="color: #825400;">Como funciona?</span></strong><br>
            Ao acessar o Mapa de Reciclagem, você verá ícones representando os pontos de coleta na sua cidade. Cada ícone fornece informações essenciais, como endereço, horários de funcionamento e os materiais que podem ser reciclados.
            <br><br><strong><span style="color: #825400;">Algumas funcionalidades comuns incluem:</span></strong><br>
            <strong>Busca por Localização:</strong> encontre pontos de reciclagem perto de você.<br>
            <strong>Filtragem de Materiais:</strong> descubra quais materiais podem ser reciclados em cada ponto.<br>
            <strong>Agenda de Coleta:</strong> verifique os dias e horários em que a coleta ocorre na sua rua.<br>
          </p>
        </div>

        <div class="col-md-1"></div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-5" style="height: calc(100vh - 300px);">
          <l-map ref="map" v-model:zoom="zoom" :center="[-21.92783, -50.51616]" style="height: 100%; width: 100%;">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-marker :lat-lng="markerLatLng"></l-marker>
          </l-map>
        </div>
      </div>
    </div>
  </div>   
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
  import navBar from '../components/navBar.vue';

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      navBar
    },
    data() {
      return {
        zoom: 15,
        markerLatLng: [-21.92783, -50.51616]
      };
    },
  };
</script>

<style>
</style>
