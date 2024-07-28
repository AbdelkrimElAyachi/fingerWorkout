import { createApp } from 'vue'
import { piniaInstance } from "./globals.js";
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from './routes.js';


const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App);
app.use(router).use(piniaInstance).mount("#app");
