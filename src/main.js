import { createApp } from 'vue';
import App from './App.vue';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import configAxios from './config/axios';

const app = createApp(App);

app.use(configAxios.VueAxios, configAxios.axios);

app.mount('#app');
