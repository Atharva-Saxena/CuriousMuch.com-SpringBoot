/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',  // Tailwind red-600
        light: '#ffffff'
      }
    },
  },
  plugins: [],
}
