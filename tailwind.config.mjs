/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        furdu: {
          bg:      '#001520',
          surface: '#002030',
          raised:  '#003248',
          border:  '#004D68',
          teal: {
            DEFAULT: '#00E7C8',
            light:   '#74BBD5',
            dark:    '#36859E',
          },
          coral:   '#FF7800',
          gold:    '#FCD000',
          pink:    '#FF90D0',
          text:    '#e8f8ff',
          muted:   '#74BBD5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, #060e1e 0%, #0a1f3c 50%, #062030 100%)',
        'teal-glow': 'radial-gradient(ellipse at top, rgba(34,211,238,0.15) 0%, transparent 60%)',
      },
      boxShadow: {
        'teal-sm': '0 0 0 1px rgba(34,211,238,0.2)',
        'teal-md': '0 0 20px rgba(34,211,238,0.1), 0 0 0 1px rgba(34,211,238,0.2)',
      },
      typography: ({ theme }) => ({
        furdu: {
          css: {
            '--tw-prose-body':         theme('colors.furdu.text'),
            '--tw-prose-headings':     theme('colors.white'),
            '--tw-prose-bold':         theme('colors.white'),
            '--tw-prose-code':         theme('colors.furdu.teal.light'),
            '--tw-prose-pre-bg':       theme('colors.furdu.surface'),
            '--tw-prose-th-borders':   theme('colors.furdu.border'),
            '--tw-prose-td-borders':   theme('colors.furdu.border'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
