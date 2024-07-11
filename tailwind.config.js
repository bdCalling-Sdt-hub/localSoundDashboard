/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#57B660",
        secondary: "#CBE8CE",
        btn: "#95C343",
        bgColor: "#CBE8CE40",
        textColor: "#5C5C5C",
      },
    },
  },
  plugins: [],
}

