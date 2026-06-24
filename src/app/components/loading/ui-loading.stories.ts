import type { Meta, StoryObj } from '@storybook/angular';
import { UiLoadingComponent } from './ui-loading.component';

const meta: Meta<UiLoadingComponent> = {
  title: 'Components/Loading',
  component: UiLoadingComponent,
  tags: ['autodocs'],
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
  },
};

export const Dots: Story = {
  args: {
    type: 'dots',
    size: 'lg',
    message: 'Processando...',
    overlay: false,
  },
};

export const SkeletonText: Story = {
  args: {
    type: 'skeleton-text',
    size: 'md',
    message: null,
    overlay: false,
  },
};

export const SkeletonCard: Story = {
  args: {
    type: 'skeleton-card',
    size: 'md',
    message: null,
    overlay: false,
  },
};

export const SkeletonTable: Story = {
  args: {
    type: 'skeleton-table',
    size: 'md',
    message: null,
    overlay: false,
  },
};

export const SkeletonAvatar: Story = {
  args: {
    type: 'skeleton-avatar',
    size: 'md',
    message: null,
    overlay: false,
  },
};
