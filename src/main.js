import { createApp } from 'vue';
import Autocomplete from 'vue3-autocomplete';
import App from './App.vue';
import './index.css';

const app = createApp(App);
app.component('Autocomplete', Autocomplete);

app.mount('#app');