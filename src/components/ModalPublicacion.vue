<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <!-- Contenido del modal -->
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
      };
    },
    methods: {
      open() {
        this.show = true;
      },
      close() {
        this.show = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos del modal */
  /* ... */
  </style>