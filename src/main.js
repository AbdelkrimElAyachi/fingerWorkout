import { createApp } from 'vue'
import { piniaInstance } from "@/globals.js";
import { createRouter, createWebHistory } from 'vue-router'
import '@/styles/main.css'
import routes from '@/routes.js';
import App from '@/App.vue';
import { clickOutside } from '@/globals.js';
import { useAuthStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

(async function(){

  const authStore = useAuthStore();
  await authStore.initializeAuth();

  const app = createApp(App);
  app.use(router).use(piniaInstance);

  // registre directovie -- keep it before mounting the app no matter what
  app.directive('click-outside', clickOutside);

  app.mount('#app');
  
})();