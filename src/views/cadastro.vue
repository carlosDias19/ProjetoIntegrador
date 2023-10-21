<script>
import { RouterLink, RouterView } from 'vue-router'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    RouterLink, RouterView
  },
  data: function () {
    return {
      dadosManipulando:{
        NOME: null,
        EMAIL: null,
        SENHA: null,
        CONFIRMARSENHA: null,
      }
    }
  },
  computed: {
  },
  methods: {
    gravarModal(){

    }
  },
  mounted: function () {

  }
}
</script>

<template>

<div class="box col-xs-12 col-sm-12 col-md-6 col-lg-3 mt-5 ">
          <form>
              <span style="color:#ff716c" class="text-center col-xs-12 col-sm-12 col-md-12 col-lg-12">Cadastro de Usuário</span>
            <div class="input-container col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <input maxlength="maxCharacters" v-model="dadosManipulando.NOME" type="text" required=""/>
              <label style="color:#000000">Nome: </label>		
            </div>
              <div class="input-container col-xs-12 col-sm-12 col-md-12 col-lg-12">		
                <input v-model="dadosManipulando.EMAIL" type="text" required=""/>
                <label style="color:#000000; ">Email: </label> 
              </div>
              <div class="input-container col-xs-12 col-sm-12 col-md-12 col-lg-12">		
                <input v-model="dadosManipulando.SENHA" type="password" required=""/>
                <label style="color:#000000;">Senha: </label> 
              </div>
              <div class="input-container col-xs-12 col-sm-12 col-md-12 col-lg-12">		
                <input v-model="dadosManipulando.CONFIRMARSENHA" type="password" required=""/>
                <label style="color:#000000; ">Confirmar Senha: </label>
              </div>
              <div class="d-flex justify-content-center">
                <button @click="gravarModal" type="button" class="btn" >Cadastrar</button>
              </div>
          </form>	
        </div>

</template>

<style>

@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext');

body{
	background-position: center;
    background-origin: content-box;
    background-repeat: no-repeat;
    background-size: cover;
	min-height:100vh;
	font-family: 'Noto Sans', sans-serif;
}
.text-center{
	color:#fff;	
	text-transform:uppercase;
    font-size: 23px;
    margin: -50px 0 80px 0;
    display: block;
    text-align: center;
}
.box{
	position:absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
    background-color: #fff;
	border-radius:3px;
	padding:70px 100px;
}
.input-container{
	position:relative;
	margin-bottom:25px;
}
.input-container label{
	position:absolute;
	top:0px;
	left:0px;
	font-size:16px;
	color:#fff;	
  pointer-events:none;
	transition: all 0.5s ease-in-out;
}
.input-container input{ 
  border:0;
  border-bottom:1px solid #555;  
  background:transparent;
  width:100%;
  padding:8px 0 5px 0;
  font-size:16px;
  color:#000000;
}
.input-container input:focus{ 
 border:none;	
 outline:none;
 border-bottom:1px solid #e74c3c;	
}
.btn{
	color:#fff;
	background-color:#e74c3c;
	outline: none;
    border: 0;
    color: #fff;
	padding:10px 20px;
	text-transform:uppercase;
	margin-top:50px;
	border-radius:2px;
	cursor:pointer;
	position:relative;
}
/*.btn:after{
	content:"";
	position:absolute;
	background:rgba(0,0,0,0.50);
	top:0;
	right:0;
	width:100%;
	height:100%;
}*/
.input-container input:focus ~ label,
.input-container input:valid ~ label{
	top:-12px;
	font-size:12px;
	
}

.wrap {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 20px 10px;
  width: 340px;
}
</style>
