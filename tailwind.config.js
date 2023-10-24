/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      minHeight: {
        oneFifth: "20vh",
        oneQuarter: "25vh",
        "one-third": "33.333333vh",
        "one-half": "50vh"
      },
      colors: {
        // From canva.com/learn/website-color-schemes
        // Website color scheme #41
        // Bold feature colors
        // coral: "#E14658",
        coral: {
          50: "#FCEDEF",
          100: "#F9DCDF",
          200: "#F3B4BC",
          300: "#ED919C",
          400: "#E76A78",
          500: "#E14658",
          600: "#CA2134",
          700: "#9A1928",
          800: "#65101A",
          900: "#35090E",
          950: "#1A0407"
        },
        navy: {
          50: "#E8EAED",
          100: "#CED1D9",
          200: "#9DA4B3",
          300: "#6D778D",
          400: "#474D5C",
          500: "#22252C",
          600: "#1B1D23",
          700: "#14161A",
          800: "#0D0F11",
          900: "#070709",
          950: "#040506"
        },
        mountain: {
          50: "#EDE9F1",
          100: "#D8D0E2",
          200: "#B0A1C4",
          300: "#8972A7",
          400: "#634E7E",
          500: "#3F3250",
          600: "#31273F",
          700: "#251D2F",
          800: "#19141F",
          900: "#0C0A10",
          950: "#070609"
        },
        scrub: {
          50: "#F9F8F6",
          100: "#F3F0ED",
          200: "#E7E2DA",
          300: "#D8D1C5",
          400: "#CCC2B2",
          500: "#C0B3A0",
          600: "#A49175",
          700: "#7E6D53",
          800: "#564A39",
          900: "#2B251C",
          950: "#15130E"
        },
        gray: {
          50: "#F7F7F8",
          100: "#EEEFF1",
          200: "#DEDFE3",
          300: "#CACCD3",
          400: "#B9BCC5",
          500: "#A8ACB7",
          600: "#818797",
          700: "#5F6472",
          800: "#41444E",
          900: "#202227",
          950: "#101114"
        },
        // Neon Tones
        void: {
          50: "#E4E0F0",
          100: "#C7BEDF",
          200: "#9281C0",
          300: "#5F4B96",
          400: "#362B55",
          500: "#0E0B16",
          600: "#0B0911",
          700: "#09070E",
          800: "#06050A",
          900: "#020203",
          950: "#020203"
        },
        fuschia: {
          50: "#F5EBFA",
          100: "#ECD7F4",
          200: "#D9AFE9",
          300: "#C686DF",
          400: "#B462D5",
          500: "#A239CA",
          600: "#832CA5",
          700: "#602079",
          800: "#401650",
          900: "#200B28",
          950: "#100514"
        },
        jewel: {
          50: "#ECE6FE",
          100: "#DCD3FD",
          200: "#B5A2FB",
          300: "#9276FA",
          400: "#6B44F8",
          500: "#4717F6",
          600: "#3308CE",
          700: "#27069D",
          800: "#190467",
          900: "#0D0236",
          950: "#060119"
        },
        stark: {
          50: "#FDFCFC",
          100: "#FBF9F9",
          200: "#F4F1F0",
          300: "#F0EBEA",
          400: "#ECE6E4",
          500: "#E7DFDD",
          600: "#C2ADA8",
          700: "#9C7B73",
          800: "#69504A",
          900: "#362926",
          950: "#1B1513"
        },
        // Warm and Bold:
        ink: {
          50: "#DBECFA",
          100: "#B7D8F5",
          200: "#6BAFEA",
          300: "#2488E0",
          400: "#155B98",
          500: "#0B2F4E",
          600: "#09253F",
          700: "#071D31",
          800: "#04131F",
          900: "#030B12",
          950: "#010509"
        },
        posy: {
          50: "#F6EAF3",
          100: "#EBD1E6",
          200: "#D7A2CD",
          300: "#C577B5",
          400: "#AF4B9B",
          500: "#813772",
          600: "#682C5C",
          700: "#4F2246",
          800: "#32152C",
          900: "#190B16",
          950: "#0E060D"
        },
        ember: {
          50: "#FFE7E1",
          100: "#FFCABD",
          200: "#FE9980",
          300: "#FE653E",
          400: "#F93301",
          500: "#B82601",
          600: "#931E01",
          700: "#701701",
          800: "#4C1000",
          900: "#240700",
          950: "#140400"
        }, // Plus black and white.

        lightGray: {
          50: "#FCFCFD",
          100: "#F9FAFB",
          200: "#F3F5F6",
          300: "#EDEFF2",
          400: "#EAEDF0",
          500: "#E4E7EB",
          600: "#B0B9C4",
          700: "#78879B",
          800: "#4E5A69",
          900: "#272D35",
          950: "#14161A"
        }

        // Palette 9
        // Primary
        // These are the splashes of color that should appear the most in your UI, and are the ones that determine the overall "look" of the site. Use these for things like primary actions, links, navigation items, icons, accent borders, or text you want to emphasize.
        // "light-blue-vivid-050": "#E3F8FF",
        // "light-blue-vivid-100": "#B3ECFF",
        // "light-blue-vivid-200": "#81DEFD",
        // "light-blue-vivid-300": "#5ED0FA",
        // "light-blue-vivid-400": "#40C3F7",
        // "light-blue-vivid-500": "#2BB0ED",
        // "light-blue-vivid-600": "#1992D4",
        // "light-blue-vivid-700": "#127FBF",
        // "light-blue-vivid-800": "#0B69A3",
        // "light-blue-vivid-900": "#035388",

        // // Neutrals
        // // These are the colors you will use the most and will make up the majority of your UI. Use them for most of your text, backgrounds, and borders, as well as for things like secondary buttons and links.
        // "cool-grey-050": "#F5F7FA",
        // "cool-grey-100": "#E4E7EB",
        // "cool-grey-200": "#CBD2D9",
        // "cool-grey-300": "#9AA5B1",
        // "cool-grey-400": "#7B8794",
        // "cool-grey-500": "#616E7C",
        // "cool-grey-600": "#52606D",
        // "cool-grey-700": "#3E4C59",
        // "cool-grey-800": "#323F4B",
        // "cool-grey-900": "#1F2933",

        // // Supporting
        // // These colors should be used fairly conservatively throughout your UI to avoid overpowering your primary colors. Use them when you need an element to stand out, or to reinforce things like error states or positive trends with the appropriate semantic color.
        // "pink-vivid-050": "#FFE3EC",
        // "pink-vivid-100": "#FFB8D2",
        // "pink-vivid-200": "#FF8CBA",
        // "pink-vivid-300": "#F364A2",
        // "pink-vivid-400": "#E8368F",
        // "pink-vivid-500": "#DA127D",
        // "pink-vivid-600": "#BC0A6F",
        // "pink-vivid-700": "#A30664",
        // "pink-vivid-800": "#870557",
        // "pink-vivid-900": "#620042",

        // "red-vivid-050": "#FFE3E3",
        // "red-vivid-100": "#FFBDBD",
        // "red-vivid-200": "#FF9B9B",
        // "red-vivid-300": "#F86A6A",
        // "red-vivid-400": "#EF4E4E",
        // "red-vivid-500": "#E12D39",
        // "red-vivid-600": "#CF1124",
        // "red-vivid-700": "#AB091E",
        // "red-vivid-800": "#8A041A",
        // "red-vivid-900": "#610316",

        // "yellow-vivid-050": "#FFFBEA",
        // "yellow-vivid-100": "#FFF3C4",
        // "yellow-vivid-200": "#FCE588",
        // "yellow-vivid-300": "#FADB5F",
        // "yellow-vivid-400": "#F7C948",
        // "yellow-vivid-500": "#F0B429",
        // "yellow-vivid-600": "#DE911D",
        // "yellow-vivid-700": "#CB6E17",
        // "yellow-vivid-800": "#B44D12",
        // "yellow-vivid-900": "#8D2B0B",

        // "teal-050": "#EFFCF6",
        // "teal-100": "#C6F7E2",
        // "teal-200": "#8EEDC7",
        // "teal-300": "#65D6AD",
        // "teal-400": "#3EBD93",
        // "teal-500": "#27AB83",
        // "teal-600": "#199473",
        // "teal-700": "#147D64",
        // "teal-800": "#0C6B58",
        // "teal-900": "#014D40"
      },
      fontFamily: {
        heading: ["Secular One", "sans-serif"],
        body: [
          "Gelasio Regular",
          "ui-serif",
          "system-ui",
          "-apple-system",
          "serif"
        ],
        secularOne: ["Secular One", "sans-serif"],
        gelasio: ["Gelasio Regular", "serif"],
        gelasioMedium: ["Gelasio Medium", "serif"],
        gelasioSemiBold: ["Gelasio SemiBold", "serif"],
        gelasioBold: ["Gelasio Bold", "serif"],
        gelasioItalic: ["Gelasio Italic", "serif"],
        play: ["Play Regular", "sans-serif"],
        playBold: ["Play Bold", "sans-serif"]
      }
      // backgroundImage: {
      //   "hero-pattern": "../images/backgrounds/morphing-diamonds.svg"
      // }
    }
  },
  plugins: []
}
