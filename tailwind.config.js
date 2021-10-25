module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: "#111827",
      gray: "#1f2937",
      black: "#000",
      white: "#fff",
      transparent: "transparent",
      primary: "#18a2d9",
      secondary: "#00ffa3",
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
