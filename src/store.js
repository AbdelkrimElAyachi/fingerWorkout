import { defineStore } from "pinia";
import { piniaInstance, soundEnum } from "./globals";

const useSoundStore = defineStore("store", {
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

export { useSoundStore };
