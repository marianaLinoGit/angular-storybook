import type { Meta, StoryObj } from '@storybook/angular';
import { breadcrumbPlaygroundPlay } from '../../storybook/play.helpers';
import type { BreadcrumbItem } from './ui-breadcrumb.component';
import { UiBreadcrumbComponent } from './ui-breadcrumb.component';

const defaultItems: BreadcrumbItem[] = [
  { label: 'Home', icon: 'home', url: '/' },
  { label: 'Componentes', url: '/components' },
  { label: 'Breadcrumb' },
];

const playgroundDefaults = {
  ariaLabel: 'Navegação estrutural',
  separator: '/',
  homeDisplay: 'icon-text' as const,
  showIcons: true,
  items: defaultItems,
};

const meta: Meta<UiBreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: UiBreadcrumbComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Default|HomeIconOnly|WithoutIcons|LongPath|DisabledItem|SingleItem|CustomSeparator)$/,
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
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiBreadcrumbComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  args: { ...playgroundDefaults },
  play: breadcrumbPlaygroundPlay,
};

export const Default: Story = {
  args: { ...playgroundDefaults },
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
        icon: 'home',
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
        icon: 'home',
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
        icon: 'home',
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
        icon: 'home',
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
        icon: 'home',
        url: '/',
      },
      {
        label: 'Design Tokens',
        icon: 'config',
        url: '/design-tokens',
      },
      {
        label: 'Colors',
        icon: 'overview',
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
        icon: 'home',
        url: '/',
      },
      {
        label: 'Componentes',
        icon: 'package',
        url: '/components',
      },
      {
        label: 'Breadcrumb',
        icon: 'link',
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
        icon: 'home',
        url: '/',
      },
      {
        label: 'Área bloqueada',
        icon: 'lock-blocked',
        disabled: true,
      },
      {
        label: 'Página atual',
      },
    ],
  },
};
