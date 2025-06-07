import { defineStore } from "pinia";
import { piniaInstance, sounds } from "@/globals";
import { getUser } from "../utils/auth";

// auth store used to store the user auth process
// user : (default : null)
// authIsReady: (default : false)
// erorr: (default : null)
// loading: (default : false)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    name : null,
    email : null,
    picture : null,
    token : null,
    authenticated: false
  }),

  getters: {
    isAuthenticated: (state) => state.authenticated,
    getPicture: (state) => state.picture,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
  },

  actions: {
    async initializeAuth(){
      if(this.user){
        return;
      }
      else{
        const res = await getUser();
        if(res){
          this.name = res.name;
          this.email = res.email;
          this.picture = res.picture;
          this.authenticated = true;
        }
      }
    },

    setUser(user, token) {
      if(token){
        localStorage.setItem("auth_token",token);
      }
      this.name = user?.name;
      this.email = user.email;
      this.picture = user?.picture;
      this.token = token;
      this.authenticated = true;
    },

    clear() {
      this.name = null;
      this.email = null;
      this.picture = null;
      this.authenticated = false;
      this.token = null;
      localStorage.removeItem("auth_token");
    },

  },
});