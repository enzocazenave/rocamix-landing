/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'orange-rocamix': '#EC6907',
        'white-rocamix': '#DADADA',
        'black-rocamix': '#191919',
        'orange-2-rocamix': '#FF5722'
      },
      fontFamily: {
        syncopate: 'Syncopate'
      }
    },
  },
  plugins: [],
}