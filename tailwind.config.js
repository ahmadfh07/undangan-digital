/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,css}", "./views/*.ejs", "./views/layout/*.ejs"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      fontFamily: {
        playfair: ["Playfair Display"],
        dancing: ["Dancing Script"],
        poppins: ["Poppins"],
        kufi: ["Reem Kufi Fun"],
        aref: ["Aref Ruqaa Ink"],
        rakkas: ["Rakkas"],
        Inter: ['"Inter"', "sans-serif"],
      },
      colors: {
        biruTua: "#1E3135",
        10: "#F7E3AF",
        30: "#F3EEC3",
      },
      fontSize: {
        xxs: "0.65rem",
      },
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
