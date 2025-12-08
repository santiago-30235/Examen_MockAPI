import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap 5 JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(router).mount('#app')