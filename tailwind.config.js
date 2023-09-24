/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{html,vue}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'sidebar-with-canvas': '200px 1fr',
      }
    },
  },
  plugins: [],
}

