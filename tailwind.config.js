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
        258: "258px",
        279: "279px",
      },
      minWidth: {
        300: "300px",
        400: "400px",
      },
      maxWidth: {
        258: "258px",
        310: "310px",
        320: "320px",
        340: "340px",
        374: "374px",
        400: "400px",
        780: "780px",
        960: "960px",
      },
      minHeight: {
        40: "40px",
        56: "56px",
        100: "100px",
      },
      maxHeight: {
        32: "32px",
        264: "264px",
        640: "640px",
        680: "680px",
        780: "780px",
        860: "860px",
      },
    },
  },
  plugins: [require("daisyui")],
};
