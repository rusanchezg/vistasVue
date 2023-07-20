<template>
    <!-- Modal for us to crop the given image -->
    <!-- TODO Make this componente reusable -->
    <div class="modalx-overlay" v-show="muestra">
      <!-- Hidden input file chooser accepting only images. For example: jpg, png, etc-->
      <input
        style="display: contents; background-color: yellow"
        type="file"
        @change="setImage"
        ref="fileInput"
        accept="image/*"
      />
  
      <div class="modalx">
        <div class="modal-headerX">
          <div class="row">
            <div class="col">
              <a href="#" class="modal-header-close" @click="toogleVentana">X</a>
            </div>
          </div>
        </div>
        <div class="img-cropper">
          <!-- Cropper -->
          <vue-cropper
            ref="cropper"
            :src="selectedFile"
            :img-style="{ width: 'auto', height: '266' }"
            :aspectRatio="aspRad"
          >
          </vue-cropper>
          <!-- Toolbox -->
          <div class="container bg-dark2 text-light toolSet">
            <div class="tools">
              <div class="d-flex">
                <div class="icons">
                  <a
                    href="#"
                    @click.prevent="zoom(0.3)"
                    title="zoom in"
                    class="link"
                  >
                    <i class="fa fa-search-plus" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    href="#"
                    @click.prevent="zoom(-0.3)"
                    title="zoom out"
                    class="link"
                  >
                    <i class="fa fa-search-minus" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    href="#"
                    @click.prevent="rotate(45)"
                    title="rotate right"
                    class="link"
                  >
                    <i class="fa fa-redo" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    href="#"
                    @click.prevent="rotate(-45)"
                    title="rotate left"
                    class="link"
                  >
                    <i class="fa fa-undo" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    href="#"
                    @click.prevent="move(-10, 0)"
                    title="move left"
                    class="link"
                  >
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    href="#"
                    @click.prevent="move(10, 0)"
                    title="move right"
                    class="link"
                  >
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    href="#"
                    @click.prevent="move(0, -10)"
                    title="move up"
                    class="link"
                  >
                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    href="#"
                    @click.prevent="move(0, 10)"
                    title="move down"
                    class="link"
                  >
                    <i class="fa fa-arrow-down" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    ref="flipX"
                    href="#"
                    @click.prevent="flipX"
                    title="flip vertical"
                    class="link"
                  >
                    <i class="fas fa-ruler-vertical"></i>
                  </a>
                </div>
                <div class="icons">
                  <a
                    ref="flipY"
                    href="#"
                    @click.prevent="flipY"
                    title="flip horizontal"
                    class="link"
                  >
                    <i class="fas fa-ruler-horizontal"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- Messages -->
          <div class="container justify-content-around p-2 bg-dark3">
            <div class="row">
              <div class="col">
                <small><i class="fas fa-file"></i> {{ fileName }}</small>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <small
                  ><i class="fas fa-ruler"></i>
                  {{ Math.trunc(fileSize / 1024) }} kilo bytes</small
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="button-selec"
              role="button"
              @click="cropImage" >
              Select
            </button>
  
            <button
              type="button"
              class="button-cancel"
              role="button"
              @click="cierraVentana" >
              Cancel
            </button>
  
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import def from "@/assets/images/default.jpg";
  import VueCropper from "vue-cropperjs";
  import "cropperjs/dist/cropper.css";
  import axios from 'axios'
  //import store from '@/store/index'
  import router from '@/Router'

  const png = ['iQ==', 'UA==', 'Tg==', 'Rw==', 'DQ==', 'Cg==', 'Gg==', 'Cg==']
  const jpg = ['/w==', '2A==', '/w==', '4A==', 'AA==', 'EA==', 'Sg==', 'Rg==']
  const jpg2 = ['/w==', '2A==', '/w==', '4Q==', 'Ag==', 'mA==', 'RQ==', 'eA==']
  const webp = ['Ug==', 'SQ==', 'Rg==', 'Rg==', 'pg==', 'jg==', 'AA==', 'AA==']

/** /
  const xls = ['0A==', 'zw==', 'EQ==', '4A==', 'oQ==', 'sQ==', 'Gg==', '4Q==']
  const pdf = ['JQ==', 'UA==', 'RA==', 'Rg==', 'LQ==', 'MQ==', 'Lg==', 'Ng==']
  const xls2 = ['UA==', 'Sw==', 'Aw==', 'BA==', 'FA==', 'AA==', 'Bg==', 'AA==']
/**/
  export default {
    props: [
      "aspRad",
      "titulo",
      "apiUrl",
      "returnUrl"],
    components: {
      VueCropper
    },
    data() {
      return {
        profilePicture: def,
        imageBlob: def,
        selectedFile: def,
        fileName: "",
        fileNameBlob:def,
        fileSize: 0,
        ancho: 366,
        alto: 266,
        muestra: false,
        isImage: false
      };
    },
    methods: {
      invalid(file) {
        let kb = 1024;
        if(kb>1) return false;
        this.fileName = file.name;
        this.fileSize = file.size;
        if (file.size < 16 || file.size > 9000 * kb) {
          const msg = "Sorry, image too small or image too large. Size detected: " + file.size + " bytes"
          this.$emit("img-error", msg)
          return true
        }
      },
      detectaPrimeros8bytesDeUnArchivo: function(reader) {
        var bytes = window.atob(reader.result.split(',')[1]);
        for(var i=0; i<8; i++) {
          console.log(i +'------------>'+window.btoa(bytes[i]))
        }
        console.log('------------------')
      },
      test: function(reader, tipo) {
        this.detectaPrimeros8bytesDeUnArchivo(reader)
        var bytes = window.atob(reader.result.split(',')[1]);
        for(var i=0; i<8; i++) {
          if(window.btoa(bytes[i])!=tipo[i]) {
            return false
          }
        }
        return true
      },
      setImage(e) {     
        const file = e.target.files[0];
        if (this.invalid(file)) {
          console.log('Imagen inválida')
          return
        }
        console.log('Imagen válida')

        this.fileNameBlob= file.name;
        if (typeof FileReader === "function") {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {  
            this.$refs.cropper.replace(e.target.result)
          };
          reader.onloadend = (f) => {
            /** /
            if(this.test(reader, xls)) {
              this.$emit("img-error", "Sorry, an Excel document is not an image file")
              return
            }
            if(this.test(reader, xls2)) {
              this.$emit("img-error", "Sorry, an Excel document is not an image file")
              return
            }
            if(this.test(reader, pdf)) {
              this.$emit("img-error", "Sorry, an PDF document is not an image file")
              return
            }
            /**/
            if(
              !this.test(reader, webp) && 
              !this.test(reader, png) && 
              !this.test(reader, jpg2) &&
              !this.test(reader, jpg))  {
              this.$emit("img-error", "Sorry, this is not an image file")
              return
            }
            
            this.toogleVentana();
            this.selectedFile = f.target.result
          };
        } else {
          this.$emit("img-error", "Sorry, FileReader API not supported")
        }
      },
      setImageDrag(ggg) {
        if (this.invalid(ggg)) {
          return false
        }
        this.fileNameBlob = ggg.name;      
        if (typeof FileReader === "function") {
          const reader = new FileReader()
          reader.readAsDataURL(ggg)
          reader.onload = (eee) => {
            this.$refs.cropper.replace(eee.target.result)
          };
          reader.onloadend = (fff) => {
            this.toogleVentana();
            this.selectedFile = fff.target.result
          };
        } else {
          this.$emit("img-error", "Sorry, FileReader API not supported")
        }
        return true
      },
      fireChooser() {
        this.$refs.fileInput.value = "";
        this.$refs.fileInput.click();
      },
      flipX() {
        const dom = this.$refs.flipX;
        let scale = dom.getAttribute("data-scale");
        scale = scale ? -scale : -1;
        this.$refs.cropper.scaleX(scale);
        dom.setAttribute("data-scale", scale);
      },
      flipY() {
        const dom = this.$refs.flipY;
        let scale = dom.getAttribute("data-scale");
        scale = scale ? -scale : -1;
        this.$refs.cropper.scaleY(scale);
        dom.setAttribute("data-scale", scale);
      },
      rotate(deg) {
        this.$refs.cropper.rotate(deg);
      },
      move(offsetX, offsetY) {
        this.$refs.cropper.move(offsetX, offsetY);
      },
      zoom(percent) {
        this.$refs.cropper.relativeZoom(percent);
      },
      cropImage() {      
        this.profilePicture = this.$refs.cropper
          .getCroppedCanvas()
          .toDataURL("image/jpeg");
        this.$refs.cropper.getCroppedCanvas().toBlob((b) => {
          this.imageBlob = b;
          this.imageBlob.name = this.fileNameBlob;                      
          this.procesaImagen(this.profilePicture, this.imageBlob);
          this.toogleVentana();
        });
      },
      procesaImagen(img, imgBlob) {
        // enviando la imagen al padre:
        this.$emit("procesa-imagen", img, imgBlob);
  
        // pero aqui también se podría simplemente invocar al axios de guardado
        // algo asi como lo siguiente:
        //      let result = uploadComponent.uploadImage('/api/upload', img); // internamente, es un axcios call
        //      if (result.length>0) message(result)
        //console.log(test.pba())
      }, // para este método, podría haber una propiedad que indique si hacer lo primero, lo segundo o ambos
      toogleVentana() {
        // cancelar el procesamiento de la imagen cada vez que la ventana cambie: x = !x
        this.muestra = !this.muestra;
        this.cancelaImagen();      
      },
      cancelaImagen() {      
        this.$emit("cancela-imagen");
      },
      cierraVentana() {
        // cuando la ventana se cierre avisar via el método "cancela-en-el-hijo"
        this.muestra = false;
        this.$emit("cancela-en-el-hijo");    
      },    
      saveImage: function () {
          this.loader = 'loader'

          
          let formd = new FormData()
          formd.append("file", this.imageBlob, this.imageBlob.name)


          const headers = {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc0LCJtYWlsIjoicnViZW5taWNrakBnbWFpbC5jb20iLCJyb2xlIjoiUkVHVUxBUiIsImNyZWF0aW9uIjoxNjg3OTIxNTM4MDA1fQ.jtGZAGCWc6JlZIevFrwDnOkvpv_LgK5dt_KgpxHFYkQ",
            idUser: 74,
          };
          console.log(this.apiUrl+'--'+formd)

          axios
            .post(this.apiUrl, formd, { headers })
            .then(() => {
              this.loader='no-tiene-css-asociado'
              router.push(this.returnUrl);
            })
            .catch((error) => {
              //this.resetImage();
              this.loader='no-tiene-css-asociado'
              console.log(error.response ? error.response.data.exceptionLongDescription : error)
            });
        },
    },
  };
  </script>
  
   <style scoped>
  .close {
    text-align: right !important;
    margin-right: 10px;
  }
  .izquierda {
    text-align: left !important;
    margin-left: 10px;
  }
  .croppedImage {
    display: block;
    width: 200px;
    height: auto;
  }
  #black-label {
    color: #fff;
    font-size: 0.7em;
  }
  .close {
    margin: 10% 0 0 16px;
    cursor: pointer;
  }
  .link {
    color: green;
  }
  .link:hover {
    color: red;
  }
  .bg-dark2 {
    background-color: #ccc;
  }
  .bg-dark3 {
    background-color: #fff;
  }
  .foto {
    position: relative;
    background-color: #ff0000;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    transition: transform 0.2s;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
  .foto:hover {
    transform: scale(1.1);
  }
  .modalx-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
  }
  .modalx {
    background-color: white;
    height: 500px;
    
    margin-top: 10%;
    padding: 10px 0;
    border-radius: 6px;
  }
  .buttonX {
    background-color: #0a0a23;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 3px;
    min-height: 30px;
    min-width: 120px;
    cursor: pointer;
  }
  .buttonX:hover {
    background-color: #002ead;
    transition: 0.7s;
  }
  
  .modal-header-close {
    text-decoration: none;
    font-weight: bold;
    color: #ff0000;
    padding-top: 45px;
  }
  .modal-header-close:hover {
    text-decoration: none;
    color: #ff0000;
  }
  .modal-headerX {
    text-align: right;
    height: 40px;
  }
  .icons {
    margin: 8px;
  }
  
  .button-selec {
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    margin: 10px;
  }
  
  .button-selec:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }
  
  .button-selec:hover {
    background-color: #2c974b;
  }
  
  .button-selec:focus {
    box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
    outline: none;
  }
  
  .button-selec:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, 0.1);
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }
  
  .button-selec:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
  
  .space {
    padding: 8px;
  }
  
  .button-cancel {
    appearance: none;
    background-color: #dc3545;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
  }
  
  .button-cancel:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }
  
  .button-cancel:hover {
    background-color: #dc3545;
  }
  
  .button-cancel:focus {
    box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
    outline: none;
  }
  
  .button-cancel:disabled {
    background-color: #dc3545;
    border-color: rgba(27, 31, 35, 0.1);
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }
  
  .button-cancel:active {
    background-color: #dc3545;
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
  
  .tools {
    display: flex;
    justify-content: center;
  }
  </style>
  