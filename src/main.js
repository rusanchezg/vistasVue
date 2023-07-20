import { createApp } from 'vue'
import App from './App.vue'
import router from '@/Router/index'
import SkillsComponent from '@/components/SkillsComponent'
import MessageComponent from '@/components/MessageComponent'
import store from '@/store'

const app = createApp(App);
app
.component('SkillsComponent', SkillsComponent)
.component('MessageComponent', MessageComponent)
.use(router)
.use(store)
.mount('#app')
