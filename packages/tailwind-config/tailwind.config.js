/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [
    // Tailwind plugins
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
