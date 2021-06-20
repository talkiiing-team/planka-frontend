module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      maxHeight: {
        12: '3rem',
      },
      margin: {
        '-18': '-4.5rem',
      },
      zIndex: {
        full: '1000',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      scale: ['focus-within', 'group-focus'],
      textColor: ['active', 'disabled'],
    },
  },
  plugins: [],
}
