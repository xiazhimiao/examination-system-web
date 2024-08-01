import {createApp} from 'vue'
import App from './App.vue'


//导入element-plus依赖
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router'

import {createPinia} from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'


const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(ElementPlus);
app.mount('#app')