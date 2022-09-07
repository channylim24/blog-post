/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    screens: {
      xs: "460px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        "white-transparent-0.7": "rgba(255,255,255,0.7)",
        "black-transparent-0.7": "rgba(0,0,0,0.7)",
        primary: "#707CC0",
      },
    },
  },
  plugins: [],
};
