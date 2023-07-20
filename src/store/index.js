import { createStore } from 'vuex'

// https://www.npmjs.com/package/vuex-persistedstate
import createPersistedState from "vuex-persistedstate"

const store = createStore({
  state: {
    data: {},//No se esta utilizando en este proyecto
    userData:{jwt:'', role:''},
    destination:''
    
  },
  getters: {
    getjwt (state) {
      return state.jwt
    },    
  },
  mutations: {
    setjwt(state, jwt) {
      state.jwt = jwt;
      localStorage.setItem("jwt", JSON.stringify(jwt));
      
    },
    setDestination(state, destination){
      state.destination = destination;
    },

    setUserData(state, datosUsuario) {        
        state.userData = datosUsuario;
    },
    setNombreCompleto(state, nombreCompleto) {
        state.nombreCompleto = nombreCompleto;
    },
  },
  plugins: [createPersistedState()]
})

export default store;