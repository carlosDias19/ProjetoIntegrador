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
      siteKey: '6Lc8p8MoAAAAAIMVollcJEGcqYLS8t5M1mIQA3kY',
      dadosManipulando:{
        NOMECOMPLETO: null,
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
      
    },
    
    async enviar(){
      if(this.dadosManipulando.NOMECOMPLETO == null || this.dadosManipulando.NOMECOMPLETO == ""){
        alert("Preencha seu Nome.");
      } else if (this.dadosManipulando.EMAIL == null || this.dadosManipulando.EMAIL == ""){
        alert("Preencha seu Email.")
      } else if (this.dadosManipulando.SENHA == null || this.dadosManipulando.SENHA == ""){
        alert("Preencha a Senha.")
      } else if(this.dadosManipulando.CONFIRMARSENHA == null || this.dadosManipulando.CONFIRMARSENHA == ""){
        alert("Confirme sua Senha.")
      }else if(this.dadosManipulando.SENHA != this.dadosManipulando.CONFIRMARSENHA ){
        alert("Senhas diferentes")
      }else if(this.dadosManipulando.SENHA.length < 5){
        alert("Sua senha precisa conter mais de cinco digitos!!")
      }
      else{

        const dataEspecifica = new Date();  // O mês é 0-indexed, então 10 representa novembro
        const anoEspecifica = dataEspecifica.getFullYear();
        const mesEspecifica = String(dataEspecifica.getMonth() + 1).padStart(2, '0');
        const diaEspecifica = String(dataEspecifica.getDate()).padStart(2, '0');
        const dataFormatadaEspecifica = `${anoEspecifica}-${mesEspecifica}-${diaEspecifica}`;
        
        axios.post(`https://localhost:7127/api/Usuario?`,
        {'email': this.dadosManipulando.EMAIL,
         'senha': this.dadosManipulando.SENHA,
         'nomeCompleto': this.dadosManipulando.NOMECOMPLETO,         
         'ativo': true,
         'nivel': 0,
         'dataCriacao': dataFormatadaEspecifica}, 
        {
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos necessários aqui
        }
        }).then(response => {
           window.location.href = "/";
        })
        .catch(error => {
          alert("Erro ao Registrar-se.")
        });      
        
      }
    },
  },
  mounted: function () {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}
</script>

<template>

  <section class="vh-100 d-flex align-items-center">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="/LogoCompleta.jpeg"
            class="img-fluid" alt="Logo">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>

            <div class="form-outline mb-4">
              <input v-model="dadosManipulando.EMAIL" type="email" id="email" class="form-control form-control-lg"
                placeholder="E-mail" />
              <label class="form-label" for="email">E-mail</label>
            </div>
  
            <div class="form-outline mb-3">
              <input v-model="dadosManipulando.SENHA" type="password" id="senha" class="form-control form-control-lg"
                placeholder="Senha" />
              <label class="form-label" for="senha">Senha</label>
            </div>

            <div class="form-outline mb-3">
              <input v-model="dadosManipulando.CONFIRMARSENHA" type="password" id="confirmarSenha" class="form-control form-control-lg"
                placeholder="Confime sua senha" />
              <label class="form-label" for="confirmarSenha">Confime sua senha</label>
            </div>

            <div class="form-outline mb-4">
              <input v-model="dadosManipulando.NOMECOMPLETO" type="text" id="nomeCompleto" class="form-control form-control-lg"
                placeholder="Nome Completo" />
              <label class="form-label" for="nomeCompleto">Nome Completo</label>
            </div>

            <div class="row mt-3">
              <div class="g-recaptcha" :data-sitekey="siteKey"></div>
            </div>  

            <div class="text-center text-lg-start mt-2 pt-2">
              <button type="button" @click='enviar' class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;">Regitrar-se</button>
            </div>
  
          </form>
        </div>
      </div>
    </div>
  </section>

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
