import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/HomeView"
import EjemploView from "@/views/EjemploView"
import SearchView from "@/views/SearchView"
import EjemploModalView from '@/views/EjemploModalView'
import DropCardView from '@/views/DropCardView'
import LoginView from '@/views/LoginView'
import axios from 'axios'
import store from '@/store'
import ForbiddenView from '@/views/ForbiddenView'
import OpinionesView from '@/views/OpinionesView'
import OpinionesHistorialView from '@/views/OpinionesHistorialView'
import OpinionesPendientesView from '@/views/OpinionesPendientesView'
import ContratarView from '@/views/ContratarView'
import PublicacionesPendientesView from '@/views/PublicacionesPendientesView'
import PublicacionView from '@/views/PublicacionView'
import BloquearUsuarioView from '@/views/BloquearUsuarioView'

const routes = [
    {
        path: '/',
        name: "HomeView",
        component: HomeView
    },
    {
        path: '/login',
        name: "LoginView",
        component: LoginView
    },
    {
        path: '/search',
        name: "SearchView",
        component: SearchView
    },
    {
        path: '/ejemplo',
        name: 'EjemploView',
        component: EjemploView
    },
    {
        path: '/ejemploModal',
        name: 'EjemploModalView',
        component: EjemploModalView,
        meta: { allowedRoles: ['admin','REGULAR'] }
    },
    {
        path: '/card',
        name: 'DropCardView',
        component: DropCardView,
        meta: { allowedRoles: ['admin','REGULAR'] }
    },
    {
        path: '/forbidden',
        name: "ForbiddenView",
        component: ForbiddenView
    },
    {
        path: '/opiniones',
        name: "OpinionesView",
        component: OpinionesView
    },
    {
        path: '/historial',
        name: "OpinionesHistorialView",
        component: OpinionesHistorialView
    },
    {
        path: '/pendientes',
        name: "OpinionesPendientesView",
        component: OpinionesPendientesView,
        //meta: { allowedRoles: ['admin','REGULAR'] }
    },
    {
        path: '/contratar',
        name: "ContratarView",
        component: ContratarView,
        //meta: { allowedRoles: ['admin','REGULAR'] }
    },
    {
        path: '/publicaciones/pendientes',
        name: "PublicacionesPendientesView",
        component: PublicacionesPendientesView,
        //meta: { allowedRoles: ['admin','REGULAR'] }
    },
    {
        path: '/publicacion',
        name: "PublicacionView",
        component: PublicacionView,
        //meta: { allowedRoles: ['admin','REGULAR'] }
    },
    {
        path: '/bloquear',
        name: "BloquearUsuarioView",
        component: BloquearUsuarioView,
        //meta: { allowedRoles: ['admin','REGULAR'] }
    }

]

const router = createRouter({ 
    history: createWebHistory(), 
    scrollBehavior: () => ({ y: 0 }),
    routes 
  })
/*
  function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);    
    }).join(''));
    return JSON.parse(jsonPayload);
}
  
function checaJwt() {
    let jwt = store.state.userData.jwt;
    if (jwt && jwt !== undefined && jwt.length > 0) {
        const jwtPayload = parseJwt(jwt);
        let now = new Date();
        let limite = new Date (jwtPayload.creation);
        limite.setMinutes(limite.getMinutes() + 30);
        if(now > limite) {
            store.commit('setUserData', {
                userData: {
                    idUser: 0,
                    nick: 'cyz',
                    email: '',
                    role: '',
                    lastSuccesfullAccess: '',
                    jwt: '',
                    usuarioDetalle: null,           
                },
            });
            store.commit('setDestination', '/');           
        }else {
            //const timeToExpire = jwtPayload.exp - (Date.now()/1000);
        }
    }
}*/

router.beforeEach((to, from, next) => {
    axios.defaults.headers.common = {"X-CSRFToken": store.state.userData.jwt};
    axios.defaults.headers.common = {"jwt": store.state.userData.jwt};
    //checaJwt();
    // VALIDAR EL JWT porque no tiene el valor de expire
    if(to.matched.some(record => record.meta.allowedRoles)) { //El recurso si requiere autenticacion
        // No esta autenticado actualmente:
        if(store.state.userData.jwt === '' || store.state.userData.jwt == undefined) {
            store.commit('setDestination', to.fullPath);
            router.push("/login");
            return;
        }
        // Si estoy autenticado actualmente, asi que solo voy a checar que mi rol es el adecuado:
        if(to.matched.some(ok => !ok.meta.allowedRoles.includes(store.state.userData.role))) {
            router.push('/forbidden');
            return;
        }
    }
    next(); // El recurso no requiere autenticacion
})
  

  export default router
