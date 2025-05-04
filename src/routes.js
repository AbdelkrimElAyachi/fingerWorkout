// importing views 
import HomeView from "@/views/HomeView.vue"
import ContributeView from "@/views/ContributeView.vue"
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import ProfileView from "@/views/ProfileView.vue";

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon
  { path: '/', component: HomeView },
  { path: '/contribute', component: ContributeView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView},
  { path: '/profile', component: ProfileView},
]

export default routes;
