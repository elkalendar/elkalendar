/** @type {import('tailwindcss').Config} */
export default {
  content: ["./resources/**/*.blade.php"],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

