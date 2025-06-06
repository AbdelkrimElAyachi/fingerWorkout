import { defineStore } from "pinia";
import { piniaInstance, sounds } from "@/globals";


// sound store used to store the parameter of the tests sound effects
// you can find the audio files contains the sounds in public/assets/sounds
// sound : (deafult : 'keyboard')
// sound level : (default : 25 )
export const useSoundStore = defineStore("sound", {
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

