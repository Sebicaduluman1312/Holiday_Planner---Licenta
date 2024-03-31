/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary-white-blue' : '#C7EEFF',
        'primary-black' : '#1D242B',
        'primary-white' : '#FAFAFA',
        'primary-black-blue' : '#0077C0',
      }
    },
  },
  plugins: [],
}

