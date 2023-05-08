/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      LandingBgImg: {
        'BgImg': "url('/assets/img/landing_background.png')"
      },
      colors: {
        littledark: "#0F0C1D",
        dashboard_dark:"#44403c",
        layout_dark: "#0F0C1D",
        dark: "#0F0C1D",
        background: "#27262C",
        btn_color: "#662483",
        transparent: "transparent"
      }
  },
  plugins: [],
}
}