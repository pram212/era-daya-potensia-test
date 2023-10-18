import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import Swal from 'sweetalert2';
window.swal = Swal

const app = createApp(App);
app.use(router);
app.mount('#app');

