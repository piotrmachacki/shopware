import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.baseURL = 'https://demo.crehler.dev/store-api/';
axios.defaults.headers = { 'sw-access-key': `${import.meta.env.VITE_SW_ACCESS_KEY}`, 'Content-Type': 'application/json' };

export default { axios, VueAxios };
