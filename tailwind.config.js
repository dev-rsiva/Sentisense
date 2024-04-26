/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ['"Rubik"', ...defaultTheme.fontFamily.sans],
        Roboto: ['"Roboto"', ...defaultTheme.fontFamily.sans],
        segoe: ["Segoe UI", "sans-serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Noto Sans",
          "Ubuntu",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      textColor: {
        custom: "rgb(68, 84, 111)",
      },
      boxShadow: {
        spread: "0 0 10px rgba(68, 84, 111, 0.5)",
      },
    },
  },
  plugins: [],
};
