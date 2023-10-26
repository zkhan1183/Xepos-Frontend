import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import '@/mixins/logoutMixin'

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.interceptors.request.use(function (config) {
    if (localStorage.getItem('access_token')) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
});
const app = createApp(App)
app.use(router)
app.mount('#app')