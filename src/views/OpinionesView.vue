<template>
    <div class="container-fluid">
      <div class="header">

      </div>
      <div class="search">
        <div class="search-input-container">
          <i class="fas fa-search search-icon"></i>
          
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="filter">
            <h3>-</h3>
            <div class="container-filter">
            <ul>
              <li v-for="aspect in aspects" :key="aspect.id" class="aspect-item">
                <span @click="toggleOptions(aspect)" class="aspect-label"> {{ aspect.label }}</span>
                <ul v-show="aspect.showOptions">
                  <li v-for="option in aspect.options" :key="option" @click="applyFilter(aspect, option)">
                    <input type="radio" :name="aspect.id" :value="option" v-model="aspect.selectedOption">
                    <label>{{ option }}</label>
                  </li>
                </ul>
              </li>
            </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="results">
            <h3>Opiniones</h3>
            <div class="container-results">
                <span>resultados encontrados</span>
            <!--<ul>
              <li v-for="result in filteredResults" :key="result.id">{{ result.title }}</li>
            </ul>-->
            </div>
          </div>
        </div>
      </div>
    <div class="footer">

    </div>
    </div>
  </template>
  
  <script>
  import Opiniones from "./Opiniones.json";
  
  export default {
    data() {
      return {
        searchQuery: '',
        searchResults: [],
        aspects: [],
        selectedAspect: null
      };
    },
    created() {
    this.aspects = Opiniones.aspects;
  },
  computed: {
    filteredResults() {
      if (this.selectedAspect) {
        return this.searchResults.filter(result => result.aspect === this.selectedAspect.id);
      }
      return this.searchResults;
    }
  },
  allOptionsSelected() {
      return this.aspects.every(aspect => aspect.selectedOption !== null);
    },
  methods: {
    applyFilter(aspect) {
      this.selectedAspect = aspect;
    },
    toggleOptions(aspect) {
        aspect.showOptions = !aspect.showOptions;
    },
    search() {
      // Simulación de búsqueda con los resultados filtrados por el aspecto seleccionado
    }
  }
};
</script>

<style scoped>

  .row {
    background-image: url('https://raw.githubusercontent.com/rusanchezg/templates-images/main/images/chambeaya.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }
  .header {
    margin-bottom: 20px;
    height: 80px;
    background-color: #247B7B;
  }
  .search {
    position: relative;
    margin-bottom: 30px;
  }

  .search-input {
    border: 1px solid black;
    border-radius: 5px;
    padding-left: 30px;
    border-top: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  }
  button {
    border: 1px solid black;
    border-radius: 5px;
    border-top: none;
    margin: 10px;
    background-color: #78CDD7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  }

  .search-icon {
    position: relative;
    left: 20px;
    color: grey;
  }

  .container-filter {
    border: 1px solid grey;
    border-radius: 5px;
    min-height: 550px;
    border-top: none;
    margin-left: 60px;
    margin-right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    background-color: white;
  }
  .filter h3 {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
    font-size: 30px; 
  }
  .aspect-label{
    font-size: 26px;
    margin: 20px;
    text-align: left;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
  .aspect-item {
    font-size:18px;
    margin: 10px;
    text-align: left;
  }
  ul, ol {
    list-style-type: none;    
  }
  .container-results {
    border: 1px solid gray;
    border-radius: 5px;
    min-height: 550px;
    border-top: none;
    margin-left: 20px;
    margin-right: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    background-color: white;
  }
  .results h3 {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
    font-size: 30px;
  }

  .footer {
    margin-top: 20px;
    height: 80px;
    background-color: #247B7B;
  }

</style>
