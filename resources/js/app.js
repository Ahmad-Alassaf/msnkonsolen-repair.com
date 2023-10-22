import './bootstrap';
import '../sass/app.scss';
import { createApp } from 'vue';
import Router from '@/router';
import store from '@/store';


const app = createApp({});
import VueSweetalert2 from 'vue-sweetalert2';
import * as VueGoogleMaps from "vue3-google-map" 


import 'sweetalert2/dist/sweetalert2.min.css';
import home from '@/components/home.vue'
import msnfooter from './components/layouts/msnfooter.vue'

app.component('home', home);
app.component('msn-footer', msnfooter);


app.use(Router).use(store).use(VueSweetalert2).mount('#app');
