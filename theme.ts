import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';

const themeOverride = createTheme({
  cursorType: 'pointer',
  primaryColor: 'blue',
  defaultRadius: 'sm',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Arial, sans-serif',
  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, SF Pro Display, Helvetica Neue, Arial, sans-serif',
    fontWeight: '750',
  },
  defaultGradient: {
    from: 'blue.6',
    to: 'indigo.5',
    deg: 90,
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Card: {
      defaultProps: {
        radius: 'sm',
      },
    },
  },
});
export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
