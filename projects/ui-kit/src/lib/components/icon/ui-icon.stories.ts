import type { Meta, StoryObj } from '@storybook/angular';
import {
  UI_ICON_NAMES,
  UI_ICON_SIZES,
  UiIconComponent,
} from './ui-icon.component';

const meta: Meta<UiIconComponent> = {
  title: 'Components/Icon',
  component: UiIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: UI_ICON_NAMES,
      description: 'Define qual ícone será exibido.',
    },
    size: {
      control: 'select',
      options: UI_ICON_SIZES,
      description: 'Define o tamanho visual do ícone.',
    },
    label: {
      control: 'text',
      description:
        'Texto acessível para leitores de tela. Quando vazio, o ícone é decorativo.',
    },
    color: {
      control: 'color',
      description: 'Define a cor do ícone via CSS color/currentColor.',
    },
    customSize: {
      control: 'text',
      description:
        'Define um tamanho customizado para o ícone. Aceita qualquer valor CSS válido (ex.: 180px, 12rem, clamp(150px, 20vw, 180px), calc(100px + 2vw)).',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS adicional para customizações específicas.',
    },
  },
};

export default meta;

type Story = StoryObj<UiIconComponent>;

export const Playground: Story = {
  args: {
    name: 'paw',
    size: 'xl',
    label: null,
    customClass: '',
  },
};

export const CustomSize: Story = {
  args: {
    name: 'logo',
    label: null,
    color: 'var(--ui-color-primary)',
    customSize: '180px',
    customClass: '',
  },
};

export const AllIcons: Story = {
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
