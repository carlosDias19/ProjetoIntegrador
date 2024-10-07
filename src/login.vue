<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const token = null;
const formLogin = ref({
    email: '',
    senha: '',
    // email: '',
    // senha: '',
});

axios.interceptors.request.use((config) => {
    console.log('Dados a serem enviados:', config.data);
    return config;
});

const Login = () => {
    // axios.post('https://localhost:7127/api/Usuario/Login', formLogin.value, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then(response => {
    //         console.log('Resposta da API:', response.data);
    //         localStorage.setItem('token', response.data,'Resposta da API:', response.data);
    //         formLogin.value.email = '';
    //         formLogin.value.senha = '';
    //         router.push('/feed');
    //     })
    //     .catch(error => {
    //         console.error('Erro ao enviar formulário:', error);
    //         // Exibir o modal de erro
    //         const erroModal = new bootstrap.Modal(document.getElementById('erroModal'));
    //         erroModal.show();
    //     });
};
</script>

<template>

  <section class="vh-100 d-flex align-items-center" style="background-color: white;">
    <div class="container-fluid h-custom">
      <div class="row h-100">
        <div class="col-md-6 d-flex justify-content-center align-items-center" style=" background: linear-gradient(to bottom,  rgb(167, 186, 89), rgb(133, 179, 148));">
          <img src="/Logo_sem_fundo.png" class="img-fluid" alt="Logo">
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <form class="w-75"> <!-- Ajuste para que o formulário não fique muito largo em telas pequenas -->
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input v-model="formLogin.email" type="email" id="form3Example3" class="form-control form-control-lg" placeholder="Entre com um email valido" />
              <label class="form-label" for="form3Example3">Email</label>
            </div>
    
            <!-- Password input -->
            <div class="form-outline mb-3">
              <input v-model="formLogin.senha" type="password" id="form3Example4" class="form-control form-control-lg" placeholder="Entre com sua senha" />
              <label class="form-label" for="form3Example4">Senha</label>
            </div>
    
            <div class="text-center mt-1">
              <a href="#!" class="text-body">Esqueceu a senha?</a>
            </div>
            
            <div class="text-center pt-2">
              <button type="button" class="btn btn-primary btn-lg me-2" @click="Login">Entrar</button>
              <button type="button" class="btn btn-secondary btn-lg">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  
  

</template>

<style>

@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext');

html {
  height: 100%;
  margin: 0;
  
	background-position: center;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: cover;
min-height:100vh;
font-family: 'Noto Sans', sans-serif;
}

.container-fluid {
  height: 100%;
}

.row {
  height: 100%;
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
 border-bottom:1px solid rgb(167, 186, 89);	
}
.btn{
	color:#fff;
	background-color:rgb(167, 186, 89);
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
