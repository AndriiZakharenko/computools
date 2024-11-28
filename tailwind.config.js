import { colors } from "./src/styles/colors";
import { fonts } from "./src/styles/fonts";


/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
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
