import { createApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// importing views 
import HomeView from "./views/HomeView.vue"
import TrainingView from "./views/TrainingView.vue"
import ContributeView from "./views/ContributeView.vue"

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon
  { path: '/', component: HomeView },
  { path: '/training', component: TrainingView },
  { path: '/contribute', component: ContributeView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
