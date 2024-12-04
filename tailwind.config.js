import { colors } from "./src/styles/colors";
import { fonts } from "./src/styles/fonts";


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: fonts,
    },
  },
  plugins: []
};
