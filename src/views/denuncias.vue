<script>
import { RouterLink, RouterView } from 'vue-router'
import { TextBoxComponent as EjsTextbox } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    RouterLink, RouterView, EjsTextbox
  },
  data: function () {
    return {
      dadosManipulando:{
        CEP: null,
        ENDERECO: null,
        NUMERO: null,
        ESTADO: null,
        CIDADE: null,
        NOME: null,
        TIPOCRIME: null,
        BAIRRO: null,
        COMPLEMENTO: null
      },
    }
  },
  computed: {
  },
  methods: {
    gravarModal(){
      console.log('aqui')
    },
    // onChange(args){
    //   console.log(args)
    //   const cep = this.dadosManipulando.CEP
    //   const jsonEndereco = `https://viacep.com.br/ws/${cep}/json/`
    //   console.log(jsonEndereco)
    // },
    async onChange(args) {
      const cep = this.dadosManipulando.CEP
      if(cep == "" || cep == null){
        this.limparDadosManipulando();
      }
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        console.log(response.data)
        this.dadosManipulando.ENDERECO = response.data.logradouro;
        this.dadosManipulando.CIDADE = response.data.localidade
        this.dadosManipulando.ESTADO = response.data.uf
        this.dadosManipulando.BAIRRO = response.data.bairro
        this.dadosManipulando.COMPLEMENTO = response.data.complemento
      } catch (error) {
        console.error("Erro ao buscar dados do CEP", error);
      }
    },

    limparDadosManipulando(){
      this.dadosManipulando = {
        CEP: null,
        ENDERECO: null,
        NUMERO: null,
        ESTADO: null,
        CIDADE: null,
        NOME: null,
        TIPOCRIME: null,
        BAIRRO: null,
        COMPLEMENTO: null
      }
    }
  },
  mounted: function () {
  }
}
</script>

<template>

        <div class="box col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-5 ">
          <form>
              <span style="color:#ff716c" class="text-center col-xs-12 col-sm-12 col-md-12 col-lg-12">Denúncia</span>
              <p style="color:#000000; font-size: 12px; font-weight: bold;" class="text-center col-xs-12 col-sm-12 col-md-12 col-lg-12">Campos com *, são obrigatórios.</p>
            <div class="input-container col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <input @change="onChange" v-model="dadosManipulando.CEP" type="number" required=""/>
              <label style="color:#000000">CEP da ocorrência: *</label>		
            </div>
            <div class="row">
              <div class="input-container col-xs-12 col-sm-12 col-md-8 col-lg-8">		
                <input v-model="dadosManipulando.ENDERECO" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Endereço: *</label> 
              </div>
              <div class="input-container col-xs-12 col-sm-12 col-md-4 col-lg-4">		
                <input v-model="dadosManipulando.NUMERO" type="number" required=""/>
                <label style="color:#000000; margin-left:10px;">Numero: </label> 
              </div>
            </div>
            <div class="row">
              <div class="input-container col-xs-12 col-sm-12 col-md-6 col-lg-6">		
                <input v-model="dadosManipulando.BAIRRO" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Bairro: </label> 
              </div>
              <div class="input-container col-xs-12 col-sm-12 col-md-6 col-lg-6">		
                <input v-model="dadosManipulando.COMPLEMENTO" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Complemento: </label> 
              </div>
            </div>
            <div class="row">
              <div class="input-container col-xs-12 col-sm-12 col-md-4 col-lg-4">		
                <input v-model="dadosManipulando.ESTADO" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Estado: *</label> 
              </div>
              <div class="input-container col-xs-12 col-sm-12 col-md-8 col-lg-8">		
                <input v-model="dadosManipulando.CIDADE" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Cidade: *</label> 
              </div>
            </div>
            <div class="input-container col-xs-12 col-sm-12 col-md-12 col-lg-12">		
              <input v-model="dadosManipulando.NOME" type="text" required=""/>
              <label style="color:#000000">Nome: </label> 
            </div>
            <select v-model="dadosManipulando.TIPOCRIME" class="form-select" aria-label="Default select example">
              <option selected>Selecione o tipo de crime *</option>
              <option value="1">Crime1</option>
              <option value="2">Crime2</option>
              <option value="3">Crime3</option>
            </select>
              <div class="d-flex justify-content-center">
                <button @click="gravarModal" type="button" class="btn" >Enviar</button>
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
