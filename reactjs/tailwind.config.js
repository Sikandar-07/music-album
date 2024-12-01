/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "scrollbar-thumb": "#888", // Thumb color
        "scrollbar-track": "#f1f1f1",
        background: "#ebb734",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
