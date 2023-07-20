<template>
    <div class="upload-image-component">
      <h2>{{ titulo }}</h2>
      <div>
        <input type="file" @change="handleFileChange" accept="image/*" />
        <button @click="uploadImage">Subir imagen</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: [ 
      "aspRad",
      "titulo",
      "apiUrl",
      "returnUrl",
    ],
    data() {
      return {
        selectedFile: null
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      saveImage: function () {
        this.loader = 'loader'

          
        let formd = new FormData()
        formd.append("file", this.imageBlob, this.imageBlob.name)


        const headers = {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          jwt: this.jwt,
          idUser: store.state.userData.idUser,
        };
        console.log(this.apiUrl+'--'+formd)

        axios
          .post(this.apiUrl, formd, { headers })
          .then(() => {
            router.push(this.returnUrl);
        })
        .catch((error) => {
          this.resetImage();
          console.log(error.response ? error.response.data.exceptionLongDescription : error)
        });
      },
    }
  };

  </script>
  
  <style scoped>
  .upload-image-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  </style>