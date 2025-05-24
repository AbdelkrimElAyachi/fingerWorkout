import { defineStore } from "pinia";
import { piniaInstance, sounds } from "@/globals";
import { getUser } from "./utils/auth";
import { markRaw, toRaw } from "vue";


// sound store used to store the parameter of the tests sound effects
// you can find the audio files contains the sounds in public/assets/sounds
// sound : (deafult : 'keyboard')
// sound level : (default : 25 )
const useSoundStore = defineStore("sound", {
  state: () => ({ sound: "keyboard", soundLevel: 25 }),

  getters: {
    getSound: (state) => state.sound,
    getSoundLevel: (state) => state.soundLevel,
  },

  actions: {
    setSound(value) {
      this.sound = value;
    },
    setSoundLevel(value) {
      this.soundLevel = value;
    }
  }
})(piniaInstance);

// parameter store used to store the tests parameter
// duration : (default : 1)
const useParameterStore = defineStore("parameter", {
  state: () => ({ duration : 1 }),

  getters: {
    getDuration: (state) => state.duration,
  },

  actions: {
    setDuration(value) {
      this.duration = value;
    }
  }
})(piniaInstance);


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
      localStorage.setItem("auth_token",token);
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

export { useSoundStore, useParameterStore };
