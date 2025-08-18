import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import '@/styles/main.css'
import routes from '@/routes.js';
import App from '@/App.vue';
import { clickOutsideElement } from '@/directives/clickOutsideElement.js';
import { useAuthStore } from '@/stores';
// app store
import { createPinia } from "pinia";
const piniaInstance = createPinia();


const router = createRouter({
  history: createWebHistory(),
  routes,
});

(async function(){
  const app = createApp(App);
  app.use(router);
  app.use(piniaInstance);
  // registre directovie -- keep it before mounting the app no matter what
  app.directive('click-outside', clickOutsideElement);

  const authStore = useAuthStore();
  await authStore.initializeAuth();

  app.mount('#app');
})();
