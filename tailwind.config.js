const tailwindforms = require("@tailwindcss/forms");

module.exports = {
  content: ["./*{pages,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindforms],
};
