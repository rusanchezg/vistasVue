<template>
  <div>
      <div class="col-3 style-skills" >
              <div class="card">
                  <div class="card-header">
                      <h2>Filtros</h2>
                  </div>
                  <div class="card-body">
                      <SkillsComponent ref="foo" :content=content />
                  </div>
                  <div class="card-footer">
                      <button @click="show" class="btn btn-success">Aplicar Filtro</button>
                  </div>
              </div>
          </div>        
  </div>
</template>

<script>
import info from './Skills.json'

export default {
  
  data: function() {
      return {
          content:info
      }
  },
}
</script>


<style scoped>
.style-skills {
  width: 300px;
  margin-top: 10px;
  margin-left: 30px;
}
.card-style {
  width: 280px; 
  text-align: left; 
  font-size: 12px;
  margin: 10px;
}
.centrado {
  text-align: center;
}
.acomoda {
  width: 100%;
}
</style>