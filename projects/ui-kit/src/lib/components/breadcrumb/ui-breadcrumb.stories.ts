import type { Meta, StoryObj } from '@storybook/angular';
import { UiBreadcrumbComponent } from './ui-breadcrumb.component';

const meta: Meta<UiBreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: UiBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
    },
    homeDisplay: {
      control: 'select',
      options: ['icon', 'text', 'icon-text'],
    },
    showIcons: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<UiBreadcrumbComponent>;

export const Default: Story = {
  args: {
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
