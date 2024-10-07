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
      TipoManipulando: {},
      modalHeader: null,
      acao: null,
      dadosManipulando:{
        DESCRICAO: null,
        ATIVO: true,
        TIPOID: null
      },
    }
  },
  computed: {
  },
  methods: {
    async gravarModal(){
      if(this.acao == 'Novo'){
        axios.post(`https://localhost:7127/api/TipoDeCrime?`,{'Descricao': this.dadosManipulando.DESCRICAO, 'Ativo': this.dadosManipulando.ATIVO}, 
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Adicione outros cabeçalhos necessários aqui
        }
        }).then(response => {
            this.getTipo();
            this.closeModal();
        })
        .catch(error => {
          alert("Erro ao inserir.")
        });
      }
      else if(this.acao == 'Editar'){
        axios.put(`https://localhost:7127/api/TipoDeCrime?`,{'TipoId':this.dadosManipulando.TIPOID ,'Descricao': this.dadosManipulando.DESCRICAO, 'Ativo': this.dadosManipulando.ATIVO},{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Adicione outros cabeçalhos necessários aqui
        }
        }).then(response => {
            this.getTipo();
            this.closeModal();
        })
        .catch(error => {
          alert("Erro ao atualizar.")
        });
      }
      else if(this.acao == 'Deletar'){
        axios.delete(`https://localhost:7127/api/TipoDeCrime/${this.dadosManipulando.TIPOID}`,{         
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },}).
        then(response => {
          this.getTipo();
        })
        .catch(error => {
          alert("Erro ao deletar.")
        });
      }

    },

    async getTipo() {
      axios.get(`https://localhost:7127/api/TipoDeCrime`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Adicione outros cabeçalhos necessários aqui
        }
      }).then(response => {
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

    closeModal() {
      this.$refs.Modal.hide();
    },

    openModal(acao) {
      this.acao = acao;

      if (this.acao == 'Novo') {
        this.limparDadosManipulando();
        this.$refs.Modal.show();
        this.modalHeader = 'Novo Tipo De Crime';
        return;
      }

      if (this.acao == 'Editar') {
        this.limparDadosManipulando();
        if (!this.tipoManipulando) {
          alert('Por Favor, Selecione um registro.')
          return;
        }

        this.$refs.Modal.show();
        this.modalHeader = 'Editar Tipo De Crime';

        this.dadosManipulando.TIPOID = this.tipoManipulando.tipoId;
        this.dadosManipulando.DESCRICAO = this.tipoManipulando.descricao;
        this.dadosManipulando.ATIVO  = this.tipoManipulando.ativo == 'Sim' ? true : false;
        return;
      }

      if (this.acao == 'Deletar') {
        this.limparDadosManipulando();
        
        if (!this.tipoManipulando) {
          alert('Por Favor, Selecione um registro.')
          return;
        }
        this.dadosManipulando.TIPOID = this.tipoManipulando.tipoId;
        this.dadosManipulando.DESCRICAO = this.tipoManipulando.descricao;
        this.dadosManipulando.ATIVO  = this.tipoManipulando.ativo == 'Sim' ? true : false;
        this.gravarModal();
        return;
       }
    },

    TipoSelecionado(element) {
      // // Verifica se tem um contato já selecionado para remover o estilo
      if (this.tipoManipulando != null) {
        document.getElementById(this.tipoManipulando.tipoId).classList.remove('TipoSelecionado');
      }
      this.tipoManipulando = element;

      document.getElementById(element.tipoId).classList.add('TipoSelecionado');
    },

    limparDadosManipulando(){
      this.dadosManipulando = {
        DESCRICAO: null,
        ATIVO: true,
        TIPOID: null
      }
    }
  },
  mounted: function () {
    this.getTipo();
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
                <button type="button" @click='openModal("Novo")' class="btn btn-primary"><font-awesome-icon :icon="['fas', 'plus']"/>&nbsp&nbspAdicionar</button>
                <button type="button" @click='openModal("Editar")' style="margin-left: 2px;" class="btn btn-secondary"><font-awesome-icon :icon="['fas', 'pen-to-square']"/>&nbsp&nbspEditar</button>
                <button type="button" @click='openModal("Deletar")' style="margin-left: 2px;" class="btn btn-danger"><font-awesome-icon :icon="['fas', 'trash']"/>&nbsp&nbspDeletar</button>
              </div>

              <div class='thead'>
                <div class='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'><span>ID do tipo de crime</span></div>
                <div class='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'><span>Descrição</span></div>
                <div class='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'><span>Ativo</span></div>
              </div>

              <div class='tbody'>
                <div v-if='dataSourceTable.length == 0' class='tipoDeCrime' style='margin: 1% 0'>
                  <span>Nenhum dado para carregar.</span>
                </div>
                <div v-else v-for='data in dataSourceTable' class='tipoDeCrime' :id='(data.tipoId)' @click='TipoSelecionado(data)'>
                  <div class='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>{{data.tipoId}}</div>
                  <div class='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>{{data.descricao}}</div>
                  <div class='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>{{data.ativo}}</div>
                </div>
              </div>

            </div>

    <modal ref='Modal' :width='1000'>

      <header>
        <h4>{{modalHeader}}</h4>
      </header>

      <main>

          <form>

            <div class="row mt-3">
              <div class="col-1"></div>
              <div class="input-container col-xs-12 col-sm-12 col-md-5 col-lg-5 mt-3">		
                  <input v-model="dadosManipulando.DESCRICAO" type="text" required=""/>
                  <label style="color:#000000; margin-left:10px;">Descrição: *</label> 
              </div>  
              <div class='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 mt-4'>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="ativar_desativar" v-model='dadosManipulando.ATIVO'>
                  <label class="form-check-label" for="ativar_desativar">Ativo/Desativo</label>
                </div>
              </div>
              <div class="col-1"></div>
            </div>

          </form>
        

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

.TipoSelecionado {
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
