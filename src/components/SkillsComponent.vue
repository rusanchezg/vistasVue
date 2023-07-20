<template>
  <div class="ancho">
    <div class="accordion" id="skillsAccordion">
      <div v-for="pos in body"  v-bind:key="pos.ordinal" >
        <div class="accordion-item accordion-item-bottom-margin">
          <h2 class="accordion-header" :id=acordionId(pos.ordinal) >
              <button type="button" class="accordion-button collapsed" 
                data-bs-toggle="collapse" 
                :data-bs-target=gatoCollapseId(pos.ordinal)>
                  {{ mark(pos.cabecera.desc, pos.ordinal) }}
              </button>									
          </h2>
          <div class="accordion-collapse collapse" 
            data-bs-parent="#skillsAccordion"
            :id=collapseId(pos.ordinal) >
            <div class="card-body">
              <div class="acomoda">
                <label class="form-check-label aire" >{{ pos.cabecera.longdesc }}</label>
              </div>
              <div v-for="element in pos.contenido"  v-bind:key="element.valor" >
                <div class="form-check group-margin">
                  <input type="radio" class="form-check-input radio-left-margin"
                    :checked=isChecked(pos.ordinal,element.valor)
                    :name=radioName(pos.ordinal) 
                    :id=radioId(element.valor) 
                    @change=cambia(pos.ordinal,element.valor)
                    :value=pos.selection />
                  <div class="acomoda">
                    <label class="form-check-label aire" >{{ element.leyenda }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>  
  export default {
    props: ['content'],
    data: function () {
      return {
        body: this.content.body,
      }
    },      
    methods: {
      selection: function() {
        return this.body;
      },
      radioId: function(id) {
        return "radioId-" + id;
      },
      radioName: function(id) {
        return "radioName-" + id;
      },
      acordionId: function(id) {
        return "accordion-" + id;
      },        
      collapseId: function(id) {
        return "collapseId-" + id;
      },   
      gatoCollapseId: function(id) {
        return "#collapseId-" + id;
      },   
      cambia: function(estoyEnElGrupo, estoyEnElRadio) {
        this.body[estoyEnElGrupo].selection = estoyEnElRadio
      },           
      isChecked: function(estoyEnElGrupo, estoyEnElRadio) {
        return this.body[estoyEnElGrupo].selection==estoyEnElRadio        
      },
      mark: function(text, ordinal) {
        var space = ' ';
        if(this.body[ordinal].selection==0) return '\u274c' + space + text;
        return '\u2714' + space + text;
      }
    }
  }
  </script>
  
<style scoped>
    .ancho {
      padding-top: 0px;
    }
    .radio-left-margin {
      margin-left: 2px;
    }
    .accordion-item-bottom-margin {
      margin-bottom: 4px;
    }
    .group-margin {
      margin-top: 14px;
      margin-bottom: 14px;
    }
    .acomoda {
      text-align: left;
    }
    .aire {
      padding-left: 8px;
    }
    .accordion-button {
      margin: 0px;
    }
</style>

  
  