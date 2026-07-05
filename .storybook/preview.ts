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
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'dark', value: '#101320' },
      ],
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
};

export default preview;
