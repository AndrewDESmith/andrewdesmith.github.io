/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: false, // Toggle to true when deploying to production.
    content: ["*.html"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
        // navy: "#22252C",
        // mountain: "#3F3250",
        // scrub: "#C0B3A0",

        // Palette 9
        // Primary
        // These are the splashes of color that should appear the most in your UI, and are the ones that determine the overall "look" of the site. Use these for things like primary actions, links, navigation items, icons, accent borders, or text you want to emphasize.
        "light-blue-vivid-050": "#E3F8FF",
        "light-blue-vivid-100": "#B3ECFF",
        "light-blue-vivid-200": "#81DEFD",
        "light-blue-vivid-300": "#5ED0FA",
        "light-blue-vivid-400": "#40C3F7",
        "light-blue-vivid-500": "#2BB0ED",
        "light-blue-vivid-600": "#1992D4",
        "light-blue-vivid-700": "#127FBF",
        "light-blue-vivid-800": "#0B69A3",
        "light-blue-vivid-900": "#035388",

        // Neutrals
        // These are the colors you will use the most and will make up the majority of your UI. Use them for most of your text, backgrounds, and borders, as well as for things like secondary buttons and links.
        "cool-grey-050": "#F5F7FA",
        "cool-grey-100": "#E4E7EB",
        "cool-grey-200": "#CBD2D9",
        "cool-grey-300": "#9AA5B1",
        "cool-grey-400": "#7B8794",
        "cool-grey-500": "#616E7C",
        "cool-grey-600": "#52606D",
        "cool-grey-700": "#3E4C59",
        "cool-grey-800": "#323F4B",
        "cool-grey-900": "#1F2933",

        // Supporting
        // These colors should be used fairly conservatively throughout your UI to avoid overpowering your primary colors. Use them when you need an element to stand out, or to reinforce things like error states or positive trends with the appropriate semantic color.
        "pink-vivid-050": "#FFE3EC",
        "pink-vivid-100": "#FFB8D2",
        "pink-vivid-200": "#FF8CBA",
        "pink-vivid-300": "#F364A2",
        "pink-vivid-400": "#E8368F",
        "pink-vivid-500": "#DA127D",
        "pink-vivid-600": "#BC0A6F",
        "pink-vivid-700": "#A30664",
        "pink-vivid-800": "#870557",
        "pink-vivid-900": "#620042",

        "red-vivid-050": "#FFE3E3",
        "red-vivid-100": "#FFBDBD",
        "red-vivid-200": "#FF9B9B",
        "red-vivid-300": "#F86A6A",
        "red-vivid-400": "#EF4E4E",
        "red-vivid-500": "#E12D39",
        "red-vivid-600": "#CF1124",
        "red-vivid-700": "#AB091E",
        "red-vivid-800": "#8A041A",
        "red-vivid-900": "#610316",

        "yellow-vivid-050": "#FFFBEA",
        "yellow-vivid-100": "#FFF3C4",
        "yellow-vivid-200": "#FCE588",
        "yellow-vivid-300": "#FADB5F",
        "yellow-vivid-400": "#F7C948",
        "yellow-vivid-500": "#F0B429",
        "yellow-vivid-600": "#DE911D",
        "yellow-vivid-700": "#CB6E17",
        "yellow-vivid-800": "#B44D12",
        "yellow-vivid-900": "#8D2B0B",

        "teal-050": "#EFFCF6",
        "teal-100": "#C6F7E2",
        "teal-200": "#8EEDC7",
        "teal-300": "#65D6AD",
        "teal-400": "#3EBD93",
        "teal-500": "#27AB83",
        "teal-600": "#199473",
        "teal-700": "#147D64",
        "teal-800": "#0C6B58",
        "teal-900": "#014D40"
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
        gelasioItalic: ["Gelasio Italic", "serif"]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
