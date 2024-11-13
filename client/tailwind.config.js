/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
