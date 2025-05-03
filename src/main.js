import { createApp } from 'vue'
import { piniaInstance } from "@/globals.js";
import { createRouter, createWebHistory } from 'vue-router'
import '@/style.css'
import routes from '@/routes.js';
import App from '@/App.vue';
import { clickOutside } from '@/globals';
import { useAuthStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(),
  routes,
})




const app = createApp(App);
app.use(router).use(piniaInstance);
const authStore = useAuthStore();
authStore.initializeAuth().then(()=>{
  app.mount('#app');
})


// registre directovie
app.directive('click-outside', clickOutside);