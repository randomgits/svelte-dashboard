/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        primary: "#005f73",
        secondary: "#0a9396",
        accent: "#94d2bd",
        neutral: "#e9d8a6",
        base: "#ee9b00",
        info: "#ca6702",
        success: "#bb3e03",
        warning: "#ae2012",
        error: "#9b2226",
      },
    },
  },
};
