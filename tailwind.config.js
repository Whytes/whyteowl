module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      animation: {
        drive: 'drive 0.5s cubic-bezier(0.4,0.0,0.2,1)',
      },
      keyframes: {
        drive: {
          '0%': { transform: 'translateX(0)' },
          '30%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      colors: {
        // Main background
        background: '#0f1419',
        // Card/panel backgrounds
        surface: '#1e2329',
        // Header/nav background
        surfaceElevated: '#2a2f36',
        // Primary accent color
        accent: '#3b82f6',
        // Text colors
        textPrimary: '#ffffff',
        textSecondary: '#9ca3af',
        textMuted: '#6b7280',
        // Border color
        border: '#374151',
        // Interactive states
        hover: '#1d4ed8',
        active: '#2563eb',
      },
      boxShadow: {
        'xl-glass': '0 8px 32px 0 rgba(31, 41, 55, 0.25)',
        'card': '0 4px 16px 0 rgba(16, 24, 40, 0.10)',
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
