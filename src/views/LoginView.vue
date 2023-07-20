<template>
    <div class="container-registro">
        <div class="overlay"></div>
        <h1>Inicio de Sesiòn</h1>
        <div class="register">
            <img src="@/assets/images/logo-big.1250413e.png" alt="logo">
            <br>
            <br>
            <form @submit.prevent="checkCredentials">
            <div class="input-container" >
                <i class="fas fa-envelope"></i>
                <input type="email" v-model="email" name="email" placeholder="ejemplo@correo.com"> 
                <div class="alert" v-if="!validateEmail"> Longitud inválida de correo (mínimo 7 caracters) </div>
            </div>
            <div class="input-container">
                <i class="fas fa-lock"></i>
                <input :type="showPassword ? 'text' : 'password'" v-model="password" name="password" placeholder="contraseña" :class="{'showPasword': showPassword}">
                <div  class="alert" v-if="!validatePassword" > {{ passwordError }}  </div>
                
                <div class="show-eye">
                <i class="fas" :class="{'fa-eye': !showPassword, 'fa-eye-slash': showPassword}" @click="passwordVisibility"></i>
                </div>
            </div>
                <br>
                <button type="submit"  class="btn btn-success"> Entrar </button>
                
            </form>
        </div>
    </div>
</template>


<script>


import axios from 'axios';
import store from '@/store'; 


export default {

    data: function() {
        return { 
            email: "",
            password:"",
            showPassword:false,
            validateEmail:true,
            passwordError:""
        }
    },

    methods: {
        
        passwordVisibility: function() {
            this.showPassword = !this.showPassword;
        },
        checkCredentials: function() {
            axios.post('https://access.qbits.mx/api/login', {
                user: this.email,
                cred: this.password,
            }).then(response => {
                let ud = response.data;
                store.commit("setUserData", ud);
                const target = this.detecta(store.state.userData.role);
                //this.getProfilePhoto(ud.idUser);
                //router.push(target);
                window.location = target;
            }).catch(error => {
                this.errorText = error.response ? error.response.data.exceptionLongDescription : error
                //this.$refs.message01.presenta()
                alert('Error al iniciar sesión vuelve a intentarlo');
            })

        },
        detecta: function(roles) {
            if(store.state.destination.length > 0) {
                let target = store.state.destination;
                store.commit('setDestination', '');
                return target;
            }
            if(typeof roles === 'string') {
                return '/';
            } else {
                for(let i=0; i < roles.length; i++) {
                    switch(roles[i].nombre) {
                        case 'admin': return '/ui/admin'; // rol 1 = administrador
                        case 'user': return '/'; //rol 2 = usuario comun y corriente
                        case 'normal': return '/'; //rol 2 = usuario comun y corriente
                        default: return '/'; // otro rol cualquiera
                    }
                } // ends for cycle with switch inside
            }
        },

    }
}

</script>



<style scoped>

.container-registro {
    display: flex;
    margin-top: -70px;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(@/assets/images/imagenlogin.8a1ba40c.jpg);
    background-position: center center;
    background-size: cover;
    gap: 60px;
}

.overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 99%;
    background-color: rgba(49, 48, 80, 0.841);
    z-index: 0;
}

h1 {
    font-size: 20px;
    color: white;
    position:relative;
    text-align: center;
    margin-top: 120px;
    margin-bottom: -60px;
}

.register{
    color: white;
    align-items: center;
    width: 400px;
    height: 600px;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 30px;
}

.register img {
    position: relative;
    width: 80px;
    height: 150px;
    z-index: 1;
}

.register span{
    position: relative;
    font-size: 14px;
    color: white;
    z-index: 1;
}

.input-container {  
    align-items: center;
    height: 60px;
}

.input-container input{
    color: white;
    border: none;
    border-bottom: 2px solid white;
    padding-left: 30px;
    border-radius: 6px;
    background-color: transparent;
    position: relative;
}

.input-container .alert {
    font-size: 13px;
    color: red;
    font-weight: bold;
    position:relative;
    margin: 0;
    padding: 0;
    height: 20px;
    text-align: center;
    
}

.input-container i {
    position: relative;
    margin-bottom: 10px;
    left: 20px;
    color: white;
}

.input-container input:focus{
    box-shadow: 2px 2px white;
}


.input-container .show-eye {
    position:relative;
    margin: 2px;
    left: 90px;
        
}

button {
    position: relative;
    z-index: 1;
}

</style>