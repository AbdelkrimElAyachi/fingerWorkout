/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary":"var(--color-primary)",
        "secondary":"var(--color-secondary)",
        "error":"var(--color-error)",
        "backgroundColor":"var(--color-bg)",
        "textColor":"var(--color-text)",
      }
    },
  },
  plugins: [],
}

