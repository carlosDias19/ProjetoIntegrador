<script>
import { RouterLink, RouterView } from 'vue-router'
import { TextBoxComponent as EjsTextbox } from '@syncfusion/ej2-vue-inputs';
import navBar from '../components/navBar.vue'
import modal from '../components/modal.vue'

export default {
  components: {
    RouterLink, RouterView, EjsTextbox, navBar, modal
  },
  data: function () {
    return {
      tipoDeCrime: [],
      dataSourceTable: [],
      modalHeader: null,
      acao: null,
      dadosManipulando:{
        CEP: null,
        ENDERECO: null,
        NUMERO: null,
        ESTADO: null,
        CIDADE: null,
        TIPOCRIME: null,
        BAIRRO: null,
        COMPLEMENTO: null,
        LATITUDE: null,
        LONGITUDE: null,
      },
      maxDigits: 8
    }
  },
  computed: {
  },
  methods: {
    getDenuncias(){
      axios.get(`https://localhost:7127/api/DenunciasConfirm/`,
        {
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos necessários aqui
        }
      }).then(response => {
        response.data.forEach(element => {
          axios.get(`https://localhost:7127/api/Usuario/${element['usuarioId']}`,
            {
            headers: {
              'Content-Type': 'application/json',
              // Adicione outros cabeçalhos necessários aqui
            }
          }).then(response => {
            element['usuarioId'] = response.data.nomeCompleto + ' - ' + response.data.usuarioId
          });
        });
        setTimeout(() => {
          this.dataSourceTable = response.data  
        },200);
      });
    },

    getTipo(){
      axios.get(`https://localhost:7127/api/TipoDeCrime/`,
        {
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos necessários aqui
        }
      }).then(response => {
        this.tipoDeCrime = response.data
      });
    },

    gravarModal(){
      if(this.dadosManipulando.CEP == null || this.dadosManipulando.CEP == ""){
        alert("Preencha o CEP.");
      } else if (this.dadosManipulando.ENDERECO == null || this.dadosManipulando.ENDERECO == ""){
        alert("Preencha o endereço.")
      } else if (this.dadosManipulando.BAIRRO == null || this.dadosManipulando.BAIRRO == ""){
        alert("Preencha o bairro.")
      } else if(this.dadosManipulando.ESTADO == null || this.dadosManipulando.ESTADO == ""){
        alert("Preencha o Estado.")
      } else if(this.dadosManipulando.CIDADE == null || this.dadosManipulando.CIDADE == ""){
        alert("Preencha a Cidade.")
      } else if(this.dadosManipulando.TIPOCRIME == null || this.dadosManipulando.TIPOCRIME == ""){
        alert("Selecione o tipo de crime.")
      }
      else{
        const cep = this.dadosManipulando.CEP
        try {
          const response = axios.get(`https://cep.awesomeapi.com.br/json/${cep}`)
          .then(res => {
            this.dadosManipulando.LATITUDE = res.data.lat
            this.dadosManipulando.LONGITUDE = res.data.lng
          });
        } catch (error) {
          alert("Erro ao gravar denuncia.", error);
        }
        console.log(this.dadosManipulando)
        axios.post(`https://localhost:7127/api/DenunciasConfirm?`,
        {
          'tipoId': this.dadosManipulando.TIPOCRIME,
          'usuarioId': 1,
          'cep': this.dadosManipulando.CEP,
          'endereco': this.dadosManipulando.ENDERECO,
          'numero': this.dadosManipulando.NUMERO == null ? 0 : this.dadosManipulando.NUMERO,
          'bairro': this.dadosManipulando.BAIRRO,
          'complemento': this.dadosManipulando.COMPLEMENTO == null ? 0 : this.dadosManipulando.COMPLEMENTO,
          'latitude': this.dadosManipulando.LATITUDE,
          'longitude': this.dadosManipulando.LONGITUDE
        }, 
        {
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos necessários aqui
        }
        }).then(response => {
            this.getDenuncias();
            this.closeModal();
        })
        .catch(error => {
          alert("Erro ao adicionar denúcias.")
        });
      }
    },

    openModal(){
        this.limparDadosManipulando();
        this.$refs.Modal.show();
        this.modalHeader = "Nova Denúncia"

    },

    async onChange(args) {
      const cep = this.dadosManipulando.CEP
      if(cep == "" || cep == null){
        this.limparDadosManipulando();
      }

      setTimeout(() => { 
        if (this.dadosManipulando.CEP.toString().length > this.maxDigits) {
          this.limparDadosManipulando();
          // Limite o número de dígitos
          this.dadosManipulando.CEP = parseInt(this.dadosManipulando.CEP.toString().slice(0, this.maxDigits));
          alert("CEP invalido.");
        }
      }, 100);

      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        this.dadosManipulando.ENDERECO = response.data.logradouro;
        this.dadosManipulando.CIDADE = response.data.localidade
        this.dadosManipulando.ESTADO = response.data.uf
        this.dadosManipulando.BAIRRO = response.data.bairro
        this.dadosManipulando.COMPLEMENTO = response.data.complemento
      } catch (error) {
        alert("CEP inválido", error);
      }
    },
    closeModal(){
      this.$refs.Modal.hide();
    },

    limparDadosManipulando(){
      this.dadosManipulando = {
        CEP: null,
        ENDERECO: null,
        NUMERO: null,
        ESTADO: null,
        CIDADE: null,
        TIPOCRIME: null,
        BAIRRO: null,
        COMPLEMENTO: null
      }
    }
  },
  mounted: function () {
    this.getTipo();
    this.getDenuncias();
  }
}
</script>

<template>
  <navBar></navBar>
        
  <div id="main">
         
                          
  <div  class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center'>
    <div class="d-flex justify-content-center">
      <h2 style="color:#ff716c">Denúncias</h2>
    </div>
  </div>

  <div class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>

    <div class='headGrid'>  
      <div class="d-flex justify-content-center">
        <button type="button" @click='openModal()' class="btn btn-primary"><font-awesome-icon :icon="['fas', 'plus']"/>&nbsp&nbspDenúnciar</button>
      </div>
    </div>

    <div class='thead'>
      <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'><span>ID</span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>Usúario</span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>Endereço</span></div>
      <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'><span>Número</span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>Complemento</span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>Bairro</span></div>
      <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>CEP</span></div>
    </div>

    <div class='tbody'>
      <div v-if='dataSourceTable.length == 0' class='tipoDeCrime' style='margin: 1%'>
        <span>Nenhum dado para carregar.</span>
      </div>
      <div v-else v-for='data in dataSourceTable' class='tipoDeCrime' :id='(data.denunciasId)' @click='ConfirmSelecionado(data)'>
        <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>{{data.denunciasId}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{data.usuarioId}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{data.endereco}}</div>
        <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>{{data.numero}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{data.complemento}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{data.bairro}}</div>
        <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>{{data.cep}}</div>
      </div>
    </div>

  </div>


  <modal ref='Modal' :width='1000'>

  <header>
    <h4>{{modalHeader}}</h4>
  </header>

  <main>
            <div class="input-container col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <input @change="onChange" maxlength="maxCharacters" v-model="dadosManipulando.CEP" type="number" required=""/>
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
            <label style="color:#000000;">Selecione o tipo de crime: *</label> 
            <select v-model="dadosManipulando.TIPOCRIME"  class="form-select" aria-label="Default select example">
              <option v-for='data in tipoDeCrime' :value="data.tipoId" >{{ data.descricao + ' - ' + data.tipoId}}</option>
            </select>

  </main>

  <footer>
    <div class="row d-flex justify-content-end me-2">
        <div class="col-2">
            <button type="button" id="buttonModalSalvar" @click='gravarModal("Salvar")' class="btn btn-success"><font-awesome-icon :icon="['fas', 'check']"/>&nbsp&nbspSalvar</button>
        </div>
        <div class="col-2">
            <button type="button" id="buttonModal" @click='closeModal()' class="btn btn-danger"><font-awesome-icon :icon="['fas', 'xmark']"/>&nbsp&nbspFechar</button>
        </div>
    </div>
  </footer>
  </modal>

</div>  
</template>

<style>

@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext');

.form-check-input:checked {
  background-color: #fd0d0d;
  border-color: #212529;
}

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
