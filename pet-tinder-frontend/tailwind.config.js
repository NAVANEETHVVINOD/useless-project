/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
    
      colors: {
        'brand-yellow': 'rgb(255 224 101)',
        'brand-brown': '#5E3D34',
        'brand-pink-light': '#FADADD',
        'brand-pink-dark': '#F7CAD0',
        'text-dark': '#3D3D3D',
        'text-light': '#6B6B6B',
      },
      fontFamily: {
        heading: ['Lobster', 'cursive'],
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}