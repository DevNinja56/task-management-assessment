/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C3E5D",
        secondary: "#334151",
        gray: "#919CA7",
        lightBlue: "#394B6A",
        lightBlack: "#3A3A3A",
      },
    },
  },
  plugins: [],
};
