const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      screens: {
        "-sm": { max: "639px" }
      },
      inset: {
        "1/40": "2.5%",
        "1/20": "5%",
        "1/15": "7.5%",
        "1/10": "10%",
        "1/5": "20%",
        "197/400": "49.25%",
        "98/200": "49.5%"
      },
      opacity: {
        98: "0.98"
      },
      animation: {
        "fade-in-title": "fadeInTitle 2s ease forwards",
        "fade-in-title-from-right": "fadeInTitleFromRight 2s ease forwards",
        "fade-in-body": "fadeInBody 2s ease forwards",
        "fade-in-body-from-left": "fadeInBodyFromLeft 2s ease forwards",
        "fade-in-body-from-right": "fadeInBodyFromRight 2s ease forwards",
        "fade-in-navbar-from-right": "fadeInBodyFromRight 1s ease forwards",
        "fade-in-from-left": "fadeInFromLeft 2s ease forwards",
        "fade-in-from-right": "fadeInFromRight 2s ease forwards",
        "fade-in-modal": "fadeInModal 0.75s ease forwards",
        "fade-out-modal": "fadeOutModal 0.75s ease-out forwards"
      },
      keyframes: (theme) => ({
        fadeInTitle: {
          "0%": {
            color: theme("colors.transparent"),
            opacity: 0
          },
          "100%": {
            color: theme("colors.ember.500"),
            opacity: 1
          }
        },
        fadeInTitleFromRight: {
          "0%": {
            color: theme("colors.transparent"),
            opacity: 0,
            position: "relative",
            right: "-100px"
          },
          "100%": {
            color: theme("colors.ember.500"),
            opacity: 1,
            position: "relative",
            right: 0
          }
        },
        fadeInBody: {
          "0%": {
            color: theme("colors.transparent"),
            opacity: 0
          },
          "100%": {
            color: theme("colors.ink.500"),
            opacity: 1
          }
        },
        fadeInBodyFromLeft: {
          "0%": {
            color: theme("colors.transparent"),
            opacity: 0,
            position: "relative",
            left: "-100px"
          },
          "100%": {
            color: theme("colors.ink.500"),
            opacity: 1,
            position: "relative",
            left: 0
          }
        },
        fadeInBodyFromRight: {
          "0%": {
            color: theme("colors.transparent"),
            opacity: 0,
            position: "relative",
            right: "-100px"
          },
          "100%": {
            color: theme("colors.ink.500"),
            opacity: 1,
            position: "relative",
            right: 0
          }
        },
        fadeInModal: {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        },
        fadeOutModal: {
          "0%": {
            opacity: 1
          },
          "100%": {
            opacity: 0
          }
        },
        fadeInFromLeft: {
          "0%": {
            color: theme("colors.transparent"),
            opacity: 0,
            position: "relative",
            left: "-100px"
          },
          "100%": {
            color: theme("colors.ember.500"),
            opacity: 1,
            position: "relative",
            left: 0
          }
        },
        fadeInFromRight: {
          "0%": {
            color: theme("colors.transparent"),
            opacity: 0,
            position: "relative",
            right: "-100px"
          },
          "100%": {
            color: theme("colors.ink.500"),
            opacity: 1,
            position: "relative",
            right: 0
          }
        }
      }),
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
    }
  },
  plugins: [require("tailwindcss-animation-delay")]
};

// Tailwind CSS Animation Delay Plugin:
// animation-delay-none animation-delay: 0s;
// animation-delay-75  animation-delay: 75ms;
// animation-delay-100 animation-delay: 100ms;
// animation-delay-150 animation-delay: 150ms;
// animation-delay-200 animation-delay: 200ms;
// animation-delay-300 animation-delay: 300ms;
// animation-delay-400 animation-delay: 400ms;
// animation-delay-500 animation-delay: 500ms;
// animation-delay-600 animation-delay: 600ms;
// animation-delay-700 animation-delay: 700ms;
// animation-delay-800 animation-delay: 800ms;
// animation-delay-900 animation-delay: 900ms;
// animation-delay-1000  animation-delay: 1000ms;
// animation-delay-1100  animation-delay: 1100ms;
// animation-delay-1200  animation-delay: 1200ms;
// animation-delay-1300  animation-delay: 1300ms;
// animation-delay-1400  animation-delay: 1400ms;
// animation-delay-1500  animation-delay: 1500ms;
// animation-delay-2000  animation-delay: 2000ms;
// animation-delay-3000  animation-delay: 3000ms;
// animation-delay-4000  animation-delay: 4000ms;
// animation-delay-5000  animation-delay: 5000ms;
// animation-delay-6000  animation-delay: 6000ms;
// animation-delay-7000  animation-delay: 7000ms;
// animation-delay-8000  animation-delay: 8000ms;
// animation-delay-9000  animation-delay: 9000ms;
