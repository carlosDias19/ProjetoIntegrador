<template>

    <div v-show='showModal' class="modal">
        <div v-bind:style="{ width: width + 'px' }, { height: height + 'px'}" class='modal_container'>

            <slot name='header'></slot>

            <slot name='main'></slot>

            <slot name='footer'></slot>
            
        </div>
    </div>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
    props: {
        width: {
            type: Number,
            default: 700
        },
        height: {
            type: Number,   
            default: 700
        }
    },
    components: {
    RouterLink, RouterView
    },
    data: function () {
    return {
        showModal: false
    }
    },
    computed: {
    },
    methods: {
        show() {
            this.showModal = true;
        },

        hide() {
            this.showModal = false;
        }
    },
    mounted: function () {

    }
}
</script>
<style>

.modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-head{
  padding: 10px;
}

.modal_container {
    background-color: white;
    padding: 10px;
}

.modal-content {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal_footer {
    background-color: white;
    width: 100%;
    padding: 10px;
}

.footer_buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.modal-close {
  margin-top: 10px;
  cursor: pointer;
}
</style>