/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wordle-green': '#6ca965',
        'wordle-yellow': '#c8b653',
        'wordle-grey': '#787c7f',
      }
    },
  },
  plugins: [],
}

