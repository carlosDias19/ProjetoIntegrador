<template>

    
    <navBar></navBar>
    <div>

      <!--Primeiro paragrafo da pagina-->

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
            <h1 style="font-size: 20px; color: white; margin-top: 5px;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspO Report Radar conta com mapas que mostram incidências de crimes, onde o objetivo é proporcionar uma maior segurança e apoio aos usuários, mantendo-os &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspinformados e fazendo com que encontre a localização de uma ocorrência com uma maior facilidade.</h1>
          </div>

      
      <!--MapaCheck-->
      <div id="card" style="background-color: #181818; margin-top: 50px;" class="card">
        <div  class="card-body row">
          <div class="row d-flex justify-content-center" >
            <div style="margin-top: 50px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <img src="mapaCheck.jpg" height="300" alt="">
            </div>
            <div class="col-md-1"></div>
            <div style="color: white; margin-top: 100px; margin-left: 50px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <h1 style="color: #ff716c;"><strong>MAPA CLUSTER</strong></h1>
              <p>Neste mapa o sistema faz um agrupamento das ocorrências de determinadas regiões e apresenta indicadores com cores diferentes, onde varia pela quantidade de ocorrências registradas na localidade. 
                Estas cores facilitam o entendimento e expõem exatamente a quantidade de ocorrências que foram registradas.</p>
            </div>
          </div>
        </div>
      </div>

      <!--MapaNormal-->
      <div class="row d-flex justify-content-center">
        <div style="color: white; margin-top: 100px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 ms-5">
          <h1 style="color: #ff716c;"><strong>MAPA NORMAL</strong></h1>
          <p>Já no mapa normal, é possível fazer um comparativo com os tipos de crime como furto e roubo.
             O sistema indica com marcadores os locais do município em que esses crimes ocorrem com maior frequência, permitindo o uso e a logística de equipes de uma maneira muito mais otimizada.</p>
        </div>
        <div class="col-md-1"></div>
        <div style="margin-top: 50px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
          <img src="mapaNormal.png" height="250" alt="">
        </div>
      </div>

      <!--Mapa leaflet-->
      <div id="card" style="background-color: #181818; margin-top:100px;" class="card">
        <div  class="card-body row">
          <div class="row  mt-5 d-flex justify-content-center">
            <div style="color:white; margin-top:80px;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 ms-3">
              <h1 style="text-align: center; margin-top: -80px; color: #ff716c;"><strong>Mapa Dinâmico</strong></h1>
              <p>A segurança e o entendimento sobre criminalidade são questões-chave em qualquer comunidade. Ter acesso a informações claras e atualizadas pode ser crucial para a tomada de decisões e a conscientização pública. Um dos métodos mais modernos e eficientes de compartilhar e visualizar essas informações é através do uso de mapas interativos de criminalidade. A seguir, apresentaremos o conceito e a utilidade desse recurso, tendo como ponto de referência um mapa interativo de criminalidade como exemplo.<br>
                <br><strong><span style="color: #ff716c;">O que é um Mapa Interativo de Criminalidade ?</span></strong><br>
                <br>Um mapa interativo de criminalidade é uma ferramenta digital que apresenta dados sobre crimes em uma área geográfica específica. Ao invés de simplesmente ver estatísticas em tabelas ou gráficos, os usuários podem explorar diferentes localidades, visualizar tipos específicos de crimes e analisar tendências ao longo do tempo. Essa interatividade permite uma compreensão mais profunda e contextualizada do cenário criminal.<br>
                <br><strong><span style="color: #ff716c;">Como funciona ?</span></strong><br>
                <br>Imagine um mapa da sua cidade ou região. Ao abrir este mapa interativo, você pode ver pequenos ícones ou pontos coloridos, cada um representando um tipo diferente de crime, como furtos, roubos ou atos de vandalismo. Clicando em um ponto, surgem detalhes adicionais: data, hora, descrição breve do incidente e, às vezes, até links para reportagens relacionadas.<br>
                <br><strong><span style="color: #ff716c;">Algumas funcionalidades comuns incluem:</span></strong><br>
                <strong>Filtros de Data:</strong> permite visualizar crimes ocorridos em um período específico.<br>
                <strong>Filtros de Tipo de Crime:</strong> foco em crimes específicos, como assaltos ou crimes violentos.<br>
                <strong>Zoom e Deslocamento:</strong> aproximação para visualizar detalhes de bairros ou ruas específicas.<br>
              </p>
            </div>
            <div class="col-md-1"></div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-5" style="height:600px; width:800px;">
              <l-map ref="map" v-model:zoom="zoom" :center="[-21.92783, -50.51616]">
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>
                <l-marker :lat-lng="markerLatLng">
                </l-marker>
              </l-map>
            </div>

          </div>
        </div>
      </div>

      <!--Card com dados de homicidios-->
      <div id="card" style="background-color: #ff716c; height:350px; margin-top: 30px;" class="card ms-4">
        <div  class="card-body row d-flex justify-content-center">

          <div id="card" style="background-color: #fffff; height:80px; width:1556px;" class="card">
            <div  class="card-body row">
              <h1 style="text-align: center;">Contador de homicídios no Brasil (dados 2019)</h1>
            </div>
          </div>

          <div class="row mt-3 d-flex justify-content-center" >
          
          <!-- Mapa do Brasil-->
          <div class="col-md-2">
            <img src="mapa.png" height="150" alt="">
            <h1>45.503</h1>
            <p>Total de homicídios no ano</p>
          </div>

          <!-- Simbolo Feminino-->
          <div class="col-md-2">
            <img src="feminino.png" height="150" alt="">
            <h1>3.737</h1>
            <p>Homicídios de mulheres</p>
          </div>

          <!--Jovens-->
          <div class="col-md-2">
            <img src="jovens.png" height="150" alt="">
            <h1>23.327</h1>
            <p>Homicídios de jovens</p>
          </div>

          <!--Arma-->
          <div class="col-md-2">
            <img src="arma.png" height="150" alt="">
            <h1>30.825</h1>
            <p>Homicídios por armas de fogo</p>
          </div>

        </div>
        </div>
      </div>

    </div>   
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
  import navBar from '../components/navBar.vue'

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
