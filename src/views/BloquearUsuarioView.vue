<template>
    <div class="container-fluid">
      <div class="header"></div>
      <div class="body">
        <div class="row justify-content-center">
          <div class="col-2">
            <div class="menu">
              <span>Publicaciones Pendientes</span>
              <span>Usuarios</span>
              <span>Configuración</span>
            </div>
          </div>
  
          <div class="col-8">
            <div class="search">
        <div class="search-input-container">
          <i class="fas fa-search search-icon"></i>
          <input class="search-input" type="text" v-model="searchQuery" placeholder="Buscar">
        </div>
      </div>
            <div class="opinions">
              <h1>Usuarios</h1>
              <div class="row">
                <div class="col-12" v-for="card in displayedCards" :key="card.id">
                  <div class="cards d-flex flex-column flex-md-row">
                    <img class="profile-photo" :src="card.profilePhoto" :alt="card.name">
                    <div class="data">
                      <span class="name">{{ card.name }}</span>
                    </div>
                    <div class="data">
                      <span class="score">Categoria</span>
                      <span class="name-category">{{ card.category }}</span>
                    </div>
                    
                      <button class="btn-bloquear" @click="verPublicacion(card.id)">Bloquear</button>
                
                  </div>
                </div>
              </div>
              <div class="load-more">
                <button class="btn-arrow prev" @click="prevPage" :disabled="currentPage === 1">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <span>{{ currentPage }} / {{ totalPageCount }}</span>
                <button class="btn-arrow next" @click="nextPage" :disabled="currentPage >= totalPageCount">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        cards: [],
        displayedCards: [],
        cardsForPage: 4,
        currentPage: 1,
        searchQuery: ''
      };
    },
    created() {
      this.loadCardData();
    },
    computed: {
      totalPageCount() {
        return Math.ceil(this.cards.length / this.cardsForPage);
      }
    },
    watch: {
      searchQuery(newQuery) {
        this.filterCards(newQuery);
      }
    },
    methods: {
      verPublicacion(id) {
        // Almacenar el ID en una variable de datos
        this.$data.publicacionId = id;
        // Redirigir a la página de publicación utilizando Vue Router
        this.$router.push({ name: 'publicacion' });
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.loadMoreCards();
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPageCount) {
          this.currentPage++;
          this.loadMoreCards();
        }
      },
      loadMoreCards() {
        const startIndex = (this.currentPage - 1) * this.cardsForPage;
        const endIndex = startIndex + this.cardsForPage;
        this.displayedCards = this.cards.slice(startIndex, endIndex);

        // Reiniciar el valor currentSlide de cada tarjeta
        this.displayedCards.forEach((card) => {
          card.currentSlide = 0;
        });
      },
      filterCards(query = "") {
        const filteredCards = this.cards.filter(card => {
          const name = card.name.toLowerCase();
          const lowerQuery = query.toLowerCase();
          return name.includes(lowerQuery);
        });
        this.displayedCards = filteredCards.slice(0, this.cardsForPage);
        this.currentPage = 1;
      },
      loadCardData() {
        axios.get('http://localhost:8081/api/admin/usuarios')
          .then(response => {
            this.cards = response.data;
            this.filterCards();
            this.loadMoreCards();
          })
          .catch(error => {
            console.error('Error al cargar los datos de la API:', error);
          });
      }
    },
  };
</script>
	
	
	<style scoped>
	
	
	.container-fluid {
		background-color: lightgray;
		height: 100vh;
		align-items: center;
		justify-content: center;
	}
	.body { 
		background-image:linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url('https://raw.githubusercontent.com/rusanchezg/templates-images/main/images/fondo-opiniones-historial.png');
		background-repeat:no-repeat;
		background-size:120% 120%;
		background-position: center;
		height: 100vh;
	}

    .col-8 {
        background-color:rgba(255, 255, 255, 1);

    }
    .search {
    position: relative;
    margin-bottom: 30px;
  }

  .search-input {
    height: 40px;
    width: 300px;
    border: 1px solid black;
    border-radius: 5px;
    padding-left: 30px;
    border-top: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  }

  .search-icon {
    position: relative;
    left: 20px;
    color: grey;
  }
	.opinions {
		position: relative;
		background-color:rgba(255, 255, 255, 1);
		min-height: 830px;
		margin-left: 40px;
	}
	
	.opinions h1 { 
		text-align: center;
	}
	.opinions h2 {
		text-align: left;
		margin: 15px 20px;
	}
	.cards { 
		box-shadow:0px 7px 4px rgba(0, 0, 0, 0.25);
		background-color:rgba(255, 255, 250.00000029802322, 1);
		margin: 10px 20px;
		border-radius: 11px;
		min-height: 135px;
		font-family:Aleo;
		font-size: 20px;
		align-items: center;	
	}
	.cards .profile-photo {
		border-radius: 50%;
		height: 120px;
		width: 120px;
		margin: 12px;
		border: 2px solid gray;
	}
	
	.cards .data {
		align-items: center;
		display: flex;
		flex-direction: column;
		margin: 12px;
		height: 120px;
		width: 120px;
		flex-grow: 1;
	}
	.btn-bloquear {
	width: 130px;
    height: 60px;
    border: 1px solid black;
    border-radius: 5px;
    border-top: none;
    margin: 25px;
    background-color: #78CDD7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);

	}


.opinions .load-more {
	position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center; 
  align-items: center;
  font-size: 30px;
  
  
}
.btn-arrow {
    margin: 20px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

	.menu { 
		box-shadow:0px 7px 6px rgba(0, 0, 0, 0.25);
		background-color:rgba(255, 255, 250.00000029802322, 1);
		min-height: 750px;
	}
	.menu span {
		display: block;
		font-family:Aleo;
		font-size:16px;
		margin-bottom: 20px;
	}
	
	</style>
