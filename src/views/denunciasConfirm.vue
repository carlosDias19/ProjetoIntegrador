<script>
import { RouterLink, RouterView } from 'vue-router'
import navBar from '../components/navBar.vue'
import modal from '../components/modal.vue'

export default {
  components: {
    RouterLink, RouterView, navBar, modal, 
  },
  data: function () {
    return {
      dataSourceTable: [],
      confirmManipulando: {},
      modalHeader: null,
      acao: null,
      dadosManipulando:{
        CEP: null,
        ENDERECO: null,
        NUMERO: null,
        BAIRRO: null,
        COMPLEMENTO: null,
        LATITUDE: null,
        LONGITUDE: null,
        TIPO: null,
      },
    }
  },
  computed: {
  },
  methods: {

    getDenunciasConfirm() {
      axios.get(`https://localhost:7127/api/DenunciasConfirm`).then(response => {
        console.log(response)
        response.data.forEach(element => {
          if(element['ativo'] == true){
            element['ativo'] = 'Sim'
          }
          if(element['ativo'] == false){
            element['ativo'] = 'Não'
          }
        });
        this.dataSourceTable = response.data;
      })
      .catch(error => {
        console.log("Erro.")
      });
    },

    async gravarModal(acao){

      if(acao == "Salvar"){
        axios.post(`https://localhost:7127/api/Denuncias`,{
          'tipoId': this.confirmManipulando.tipoId,
          'usuarioId': 1,
          'cep': this.dadosManipulando.CEP,
          'endereco': this.dadosManipulando.ENDERECO,
          'numero': this.dadosManipulando.NUMERO,
          'bairro': this.dadosManipulando.BAIRRO,
          'complemento': this.dadosManipulando.COMPLEMENTO,
          'latitude': this.dadosManipulando.LATITUDE,
          'longitude': this.dadosManipulando.LONGITUDE
        }, 
          {
          headers: {
            'Content-Type': 'application/json',
            // Adicione outros cabeçalhos necessários aqui
          }
        }).then(response => {
          alert("Denúncia confirmada!!")
          axios.delete(`https://localhost:7127/api/DenunciasConfirm/${this.confirmManipulando.denunciasId}`,{         
          headers: {
            'Content-Type': 'application/json'
          },}).
          then(response => {
            this.closeModal();
            this.getDenunciasConfirm();
          })
          .catch(error => {
            alert("Erro ao deletar denuncia aceita denúncia!!")
          });
        })
        .catch(error => {
          alert("Erro ao aceitar a denúncia!!")
        });
      }else if (acao == "NaoSalvar"){
        axios.delete(`https://localhost:7127/api/DenunciasConfirm/${this.confirmManipulando.denunciasId}`,{         
        headers: {
          'Content-Type': 'application/json'
        },}).
        then(response => {
          alert("Denúncia não confirmada!!")
          this.closeModal();
          this.getDenunciasConfirm();
        })
        .catch(error => {
          alert("Erro ao deletar.")
        });
      }
    },

    closeModal() {
      this.$refs.Modal.hide();
    },

    ConfirmSelecionado(element) {
      // Verifica se tem um contato já selecionado para remover o estilo
      if (Object.keys(this.confirmManipulando).length > 0) {
        document.getElementById(this.confirmManipulando.denunciasId).classList.remove('ConfirmSelecionado');
      }

      this.confirmManipulando = element;
      console.log(this.confirmManipulando)
      document.getElementById(element.denunciasId).classList.add('ConfirmSelecionado');
    },

    limparDadosManipulando(){
      this.dadosManipulando = {
      }
    },
    openModal(){
      console.log(this.confirmManipulando)
      if (Object.keys(this.confirmManipulando).length === 0) {
          alert('Por Favor, Selecione um registro para continuar.')
          return;
        }
      else{
        this.modalHeader = 'Confirmar Denúncias';
        axios.get(`https://localhost:7127/api/TipoDeCrime/${this.confirmManipulando.tipoId}`,
        {
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos necessários aqui
        }
      }).then(response => {
        this.dadosManipulando.TIPO = response.data.descricao + ' - ' + response.data.tipoId
      });
        setTimeout(() => {
          this.$refs.Modal.show();
        }, 100);
        this.dadosManipulando.CEP = this.confirmManipulando.cep
        this.dadosManipulando.ENDERECO = this.confirmManipulando.endereco
        this.dadosManipulando.NUMERO = this.confirmManipulando.numero
        this.dadosManipulando.BAIRRO = this.confirmManipulando.bairro
        this.dadosManipulando.COMPLEMENTO = this.confirmManipulando.complemento
        this.dadosManipulando.LATITUDE = this.confirmManipulando.latitude
        this.dadosManipulando.LONGITUDE = this.confirmManipulando.longitude
      }  
    }

  },

  mounted: function () {
    this.getDenunciasConfirm();
  }
}
</script>

<template>
      <navBar></navBar>

      <div id="main">
         
                          
            <div  class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center'>
              <div class="d-flex justify-content-center">
                <h2 style="color:#ff716c">Confirmar Denúncias</h2>
              </div>
            </div>

            <div class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>

              <div class='headGrid'>  
                <div class="d-flex justify-content-center">
                  <button type="button" @click='openModal' class="btn btn-primary "><font-awesome-icon :icon="['fas', 'circle-info']"/>&nbsp&nbspInformações/Confirmar</button>
                </div>
              </div>

              <div class='thead'>
                <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'><span>ID</span></div>
                <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>Endereço</span></div>
                <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'><span>Número</span></div>
                <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>Complemento</span></div>
                <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>Bairro</span></div>
                <div class='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'><span>CEP</span></div>
              </div>

              <div class='tbody'>
                <div v-if='dataSourceTable.length == 0' class='tipoDeCrime' style='margin: 1% 0'>
                  <span>Nenhum dado para carregar.</span>
                </div>
                <div v-else v-for='data in dataSourceTable' class='tipoDeCrime' :id='(data.denunciasId)' @click='ConfirmSelecionado(data)'>
                  <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>{{data.denunciasId}}</div>
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
        <div class="d-flex justify-content-end">
          <button style="border: 0px; background: white; margin-top: -45px;" type="button" @click='closeModal' class=""><font-awesome-icon :icon="['fas', 'xmark']"/></button>
        </div>
      </header>

      <main>

          <form>

            <div class="row mt-3">
              <div class="input-container col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <input style="pointer-events: none; background-color: #f4f4f4;" maxlength="maxCharacters" ref="CEP" v-model="dadosManipulando.CEP" type="number" required=""/>
                <label style="color:#000000; margin-left: 15px;">CEP da ocorrência:</label>		
              </div>
              <div class="input-container col-xs-12 col-sm-6 col-md-6 col-lg-6">		
                <input style="pointer-events: none; background-color: #f4f4f4;" v-model="dadosManipulando.ENDERECO" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Endereço:</label> 
              </div>
              <div class="input-container col-xs-12 col-sm-2 col-md-2 col-lg-2">
                <input style="pointer-events: none; background-color: #f4f4f4;" maxlength="maxCharacters" v-model="dadosManipulando.NUMERO" type="number" required=""/>
                <label style="color:#000000; margin-left: 15px;">Número:</label>		
              </div>
            </div>
            <div class="row">
              <div class="input-container col-xs-12 col-sm-6 col-md-6 col-lg-6">		
                <input style="pointer-events: none; background-color: #f4f4f4;" v-model="dadosManipulando.BAIRRO" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Bairro:</label> 
              </div>
              <div class="input-container col-xs-12 col-sm-6 col-md-6 col-lg-6">		
                <input style="pointer-events: none; background-color: #f4f4f4;" v-model="dadosManipulando.COMPLEMENTO" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Complemento:</label> 
              </div>
            </div>
            <div class="row">
              <div class="input-container col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <input style="pointer-events: none; background-color: #f4f4f4;" maxlength="maxCharacters" v-model="dadosManipulando.LATITUDE" type="number" required=""/>
                <label style="color:#000000; margin-left: 15px;">Latitude:</label>		
              </div>
              <div class="input-container col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <input style="pointer-events: none; background-color: #f4f4f4;" maxlength="maxCharacters" v-model="dadosManipulando.LONGITUDE" type="number" required=""/>
                <label style="color:#000000; margin-left: 15px;">Longitude:</label>		
              </div>
            </div>
            <div class="row">
              <div class="col-md-3"></div>
              <div class="input-container col-xs-12 col-sm-6 col-md-6 col-lg-6">		
                <input style="pointer-events: none; background-color: #f4f4f4;" v-model="dadosManipulando.TIPO" type="text" required=""/>
                <label style="color:#000000; margin-left:10px;">Tipo De Crime:</label> 
              </div>
              <div class="col-md-3"></div>
            </div>
          </form>
        

      </main>

      <footer>
        <div class="row d-flex justify-content-end me-2">
            <div class="col-2">
                <button type="button" id="buttonModalSalvar" @click='gravarModal("Salvar")' class="btn btn-success"><font-awesome-icon :icon="['fas', 'check']"/>&nbsp&nbspAceitar</button>
            </div>
            <div class="col-2">
                <button type="button" id="buttonModal" @click='gravarModal("NaoSalvar")' class="btn btn-danger"><font-awesome-icon :icon="['fas', 'xmark']"/>&nbsp&nbspNão Aceitar</button>
            </div>
        </div>
      </footer>
    </modal>

          </div>

</template>

<style>

@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext');

body {
    font-family: 'Poppins', sans-serif;
    background-color: rgb(2 6 23);
    margin: 0;
    padding: 0;
}

#main {
    margin: 10% auto 10% auto;
    max-width: 80%;
    min-width: 200px;
    height: 100%;
    background-color: white;
}

.grid {
    padding: 5px;
}

.tipoDeCrime {
    display: flex;
    justify-content: center;
    padding: 10px;
    border-bottom: 0.02px solid rgba(0, 0, 0, 0.253);
    transition: 0.3s ease-in;
} 

.tipoDeCrime:hover {
    background-color: #b3b3b39a;
    font-weight: bold;
}

.ConfirmSelecionado {
    color: white;
    background-image: radial-gradient(circle,  #FF0000, #FF69B4);
}

.thead {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: white;
    padding: 5px;
}

.headGrid {
  margin-top: -100px;
}

/* Modal */

.button {
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 10px;
    gap: 10px;
}
</style>
