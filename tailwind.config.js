const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        red: "#ff1e27",
        "red-dark": "#e60000",
        gold: "#ffbe0b",
        "gold-bright": "#ffcc00",
        night: "#080404",
      },
      clipPath: {
        'polygon-sharp': 'polygon(0 4px, 4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)',
        'polygon-sharp-sm': 'polygon(0 3px, 3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%)',
        'polygon-badge': 'polygon(0 15%, 15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
        'polygon-logo': 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)',
        'polygon-card': 'polygon(0 2%, 2% 0, 100% 0, 100% 98%, 98% 100%, 0 100%)',
        'polygon-btn': 'polygon(0 3px, 3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%)',
        'polygon-btn-lg': 'polygon(0 4px, 4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const clipPaths = theme('clipPath');
      const utilities = Object.fromEntries(
        Object.entries(clipPaths).map(([key, value]) => [
          `.clip-path-${key}`, { clipPath: value }
        ])
      );
      addUtilities(utilities);
      
      // Also add polygon variants for compatibility
      addUtilities({
        '.clip-path-polygon\\(0_4px_4px_0_100%_0_100%_calc\\(100%-4px\\)_calc\\(100%-4px\\)_100%_0_100%\\)': {
          clipPath: 'polygon(0 4px, 4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)',
        },
        '.clip-path-polygon\\(0_3px_3px_0_100%_0_100%_calc\\(100%-3px\\)_calc\\(100%-3px\\)_100%_0_100%\\)': {
          clipPath: 'polygon(0 3px, 3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%)',
        },
        '.clip-path-polygon\\(0_15%_15%_0_100%_0_100%_85%_85%_100%_0_100%\\)': {
          clipPath: 'polygon(0 15%, 15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
        },
        '.clip-path-polygon\\(0_0_100%_0_100%_88%_88%_100%_0_100%\\)': {
          clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)',
        },
        '.clip-path-polygon\\(0_2%_2%_0_100%_0_100%_98%_98%_100%_0_100%\\)': {
          clipPath: 'polygon(0 2%, 2% 0, 100% 0, 100% 98%, 98% 100%, 0 100%)',
        },
        '.clip-path-polygon\\(0_0_100%_0_100%_96%_96%_100%_0_100%\\)': {
          clipPath: 'polygon(0 0, 100% 0, 100% 96%, 96% 100%, 0 100%)',
        },
      });
    }),
  ],
};