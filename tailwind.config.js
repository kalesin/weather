module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      height: {
        '5': "5%",
        '10': "10%",
        '20': "20%",
        '30': "30%",
        '40': "40%",
        '50': "50%",
        '60': "60%",
        '70': "70%",
        '80': "80%",
        '90': "90%"
      },
      backgroundColor: {
        main: 'var(--main)',
        sec: 'var(--sec)'
      },
      fontSize: {
        'xxs': '.65rem',
      },
      keyframes: {
        'fade-out': {
          '100%': { opacity: '0' },
          '0%': { opacity: '1' },
        },
        'fade-in': {
          '100%': { opacity: '1' },
          '0%': { opacity: '0' },
        },
      },
      animation: {
       'fade-out': 'fade-out 0.6s ease-in-out both',
       'fade-in': 'fade-out 1.2s ease-in-out both',
      }
    },
  },
  plugins: [],
}
