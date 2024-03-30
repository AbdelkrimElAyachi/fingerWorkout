import { createApp } from 'vue'
import { createRouter , createMemoryHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// importing views 
import HomeView from "./views/HomeView.vue"
import AboutView from "./views/AboutView.vue"
import ContributeView from "./views/ContributeView.vue"

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/contribute', component: ContributeView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
