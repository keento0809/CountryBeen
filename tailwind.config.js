module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    maxWidth: {
      320: "320px",
    },
    height: {
      40: "40px",
      248: "248px",
    },
    extend: {
      width: {
        279: "279px",
      },
      minHeight: {
        40: "40px",
      },
    },
  },
  plugins: [require("daisyui")],
};
