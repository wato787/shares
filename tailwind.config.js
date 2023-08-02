module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#55B4B7',
        secondary: '#F5F5F5',
        rent: '#55B4B7',
        gas: '#ff7f50',
        utilities: '#ffd700',
        water: '#00ffff',
        food: '#00ff00',
        miscellaneous: '#ff00ff',
        communication: '#0000ff',
        other: '#000000',
      },
      fontFamily: {
        shares: ['Kablammo'],
      },
    },
  },

  plugins: [],
};
