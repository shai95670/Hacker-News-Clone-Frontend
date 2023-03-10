/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      'sm': {'max': '670px'}
    },
    extend: {
      'margin-left': {
        '1.6rem': '1.6rem',
      }
    },
  },
  plugins: [],
}
