// tailwind.config.js
export const theme = {
  extend: {
    fontFamily: {
      heading: ['Anton', 'sans-serif'],
      body: ['Montserrat', 'sans-serif'],
    },
    borderColor: {
      border: 'var(--border)', // Supports border-border (from previous fix)
    },
    backgroundColor: {
      background: 'hsl(var(--background))', // Supports bg-background
    },
    textColor: {
      foreground: 'hsl(var(--foreground))', // Supports text-foreground
    },
    transitionProperty: {
      all: 'all', // Ensures transitions work
    },
  },
  safelist: [
    'hover:from-blue-700',
    'hover:to-blue-800',
    'hover:shadow-xl',
    'hover:scale-105',
    'focus:ring-blue-500',
    'focus:ring-offset-2',
  ],
};
export const plugins = [];