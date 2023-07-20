<template>
    <div class="container-fluid">
      <div class="header"></div>
      <div class="body">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-9">
              <h1>Publicaciones Pendientes</h1>
              <div class="card-user justify-content-center">
                <div class="row">
                  <div class="col-3">
                    <div class="profile-photo">
                      <img :src="card.profilePhoto" alt="Foto de perfil" class="img-fluid">
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="data">
                      <div class="speciality">{{ card.specialty }}</div>
                      <div class="name">{{ card.name }}</div>
                      <div class="category">{{ card.category }}</div>
                      <div class="description">{{ card.description }}</div>
                      <div class="services">
                        <ul>
                          <li v-for="service in card.services" :key="service">{{ service }}</li>
                        </ul>
                      </div>
                      <div class="direction">{{ card.direction }}</div>
                    </div>
                  </div>
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
                <button class="btn-accept">Aceptar</button>
                <button class="btn-decline" @click="openModal">Rechazar</button>
                <ModalInput ref="modalInput"></ModalInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import ModalInput from '@/components/ModalMotivoRechazo';

export default {
  data() {
    return {
      card: null,
      showModal: false,
      rejectionReason: ''
    };
  },
  components: {
    ModalInput,
  },
  created() {
    this.loadCardData();
  },
  methods: {
    loadCardData() {
      axios.get('http://localhost:8081/api/admin/publicaciones')
        .then(response => {
          this.card = response.data[0];
          this.card.currentImage = 0;
        })
        .catch(error => {
          console.error('Error al cargar los datos de la API:', error);
        });
    },
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
    visibleImages(card) {
      const startIndex = card.currentImage;
      const endIndex = startIndex + 3;
      return card.imagesServices.slice(startIndex, endIndex);
    },
    openModal() {
      this.$refs.modalInput.show();
    },
  }
};
</script>

  <style scoped>
  .container-fluid {
    background-image:linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url('https://raw.githubusercontent.com/rusanchezg/templates-images/main/images/fondo-6.png');
    background-repeat: repeat;
    background-position: center;
  }
  
  .container {
    box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 1);
    height: 800px;
  }
  
  .profile-photo img {
    border-radius: 50%;
    margin-top: 80px;
    width: 170px;
    max-width: 100%;
    height: auto;
    margin-top: 30px;
  }
  
  .data {
    text-align: left;
    font-family: Aleo;
    border-radius: 15px;
    font-size: 20px;
    margin: 20px;
  }
  
  .data > * {
    margin-top: 10px;
    margin-bottom: 10px;
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
  .btn-accept {
	width: 120px;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;
    border-top: none;
    margin: 45px;
    background-color: #78CDD7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
	font-size: 18px;

}
.btn-decline {
  width: 120px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  border-top: none;
  margin: 45px;
  background-color: #E35F5F;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  font-size: 18px;
  color: white;
}

</style>