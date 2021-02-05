import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue3-use-axios'
import store from '@/store'
import '@/assets/styles/tailwind.css';

createApp(App).use(router).use(VueAxios, axios).use(store).mount('#app')
