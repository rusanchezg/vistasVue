<template>
    <div class="container centra">
        <div class="card" style="width:35rem;">
          <div class="card-body">
            <div class="card fondo-card"
                @drop.prevent="onDrop($event)"
                @dragover.prevent="dragOver"
                @dragenter.prevent="dragEnter"
                @dragleave.prevent="dragLeave"
                @click="fireChooser" >
                <i class="fa-solid fa-cloud-arrow-up fa-3x"></i>
                <p class="card-text">Arraste o suelte una imágen en esta área </p>
                <p class="card-text">O haga click para seleccionar una </p>
            </div>
          </div>
          <div class="card-footer">    
            <button class="btn btn-success" @click="saveImage">Guardar</button>
            <button class="btn btn-danger" >Cancelar</button>
          </div>
      
        </div>
       
        <div :class=loader />
        
        <MessageComponent 
            ref="message01" 
            alertType=2
            :cabecera=cabecera
            duration=3000 
            :text=text
            iconType=2
            style="max-width: 600px;" />

            <ModalTest @deleteContent="deleteContentLocal" ref="modal"></ModalTest>

        
            <ImageCropper 
                ref="imgCropper"
                :aspRad=aspRad
                :titulo=titulo
                :apiUrl=apiUrl
                :returnUrl=returnUrl
                @img-error="imgError"
                @procesa-imagen="procesa"
                @cancela-imagen="cancelaImagen"
                @cancela-en-el-hijo="cancelaEnElHijo"
                :class=formato />
        
            <img
                class="croppedImage"
                v-if="profilePicture"
                :src="profilePicture"
                alt="Cropped Image" />
        
                
    </div>
</template>


<script>
import ModalTest from '@/components/ModalTest.vue';
import ImageCropper from '@/components/ImageCropper.vue'


export default {
    
    components: {
        'ModalTest': ModalTest,
        'ImageCropper': ImageCropper,
    },
    data: function() {
        return {
            text: 'Esto sólo es un ejemplo y este texto puede provenir de una propiedad declarada mas abajo',
            cabecera: 'Esto va en el Header',
            selecciona: 0,
            aspRad:1.9,
            titulo: 'consumiendo desde el archivo UploadProfileImagenView.vue',
            apiUrl: 'https://upload.qbits.mx/api/up/upload-profile-photo',
            returnUrl: '/search',
            profilePicture:null,
            formato: 'fondo-card',
            loader: 'no-tiene-css-asociado'
        }
    },
    methods: {
        abre: function() {
            this.$refs.imgCropper.toogleVentana()
        },
        deleteContentLocal: function() {
            console.log('Ejecutar accion de borrado, sea cual vaya a ser con el id: '+this.selecciona+'excepto el 0')
        },
        procesa: function(img, imgBlob) {
            console.log(img + imgBlob)
            this.profilePicture=img
        },
        fireChooser: function() {
            this.$refs.imgCropper.fireChooser();
            //this.$refs.imgCropper.toogleVentana();
        },
        imgError(msg) {
            this.text = msg
            this.$refs.message01.presenta()
            this.formato = 'fondo-card2'
        },
        cancelaImagen() {
            if (!this.croppedSelected) {
                this.imgSelected = false;
            }
        },
        cancelaEnElHijo () {
            this.buttonDisabled=true;
        },
        dragOver () {
            this.formato = 'fondo-card2'
            return false;
        },
        dragEnter () {
            console.log("entrando...")
            return false;
        },
        dragLeave () {
            this.formato = 'fondo-card'
            return false;
        },
        onDrop(event) {
            if(event.dataTransfer.files.length > 1 ){
                this.imgError("Solo se admite un archivo")
                this.formato = 'fondo-card' 
            }else{
                const img = event.dataTransfer.files[0]
                this.$refs.imgCropper.setImageDrag(img)
            }
            return false;
        },
        saveImage() {      
          this.$refs.imgCropper.saveImage()
        }
        
    }
}

</script>

<style scoped>

.centra {
    max-width: 600px;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 200px;
}

.fondo-card {
    background-color: #efefff;
}

.fondo-card2 {
    background-color: #c6c6d7;
}

.croppedImage {
    display: block;
    width: 80%;
    height: auto;
}

.img-user {
    text-align: center;
    padding: 20px;
}

img {
    height: 300px;
    margin: 0 auto;
}

.drag {
    background-color: gray;
    color: white;
}
.container {
    width: 1000px;
}
</style>