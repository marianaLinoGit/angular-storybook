import type { Meta, StoryObj } from '@storybook/angular';
import { UiBreadcrumbComponent } from './ui-breadcrumb.component';

const meta: Meta<UiBreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: UiBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description:
        'Lista de itens do breadcrumb. Cada item pode conter label, icon, url e disabled.',
    },
    separator: {
      control: 'text',
      description: 'Separador exibido entre os itens do breadcrumb.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Texto utilizado por leitores de tela para identificar a navegação estrutural.',
    },
    homeDisplay: {
      control: 'select',
      options: ['icon', 'text', 'icon-text'],
      description:
        'Define se o primeiro item do breadcrumb será exibido apenas com ícone, apenas com texto ou com ícone e texto.',
    },
    showIcons: {
      control: 'boolean',
      description: 'Controla a exibição dos ícones dos itens do breadcrumb.',
    },
    itemClick: {
      action: 'itemClick',
      table: {
        category: 'Events',
      },
      description: 'Evento disparado quando um item navegável é clicado.',
    },
  },
};

export default meta;

type Story = StoryObj<UiBreadcrumbComponent>;

export const Default: Story = {
  args: {
    ariaLabel: 'Navegação estrutural',
    separator: '/',
    homeDisplay: 'icon-text',
    showIcons: true,
    items: [
      {
        label: 'Home',
        icon: '🏠',
        url: '/',
      },
      {
        label: 'Componentes',
        url: '/components',
      },
      {
        label: 'Breadcrumb',
      },
    ],
  },
};

export const HomeIconOnly: Story = {
  args: {
    ariaLabel: 'Navegação estrutural',
    separator: '/',
    homeDisplay: 'icon',
    showIcons: true,
    items: [
      {
        label: 'Home',
        icon: '🏠',
        url: '/',
      },
      {
        label: 'Componentes',
        url: '/components',
      },
      {
        label: 'Breadcrumb',
      },
    ],
  },
};

export const HomeTextOnly: Story = {
  args: {
    ariaLabel: 'Navegação estrutural',
    separator: '/',
    homeDisplay: 'text',
    showIcons: true,
    items: [
      {
        label: 'Home',
        icon: '🏠',
        url: '/',
      },
      {
        label: 'Componentes',
        url: '/components',
      },
      {
        label: 'Breadcrumb',
      },
    ],
  },
};

export const HomeIconAndText: Story = {
  args: {
    ariaLabel: 'Navegação estrutural',
    separator: '/',
    homeDisplay: 'icon-text',
    showIcons: true,
    items: [
      {
        label: 'Home',
        icon: '🏠',
        url: '/',
      },
      {
        label: 'Componentes',
        url: '/components',
      },
      {
        label: 'Breadcrumb',
      },
    ],
  },
};

export const WithCustomSeparator: Story = {
  args: {
    ariaLabel: 'Navegação estrutural',
    separator: '>',
    homeDisplay: 'icon-text',
    showIcons: true,
    items: [
      {
        label: 'Home',
        icon: '🏠',
        url: '/',
      },
      {
        label: 'Design System',
        url: '/design-system',
      },
      {
        label: 'Breadcrumb',
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    ariaLabel: 'Navegação estrutural',
    separator: '/',
    homeDisplay: 'icon-text',
    showIcons: true,
    items: [
      {
        label: 'Home',
        icon: '🏠',
        url: '/',
      },
      {
        label: 'Design Tokens',
        icon: '🎨',
        url: '/design-tokens',
      },
      {
        label: 'Colors',
        icon: '🌈',
      },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    ariaLabel: 'Navegação estrutural',
    separator: '/',
    homeDisplay: 'text',
    showIcons: false,
    items: [
      {
        label: 'Home',
        icon: '🏠',
        url: '/',
      },
      {
        label: 'Componentes',
        icon: '🧩',
        url: '/components',
      },
      {
        label: 'Breadcrumb',
        icon: '📍',
      },
    ],
  },
};

export const WithDisabledItem: Story = {
  args: {
    ariaLabel: 'Navegação estrutural',
    separator: '/',
    homeDisplay: 'icon-text',
    showIcons: true,
    items: [
      {
        label: 'Home',
        icon: '🏠',
        url: '/',
      },
      {
        label: 'Área bloqueada',
        icon: '🔒',
        disabled: true,
      },
      {
        label: 'Página atual',
      },
    ],
  },
};
