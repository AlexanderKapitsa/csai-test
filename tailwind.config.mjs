import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    'lg:w-[272px]',
    'lg:w-[252px]',
    'lg:w-[220px]',
    'lg:h-[290px]',
    'lg:h-[260px]',
    'w-[144px]',
    'w-[160px]',
    'w-[120px]',
    'w-[100px]',
    'h-[144px]',
    'lg:min-w-[250px]',
    'lg:w-[340px]',
    'lg:h-[430px]',
    'lg:w-[250px]',
    'w-[160px]',
    'h-[220px]',
    'md:w-[200px]',
    'md:h-[270px]',
    'lap:w-[260px]',
    'lap:h-[330px]',
    'xl:w-[300px]',
    'xl:h-[390px]',
    'lg:w-[340px]',
    'lg:h-[430px]',
    'w-[125px]',
    'h-[154px]',
    'md:w-[220px]',
    'md:h-[270px]',
    'lap:w-[300px]',
    'lap:h-[390px]',
    'xl:w-[340px]',
    'xl:h-[460px]',
    'lg:w-[387px]',
    'lg:h-[512px]',
    'md:w-[200px]',
    'md:h-[210px]',
    'lap:w-[220px]',
    'lap:h-[230px]',
    'xl:w-[260px]',
    'xl:h-[275px]',
    'xl:w-[200px]',
    'xl:h-[240px]',
    'md:w-[140px]',
    'md:h-[160px]',
    'w-[280px]',
    'md:w-[380px]',
    'md:h-[440px]',
    'lap:w-[480px]',
    'lap:h-[460px]',
    'xl:w-[500px]',
    'xl:h-[480px]',
    'lg:w-[720px]',
    'lg:h-[504px]',
    'w-[100px]',
    'h-0.5',
    'h-[100px]',
    'h-[120px]',
    'h-[220px]',
    'h-[100px]',
    'bg-primary-dark',
    'bg-secondary-400-dark',
    'dark:bg-primary-dark',
    'bottom-36',
    'bg-secondary-400-light',
    'dark:bg-primary-dark',
    'dark:text-primary-light',
    'dark:border-primary-light',
    'text-accent-700-light',
    'max-lg:text-sm',
    'lg:text-xl',
    'lg:text-2xl',
    'lg:text-3xl',
    'hover:underline',
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '768px', //планшет
      lap: '1024px', //ноутбук
      xl: '1280px', //ноутбук з екраном побільше
      lg: '1440px',
    },
    container: {
      center: true,
      padding: {
        sm: '24px',
        md: '32px', //планшет
        lap: '40px', //ноутбук
        xl: '48px', //ноутбук з екраном побільше
        lg: '64px',
      },
      screens: {
        sm: '360px',
        md: '768px', //планшет
        lap: '1024px', //ноутбук
        xl: '1280px', //ноутбук з екраном побільше
        lg: '1440px',
      },
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            table: {
              margin: '0',
            },
            ol: {
              whiteSpace: 'normal',
            },
            ul: {
              whiteSpace: 'normal',
            },
            picture: {
              marginBlock: '0 !important',
            },
            li: {
              '&::marker': {
                color: theme('colors.secondary.300.dark'),
              },
              '.dark &::marker': {
                color: theme('colors.primary.dark'),
              },
            },
            blockquote: {
              '& > p': {
                margin: 0,
              },
              '&': {
                borderLeftColor: theme('colors.secondary.300.dark'),
              },
              '.dark &': {
                borderLeftColor: theme('colors.primary.dark'),
              },
            },
          },
        },
      }),
      colors: {
        'accent-700-light': '#4771fe',
        background: {
          dark: '#0d1014',
          light: '#fffff4',
        },
        primary: {
          dark: '#0abcde',
          light: '#000000',
        },
        secondary: {
          300: {
            dark: '#4771fe',
            light: '#ffde59',
          },
          400: {
            dark: '#1f4bdf',
            light: '#ffde59',
          },
          700: {
            dark: '#00306e',
            light: '#ffde59',
          },
        },
        accent: {
          300: { dark: '#232931', light: '#fffff4' },
          700: {
            dark: '#181e26',
            light: '#4771fe',
          },
        },
      },
      fontSize: {
        subtitle: '18px',
        'subtitle-lg': '64px',
      },
      borderRadius: {
        md: '20px',
      },
      fontFamily: {
        sans: ['Jura', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
