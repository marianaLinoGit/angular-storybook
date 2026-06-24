import type { Meta, StoryObj } from '@storybook/angular';
import { UiLoadingComponent } from './ui-loading.component';

const meta: Meta<UiLoadingComponent> = {
  title: 'Components/Loading',
  component: UiLoadingComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'spinner',
        'dots',
        'skeleton-text',
        'skeleton-card',
        'skeleton-table',
        'skeleton-avatar',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    message: {
      control: 'text',
    },
    overlay: {
      control: 'boolean',
    },
    ariaLabel: {
      control: 'text',
      description: 'Texto anunciado por leitores de tela.',
    },
  },
};

export default meta;

type Story = StoryObj<UiLoadingComponent>;

export const Spinner: Story = {
  args: {
    type: 'spinner',
    size: 'md',
    message: 'Carregando...',
    overlay: false,
    ariaLabel: 'Carregando conteúdo',
  },
};

export const Dots: Story = {
  args: {
    type: 'dots',
    size: 'lg',
    message: 'Processando...',
    overlay: false,
    ariaLabel: 'Processando solicitação',
  },
};

export const SkeletonText: Story = {
  args: {
    type: 'skeleton-text',
    size: 'md',
    message: null,
    overlay: false,
    ariaLabel: 'Carregando texto',
  },
};

export const SkeletonCard: Story = {
  args: {
    type: 'skeleton-card',
    size: 'md',
    message: null,
    overlay: false,
    ariaLabel: 'Carregando card',
  },
};

export const SkeletonTable: Story = {
  args: {
    type: 'skeleton-table',
    size: 'md',
    message: null,
    overlay: false,
    ariaLabel: 'Carregando tabela',
  },
};

export const SkeletonAvatar: Story = {
  args: {
    type: 'skeleton-avatar',
    size: 'md',
    message: null,
    overlay: false,
    ariaLabel: 'Carregando perfil',
  },
};

export const Overlay: Story = {
  args: {
    type: 'spinner',
    size: 'lg',
    message: 'Carregando página...',
    overlay: true,
    ariaLabel: 'Carregando página',
  },
};
