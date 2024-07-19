/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "light-mode": "url('/assets/img/bg.jpg')",
        "dark-mode": "url('/assets/img/bg.jpg')",
        "standard-gradient":
          "linear-gradient(180deg, rgba(150, 255, 206, 0.2) 0%, rgba(241, 246, 247, 0.2) 100%)",
        "dark-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)",
      },
      backgroundBlendMode: {
        lighten: "lighten",
      },
      boxShadow: {
        light: "0px 14px 64px 0px #c4d8fe",
        dark: "0px 14px 64px 0px #ffffff33",
        containerLight: "0px 0px 24px 0px #C9D8FDB2",
        containerDark: "0px 0px 24px 0px #ffffff33",
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
      backdropBlur: {
        "25px": "25px",
      },
    },
    variants: {
      extend: {
        backgroundBlendMode: ["dark"],
        backdropBlur: ["hover", "focus"],
      },
    },
    plugins: [],
  },
};
