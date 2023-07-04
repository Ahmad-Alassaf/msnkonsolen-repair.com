import './bootstrap';
import '../sass/app.scss';
import { createApp } from 'vue';
import Router from '@/router';
import store from '@/store';

const app = createApp({});
import home from '@/components/home.vue'
app.component('home', home);

app.use(Router).use(store).mount('#app');
