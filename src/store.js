import { defineStore } from "pinia";
import { piniaInstance, soundEnum } from "./globals";

const useSoundStore = defineStore("store", {
  state: () => ({ sound: 0, soundLevel: 25 }),

  getters: {
    getSound: (state) => state.sound,
    getSoundLevel: (state) => state.soundLevel,
  },

  actions: {
    setSound(ind) {
      this.sound = soundEnum[ind];
    },
    setSoundLevel(value) {
      this.soundLevel = value;
    }
  }
})(piniaInstance);

export { useSoundStore };
