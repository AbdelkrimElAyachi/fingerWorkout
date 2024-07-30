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

export default routes;
