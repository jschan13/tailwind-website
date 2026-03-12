module.exports = {
  content: [
    "./*.html",
    "./components/*.html",
    "./js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#1E40AF',
        accent: '#F59E0B',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      spacing: {
        18: '4.5rem'
      }
    }
  },
  plugins: []
}