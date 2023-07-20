<template>
    <div class="content">
        <ImageCropper
        class="centra"
        titulo="seleccion de imagen de perfil"
        radio="1"
        apiUrl="https://upload.qbits.mx/api/up/upload-profile-photo"
        returnUrl="localhost:8080/search">

        </ImageCropper>
    </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper';

export default{
    components:{
        ImageCropper
    },
    data: function () {
        return {
            text: '',
            selecciona: 0,
            profilePicture: null,
            imageBlob: null,
            formatDrag:'card-body text-center fondo-drag',
            isDragging: false,
            filename:'',
            show:'card text-start z-indexPositive',
            loader: 'no tiene css asociado'
        }
    }
}

</script>

<style scoped>
.centra{
    max-width: 600px;
    margin: auto;
    padding-top: 10%;
    padding-bottom: 200px;
}

</style>