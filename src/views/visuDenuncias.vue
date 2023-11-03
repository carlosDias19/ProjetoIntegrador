<script>
import { RouterLink, RouterView } from 'vue-router'
import navBar from '../components/navBar.vue'
import modal from '../components/modal.vue'

export default {
  components: {
    RouterLink, RouterView, navBar, modal
  },
  data: function () {
    return {
      dataSourceTable: [],
      modalHeader: null,
      Operacao: null,
      dadosManipulando:{

      },
    }
  },
  computed: {
  },
  methods: {
    gravarModal(){
    },

    getGenero() {
      axios.get(`https://localhost:7127/api/Denuncias`).then(response => {
        this.dataSourceTable = response.data.$values;
      })
      .catch(error => {
        console.log("Erro.")
      });
    },

    closeModal() {
      this.$refs.Modal.hide();
    },

    openModal(acao) {
      this.acao = acao;

      if (this.acao == 'Novo') {
        this.$refs.Modal.show();
        this.modalHeader = 'Novo';
        // this.button = [
        //   {NOME: 'Salvar', action: this.Operacao, class: 'btn btn-outline-primary'},
        //   {NOME: 'Fechar', action: this.closeModal, class: 'btn btn-outline-danger'}
        // ];
        return;
      }

      // if (this.acao == 'Editar') {

      //   if (!this.generoManipulando.CODGENERO) {
      //     alert('Por Favor, Selecione um registro.')
      //     return;
      //   }

      //   this.$refs.Modal.show();
      //   this.modalHeader = 'Editar';
      //   this.button = [
      //     {NOME: 'Salvar', action: this.Operacao, class: 'btn btn-outline-primary'},
      //     {NOME: 'Fechar', action: this.closeModal, class: 'btn btn-outline-danger'}
      //   ];

      //   this.dados.CODGENERO = this.generoManipulando.CODGENERO;
      //   this.dados.GENERO = this.generoManipulando.GENERO;
      //   this.dados.FORCA  = this.generoManipulando.FORCA;
      //   this.dados.VELOCIDADE = this.generoManipulando.VELOCIDADE;
      //   this.dados.INTELIGENCIA = this.generoManipulando.INTELIGENCIA;
      //   this.dados.DESCRICAO  = this.generoManipulando.DESCRICAO;
      //   this.dados.ATIVO  = this.generoManipulando.ATIVO == 'S' ? true : false;

      //   return;
      // }

      // if (this.acao == 'Deletar') {

      //   if (!this.generoManipulando.CODGENERO) {
      //     alert('Por Favor, Selecione um registro.')
      //     return;
      //   }
      //   this.dados.CODGENERO = this.generoManipulando.CODGENERO;
      //   this.Operacao();

      //   return;
      //  }
    },

    generoSelecionado(element) {
      // Verifica se tem um contato já selecionado para remover o estilo
      if (this.generoManipulando.CODGENERO) {
        document.getElementById(this.generoManipulando.CODGENERO).classList.remove('GeneroSelecionado');
      }

      this.generoManipulando = element;

      document.getElementById(element.CODGENERO).classList.add('GeneroSelecionado');
    },

    limparDadosManipulando(){
      this.dadosManipulando = {
      }
    }
  },
  mounted: function () {
    this.getGenero();
  }
}
</script>

<template>
      <navBar></navBar>

      <div id="main">
         
                          
            <div  class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center'>
              <h2 style="color:#ff716c">Manutenção do Tipo De Crime</h2>
            </div>

            <div class='grid col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>

              <div class='headGrid'>  
                <button type="button" @click='openModal("Novo")' class="btn btn-primary"><i class="fa-solid fa-plus fa-lg"></i>&nbsp&nbspAdicionar</button>
                <button type="button" @click='openModal("Editar")' class="btn btn-secondary"><i class="fa-solid fa-pen-to-square fa-lg"></i>&nbsp&nbspEditar</button>
                <button type="button" @click='openModal("Deletar")' class="btn btn-danger"><i class="fa-solid fa-trash fa-lg"></i>&nbsp&nbspDeletar</button>
              </div>

              <div class='thead'>
                <div class='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'><span>Sequência</span></div>
                <div class='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'><span>Descrição</span></div>
              </div>

              <div class='tbody'>
                <div v-if='dataSourceTable.length == 0' class='genero' style='margin: 1% 0'>
                  <span>Nenhum dado para carregar.</span>
                </div>
                <div v-else v-for='data in dataSourceTable' class='genero' :id='(data.denunciasId)' @click='generoSelecionado(data)'>
                  <div class='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>{{data.denunciasId}}</div>
                  <div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>{{data.endereco}}</div>
                </div>
              </div>

            </div>

    <modal ref='Modal' :width='800' :height="800">

      <h4 slot='header'>{{modalHeader}}</h4>

      <div slot='main'>
        <div>aqui</div>
      </div>

    </modal>

          </div>

</template>

<style>

@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext');

body {
    font-family: 'Poppins', sans-serif;;
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

.genero {
    display: flex;
    justify-content: center;
    padding: 10px;
    border-bottom: 0.02px solid rgba(0, 0, 0, 0.253);
    transition: 0.3s ease-in;
} 

.genero:hover {
    background-color: #b3b3b39a;
    font-weight: bold;
}

.GeneroSelecionado {
    color: white;
    background-image: radial-gradient(circle, #0a66ee, #334fcf, #3e38b0, #402092, #3d0174);
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
    background-color: #D0D0D0;
    padding: 5px;
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
