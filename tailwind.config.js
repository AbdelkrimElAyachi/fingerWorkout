/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary":"rgb(var(--color-primary) )",
        "secondary":"rgb(var(--color-secondary) )",
        "error":"rgb(var(--color-error) )",
        "custom-bg":"rgb(var(--color-bg) )",
      }
    },
  },
  plugins: [],
}

