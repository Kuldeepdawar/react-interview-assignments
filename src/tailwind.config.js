/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // include HTML
    "./src/**/*.{js,jsx}", // include all React components
  ],
  theme: {
    extend: {}, // customize theme here (optional)
  },
  plugins: [], // optional plugins (e.g., forms, typography)
};
