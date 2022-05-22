module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    maxWidth: {
      320: "320px",
    },
    height: {
      248: "248px",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
