/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
};
