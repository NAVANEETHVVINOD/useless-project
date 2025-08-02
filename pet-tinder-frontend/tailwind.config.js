// pet-tinder-frontend/tailwind.config.js

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
        // --- ECOLOGY PALETTE ---
        'brand-primary': '#0A3A1B',      // Rich, dark green for headings & text
        'brand-accent': '#A8DBA8',       // Soft, light green for primary buttons
        'brand-subtle': '#E0EACD',       // Pale green for secondary elements
        'bg-highlight': '#EDF7ED',       // Very light green for backgrounds
        'text-primary': '#212121',       // Dark gray for main text
        'text-secondary': '#6B6B6B',     // Lighter gray for secondary text

        // CHANGE: Removed the brown color
        // 'brand-brown': '#5E3D34',        
      },
      fontFamily: {
        heading: ['Lobster', 'cursive'],
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}