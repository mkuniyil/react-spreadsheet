/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        26: "repeat(26, 160px)",
      },
    },
  },
  plugins: [],
};
