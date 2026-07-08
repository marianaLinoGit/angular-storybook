import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  CornerShapeShowcaseComponent,
  type CornerShapeShowcaseView,
} from './corner-shape-showcase.component';
import type { UiCornerRadiusSize, UiCornerShape } from '../types/ui.types';

const meta: Meta<CornerShapeShowcaseComponent> = {
  title: 'Design Tokens/Corner Shape',
  component: CornerShapeShowcaseComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CornerShapeShowcaseComponent],
    }),
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          padding: var(--ui-space-4);
        }
        `,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens e utilitários para `corner-shape` combinados com `border-radius`. ' +
          'Os exemplos usam caixas roxas sobre fundo xadrez para destacar cada modelo.',
      },
    },
  },
  argTypes: {
    view: {
      control: 'select',
      options: [
        'matrix',
        'by-size',
        'shape',
        'size',
        'cards',
        'tokens',
      ] satisfies CornerShapeShowcaseView[],
      table: { category: 'Visualização' },
    },
    focusShape: {
      control: 'select',
      options: ['round', 'squircle', 'scoop', 'bevel', 'notch'] satisfies UiCornerShape[],
      table: { category: 'Foco' },
    },
    focusSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'] satisfies UiCornerRadiusSize[],
      table: { category: 'Foco' },
    },
  },
};

export default meta;
type Story = StoryObj<CornerShapeShowcaseComponent>;

export const MatrizCompleta: Story = {
  name: 'Matriz completa',
  args: {
    view: 'matrix',
  },
};

export const ComparacaoPorTamanho: Story = {
  name: 'Comparação por tamanho',
  args: {
    view: 'by-size',
  },
};

export const Round: Story = {
  args: {
    view: 'shape',
    focusShape: 'round',
  },
};

export const Squircle: Story = {
  args: {
    view: 'shape',
    focusShape: 'squircle',
  },
};

export const Scoop: Story = {
  args: {
    view: 'shape',
    focusShape: 'scoop',
  },
};

export const Bevel: Story = {
  args: {
    view: 'shape',
    focusShape: 'bevel',
  },
};

export const Notch: Story = {
  args: {
    view: 'shape',
    focusShape: 'notch',
  },
};

export const RadiusSm: Story = {
  name: 'Raio SM',
  args: {
    view: 'size',
    focusSize: 'sm',
  },
};

export const RadiusMd: Story = {
  name: 'Raio MD',
  args: {
    view: 'size',
    focusSize: 'md',
  },
};

export const RadiusLg: Story = {
  name: 'Raio LG',
  args: {
    view: 'size',
    focusSize: 'lg',
  },
};

export const RadiusXl: Story = {
  name: 'Raio XL',
  args: {
    view: 'size',
    focusSize: 'xl',
  },
};

export const UsoEmCard: Story = {
  name: 'Uso em card',
  args: {
    view: 'cards',
  },
};

export const ReferenciaTokens: Story = {
  name: 'Referência de tokens',
  args: {
    view: 'tokens',
  },
};
