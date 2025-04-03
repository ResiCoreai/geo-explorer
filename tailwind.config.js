/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{html,ts,tsx}'],
  important: true,
  theme: {
    fontFamily: {
      sans: ['"Open Sans"'],
      playfair: ["Playfair Display", "serif"], // Add Playfair Display
    },
    extend: {},
  },
  plugins: [],
};
