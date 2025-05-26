import { createPinia } from "pinia";
export const piniaInstance = createPinia();
export const api_url = import.meta.env.VITE_API_URL;

export const sounds = [
  "cherryBlue",
  "keyboard",
  "typeSoft",
];

// function to check if user click outside an element
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