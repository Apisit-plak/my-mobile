/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")], // เพิ่ม NativeWind Preset
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
