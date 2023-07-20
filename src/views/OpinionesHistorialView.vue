<template>
	<div class="container-fluid">
<div class="header"></div>
	<div class="body">
		<div class="row justify-content-center">
		<div class="col-2">
			<div class="menu">
			<span>Dirección</span>
			<span>Opiniones</span>
			<span>Configuración</span>
			<span>Tarjeta de crédito</span>
			<span>Facturación</span>
			<span>Seguridad</span>
			<span>Mis datos</span>
			</div>
		</div>
  
		<div class="col-8">
			<div class="opinions">
			<h1>Opiniones</h1>
			<h2>Historial</h2>
			<div class="row">
			<div class="col-12" v-for="card in displayedCards" :key="card.id">
				<div class="cards d-flex flex-column flex-md-row">
				<img class="profile-photo" :src="card.profilePhoto" alt="Foto de perfil">
				<div class="data">
					<span class="name">{{ card.name }}</span>
					<span class="name-job">{{ card.job }}</span>
				</div>
				<div class="data">
					<span class="score">Puntuación</span>
					<StarsComponent :score="card.score" />
				</div>
				<div class="carousel d-flex align-items-center">
					<button class="carousel-arrow prev" @click="prevSlide(card)">
					<i class="fas fa-chevron-left"></i>
					</button>
					<img v-for="(image, index) in card.imagesService" :src="image" :key="index" :class="{ active: index === card.currentSlide }" alt="Imagen del carrusel">
					<button class="carousel-arrow next" @click="nextSlide(card)">
					<i class="fas fa-chevron-right"></i>
					</button>
				</div>
				</div>
			</div>
			</div>
			<div class="load-more">
              <button class="carousel-arrow prev" @click="prevPage" :disabled="currentPage === 1">
                <i class="fas fa-chevron-left"></i>
              </button>
				<span>{{ currentPage }} / {{ totalPageCount }}</span>
              <button class="carousel-arrow next" @click="nextPage" :disabled="currentPage >= totalPageCount">
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
import StarsComponent from "@/components/StarsComponent.vue";

export default {
  components: {
    StarsComponent
  },
  data() {
    return {
      cards: [],
      displayedCards: [],
      cardsForPage: 4,
      currentPage: 1,
    };
  },
  created() {
    this.loadCardsFromAPI();
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.cards.length / this.cardsForPage);
    },
  },
  methods: {
    async loadCardsFromAPI() {
      try {
        const response = await axios.get('http://localhost:8081/api/opiniones/historial');
        this.cards = response.data;
		console.log(response.data)
		console.log("deberia cargar");
        this.loadMoreCards();
      } catch (error) {
        console.error(error);
      }
    },
    prevSlide(card) {
      if (card.currentSlide > 0) {
        card.currentSlide--;
      } else {
        card.currentSlide = card.imagesService.length - 1;
      }
    },
    nextSlide(card) {
      if (card.currentSlide < card.imagesService.length - 1) {
        card.currentSlide++;
      } else {
        card.currentSlide = 0;
      }
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
      this.displayedCards.forEach((card) => {
        card.currentSlide = 0;
      });
    },
  },
};
</script>
	
	
	<style scoped>
	
	
	.body { 
		background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url('https://raw.githubusercontent.com/rusanchezg/templates-images/main/images/fondo-opiniones-historial.png');
		background-repeat:no-repeat;
		background-size:120% 120%;
		background-position: center;
		height: 100vh;
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
	.cards .btn {
	width: 100px;
    border: 1px solid black;
    border-radius: 5px;
    border-top: none;
    margin: 10px;
    background-color: #78CDD7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);

	}
	.carousel {
  display: flex;
  margin: 12px;
  align-items: center;
}
.cards .carousel img {
  height: 120px;
  width: 150px;
  display: none;
  border-radius: 10px;
  border: 2px solid gray;
  flex-shrink: 0;
}

.cards .carousel img.active {
  display: block;
}

.carousel-arrow {
	margin: 20px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
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