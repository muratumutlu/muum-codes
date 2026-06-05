import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';

const themeOverride = createTheme({
  cursorType: 'pointer',
  primaryColor: 'teal',
  defaultRadius: 'sm',
  fontFamily: 'Share Tech Mono, ui-monospace, monospace',
  headings: {
    fontFamily: 'Pixelify Sans, Share Tech Mono, ui-monospace, monospace',
    fontWeight: '700',
  },
  defaultGradient: {
    from: 'teal.7',
    to: 'lime.4',
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
