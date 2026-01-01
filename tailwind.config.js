/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burger-orange': '#FF6B00',
        'burger-yellow': '#FFC107',
        'burger-red': '#D32F2F',
        'burger-brown': '#5D4037',
        'burger-cream': '#FFF8E1',
      },
    },
  },
  plugins: [],
}
