import { defineStore } from "pinia";
import { piniaInstance, soundEnum } from "./globals";

const useSoundStore = defineStore("store", {
  state: () => ({ sound: 0, soundLevel: 25, soundOn: true }),

  getters: {
    getSound: (state) => state.sound,
    getSoundLevel: (state) => state.soundLevel,
    getSoundOn: (state) => state.soundOn,
  },

  actions: {
    setSound(ind) {
      this.sound = soundEnum[ind];
    },
    setSoundLevel(value) {
      this.soundLevel = value;
    },
    setSoundOn(value) {
      this.soundOn = value
    }
  }
})(piniaInstance);

export { useSoundStore };
