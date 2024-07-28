import { defineStore } from "pinia";
import { piniaInstance } from "./globals";


const useConfigurationStore = defineStore("configuration", {
  state: () => ({ testDuration: 1, testDifficulty: 8, keyboardLayout: "AZERTY", wordsTheme: "cat" }),

  getters: {
    getTestDuration: (state) => state.testDuration,
    getTestDifficulty: (state) => state.testDifficulty,
    getKeyboardLayout: (state) => state.keyboardLayout,
    getWordsTheme: (state) => state.wordsTheme,
  },

  actions: {
    setTestDuration(durationInMinutes) {
      this.testDuration = durationInMinutes * 60;
    },
    setTestDifficulty(min, max) {
      this.testDifficulty = [min, max];
    },
    setKeyboardLayout(layout) {
      this.keyboardLayout = layout;
    },
    setWordsTheme(theme) {
      this.wordsTheme = theme;
    }
  }
})(piniaInstance);

export { useConfigurationStore };
