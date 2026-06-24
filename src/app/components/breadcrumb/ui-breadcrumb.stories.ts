import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbComponent } from './ui-breadcrumb.component';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {
  args: {
    separator: '/',
    items: [
      {
        label: 'Home',
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
    items: [
      {
        label: 'Design System',
        url: '/',
      },
      {
        label: 'Navegação',
        url: '/navigation',
      },
      {
        label: 'Breadcrumb',
      },
    ],
  },
};

export const WithDisabledItem: Story = {
  args: {
    separator: '/',
    items: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Área bloqueada',
        disabled: true,
      },
      {
        label: 'Página atual',
      },
    ],
  },
};
