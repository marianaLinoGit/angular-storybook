import type { Meta, StoryObj } from '@storybook/angular';
import { iconPlaygroundPlay } from '../../storybook/play.helpers';
import {
  UI_ICON_NAMES,
  UI_ICON_SIZES,
  UiIconComponent,
} from './ui-icon.component';

const playgroundDefaults = {
  name: 'paw' as const,
  size: 'xl' as const,
  label: null as string | null,
  color: null as string | null,
  customSize: null as string | null,
  customClass: '',
};

const meta: Meta<UiIconComponent> = {
  title: 'Components/Icon',
  component: UiIconComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|CustomSize|AllIcons)$/,
  decorators: [
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
          'Ícones SVG do design system. Usa tokens de tamanho (`UI_ICON_SIZES`) e herda cor via `currentColor` ou `color` customizado.\n\n' +
          '**Uso:** informe `name` com um valor de `UI_ICON_NAMES`. Use `label` para ícones informativos; deixe vazio quando decorativo.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: UI_ICON_NAMES,
      table: { category: 'Conteúdo' },
      description: 'Nome do ícone exibido. Deve existir em `UI_ICON_NAMES`.',
    },
    size: {
      control: 'select',
      options: UI_ICON_SIZES,
      table: { category: 'Aparência' },
      description:
        'Tamanho predefinido do ícone (`xs`, `sm`, `md`, `lg`, `xl`). Ignorado quando `customSize` é informado.',
    },
    color: {
      control: 'color',
      table: { category: 'Aparência' },
      description:
        'Cor do ícone via CSS. Aceita valores como `#ff0000` ou tokens (`var(--ui-color-primary)`).',
    },
    customSize: {
      control: 'text',
      table: { category: 'Aparência' },
      description:
        'Tamanho customizado. Aceita qualquer valor CSS válido (ex.: `180px`, `12rem`, `clamp(150px, 20vw, 180px)`).',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao elemento raiz.',
    },
    label: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível para leitores de tela. Quando vazio, o ícone é tratado como decorativo.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiIconComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  parameters: {
    docs: {
      description: {
        story: 'Modelo interativo com **todas as opções** disponíveis nos controles.',
      },
    },
  },
  args: { ...playgroundDefaults },
  play: iconPlaygroundPlay,
};

export const CustomSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Ícone com tamanho customizado e cor primária do design system.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    name: 'logo',
    size: 'md',
    color: 'var(--ui-color-primary)',
    customSize: '180px',
  },
};

export const AllIcons: Story = {
  name: 'Todos os ícones',
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
      description: {
        story: 'Galeria com todos os ícones disponíveis em `UI_ICON_NAMES`.',
      },
    },
  },
  render: () => ({
    props: {
      icons: UI_ICON_NAMES,
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; width: 85%;">
        @for (icon of icons; track icon) {
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #ddd; border-radius: 12px;">
            <ui-icon [name]="icon" size="xl" />
            <code>{{ icon }}</code>
          </div>
        }
      </div>
    `,
  }),
};
