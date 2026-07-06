import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',

          'Design Tokens',
          '*',

          'Guidelines',
          '*',

          'Components',
          '*',

          'Layout',
          '*',
        ],
        method: 'alphabetical',
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#f9f4fc' },
        dark: { name: 'dark', value: '#0d0433' },
      },
    },
    test: {
      dangerouslyIgnoreUnhandledErrors: false,
    },
    a11y: {
      // Evita conflito "Axe is already running" com o test-runner.
      test: 'off',
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
