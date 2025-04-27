import { createPinia } from "pinia";
export const piniaInstance = createPinia();


export const sounds = [
  "cherryBlue",
  "keyboard",
  "typeSoft",
];

// main.js or directives.js
export const clickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};