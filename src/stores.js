import { defineStore } from "pinia";
import { piniaInstance, sounds } from "@/globals";
import { auth } from "@/fireabase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';


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
    user: null,
    authIsReady: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isEmailVerified: (state) => state.user?.emailVerified || false
  },

  actions: {
    async initializeAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user;
          this.authIsReady = true;
          console.log(user);
          resolve(user);
        });
      });
    },

    async signUp(email, password) {
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        await this.sendVerificationEmail();
        return userCredential;
      } catch (err) {
        this.error = this.getFirebaseError(err.message);
      }
    },

    async login(email, password) {
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        this.user = userCredential.user;
        return userCredential;
      } catch (err) {
        this.error = this.getFirebaseError(err.message);
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (err) {
        this.error = this.getFirebaseError(err.message);
      }
    },

    async sendVerificationEmail() {
      if (!auth.currentUser) throw new Error('No authenticated user');
      
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (err) {
        this.error = this.getFirebaseError(err.message);
      }
    },


    // In your authStore.js
    getFirebaseError(errorCode) {
      const errorMap = {
        'Firebase: Error (auth/invalid-credential).': 'Invalid email or password',
        'Firebase: Error (auth/invalid-email).': 'Please enter a valid email address',
        'Firebase: Error (auth/user-disabled).': 'This account has been disabled',
        'Firebase: Error (auth/user-not-found).': 'No account found with this email',
        'Firebase: Error (auth/wrong-password).': 'Incorrect password',
        'Firebase: Error (auth/too-many-requests).': 'Too many attempts. Please try again later',
        'Firebase: Error (auth/email-already-in-use).': 'This email is already registered',
        'Firebase: Error (auth/weak-password).': 'Password should be at least 6 characters'
      };
      
      return errorMap[errorCode] || 'An unexpected error occurred. Please try again.';
    },

    clearError() {
      this.error = null;
    }
  }
});

export { useSoundStore, useParameterStore };
