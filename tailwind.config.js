/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "light-mode": "url('./src/assets/bg.jpeg')",
        "dark-mode": "url('./src/assets/bg.jpeg')",
      },
      colors: {
        littledark: "#0F0C1D",
        dashboard_dark: "#44403c",

        dark: "#0F0C1D",
        background: "#27262C",
        btn_color: "#662483",
        transparent: "transparent",
        icon_color: "#1FC7D4",
      },
    },
    plugins: [],
  },
};
