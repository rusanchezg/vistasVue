<template>
	<div class="container-fluid">
		<div class="header"></div>
		<div class="body">
		<div class="container">
			<div class="row justify-content-center">
			<div class="col-9">
			<div class="card-user justify-content-center align-items-center" v-for="card in displayedCards" :key="card.id">
				<div class="profile-photo">
				<img :src="card.profilePhoto" alt="Foto de perfil" class="img-fluid">
				</div>
				<div class="name">{{ card.name }}</div>
				<div class="category">{{ card.category }}</div>
				<div class="scores">
				<div class="score"><span>Calificación:</span></div><StarsComponent :score="card.score" />
				<div class="total-scores">{{ card.score }}<span>   Calificaciones</span></div>
				</div>
				<div class="latest-jobs">
					<span>Últimos servicios: </span>
				<ul>
					<li v-for="job in card.latestJobs.slice(0, 2)" :key="job.job">
					<div class="details">
						<div class="job d-flex">
						
						<div class="job-details">
						<div>{{ job.job }}</div>
					<div>{{ job.nameUser }}</div>
						</div>
					<div class="job-details">
						<StarsComponent :score="card.score" />
				</div>
			</div>
					<div class="comment">{{ job.comment }}</div>
				</div>	
				</li>
				</ul>
				</div>
				<div class="carousel">
				<button class="carousel-arrow prev" @click="prevSlide(card)">
					<i class="fas fa-chevron-left"></i>
				</button>
				<div class="carousel-images">
					<img v-for="(image, index) in visibleImages(card)" :src="image" :key="index" alt="Imagen del servicio" class="d-block img-fluid">
				</div>
				<button class="carousel-arrow next" @click="nextSlide(card)">
					<i class="fas fa-chevron-right"></i>
				</button>
				</div>
				<div class="services-data d-flex">
				<div class="services">
					<span>Servicio: </span>
					<span>Descripción del servicio: </span>
				</div>
					<div class="services-results">
					<div v-for="service in card.services" :key="service.service">
					<div>{{ service.service }}</div>
					<div>{{ service.description }}</div>
				</div>
			</div>
			</div>
			<button class="btn-hire">Contratar</button>

			<div class="questions"></div>
			</div>
			</div>
		</div>
		</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import StarsComponent from '@/components/StarsComponent.vue';

export default {
  components: {
    StarsComponent
  },
  data() {
    return {
      cards: [],
      displayedCards: [],
      cardsForPage: 2
    };
  },
  created() {
    this.loadCardData();
  },
  methods: {
    prevSlide(card) {
      if (card.currentImage >= 3) {
        card.currentImage -= 3;
      } else {
        card.currentImage = card.imagesServices.length - 3;
      }
    },
    nextSlide(card) {
      if (card.currentImage + 3 < card.imagesServices.length) {
        card.currentImage += 3;
      } else {
        card.currentImage = 0;
      }
    },
    loadMoreCards() {
      const startIndex = 0;
      const endIndex = startIndex + this.cardsForPage;
      this.displayedCards = this.cards.slice(startIndex, endIndex);

      this.displayedCards.forEach((card) => {
        card.currentImage = 0;
      });
    },
    visibleImages(card) {
      const startIndex = card.currentImage;
      const endIndex = startIndex + 3;
      return card.imagesServices.slice(startIndex, endIndex);
    },
    loadCardData() {
      axios.get('http://localhost:8081/api/contratar')
        .then(response => {
          this.cards = response.data;
          this.loadMoreCards();
        })
        .catch(error => {
          console.error('Error al cargar los datos de la API:', error);
        });
    }
  }
};
</script>

<style scoped>

.container-fluid {
	background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url('https://raw.githubusercontent.com/rusanchezg/templates-images/main/images/fondo-6.png');
	background-repeat: repeat;
	background-position: center;
}

.card-user {
	background-color: rgba(255, 255, 255, 1);
	font-family:Aleo;
	border-radius: 15px;
	font-size: 20px;
	margin: 20px;
	min-height: 1400px;
}
.profile-photo img{
	border-radius: 50%;
	margin-top: 80px;
	width: 200px; /* Tamaño inicial de la imagen */
  max-width: 100%; /* Se ajustará automáticamente a medida que la pantalla se reduce */
  height: auto;
}
.name {
	margin-top: 20px;
	margin-bottom: 20px;	
	font-size: 22px;
}

.scores {
	margin-top: 20px;
		display: flex;	
	justify-content: space-around;
}
.details {
	box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
		background-color:rgba(255, 255, 250.00000029802322, 1);
		margin: 20px;
		border-radius: 11px;
		width: 90%;
		min-height: 135px;
		align-items: center;
		font-size: 18px;
		
}
ul {
	list-style: none;
}
.job-details {
	align-items: center;
		display: flex;
		flex-direction: column;
		margin: 5px;
		height: 80px;
		width: 120px;
		flex-grow: 1;
		
}
.latest-jobs{
	margin-top: 20px;
	
}
.comment {
	min-height: 80px;
		width: 100%;
		text-align: left;
		padding: 5px;
}

.carousel {
	display: flex;
	align-items: center;
	height: 200px;
}

.carousel-arrow {
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	font-size: 24px;
	padding: 5px;
}

.carousel-images {
	display: flex;
	overflow-x: auto;
}

.carousel-images img {
	width: 250px;
	height: 170px;
	border: 2px solid gray;
	margin: 20px;
}
.services {
	margin-top: 20px;
	font-weight: bolder;
	text-align: right;
	width: 50%;
	display: flex;
	display: block;
}
.services span {
  display: block;
}
.services-results{
	margin-top: 20px;
	margin-left: 5px;
	text-align:left;
	width: 50%;
	min-height: 40px;
}

.btn-hire {
	width: 100px;
    border: 1px solid black;
    border-radius: 5px;
    border-top: none;
    margin: 25px;
    background-color: #78CDD7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
	font-size: 18px;

}

</style>