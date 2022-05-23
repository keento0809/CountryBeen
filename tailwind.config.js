module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // maxWidth: {
    //   320: "320px",
    // },
    height: {
      40: "40px",
      248: "248px",
    },
    extend: {
      width: {
        279: "279px",
      },
      maxWidth: {
        320: "320px",
      },
      minHeight: {
        40: "40px",
      },
      maxHeight: {
        640: "640px",
        780: "780px",
      },
    },
  },
  plugins: [require("daisyui")],
};
