import type { Meta, StoryObj } from '@storybook/angular';
import { EmptyStateComponent } from './ui-empty-state.component';

const meta: Meta<EmptyStateComponent> = {
  title: 'Components/Empty State',
  component: EmptyStateComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<EmptyStateComponent>;

export const Default: Story = {
  args: {
    icon: '📭',
    title: 'Nenhum dado encontrado',
    description: 'Crie um novo item para começar.',
    buttonLabel: 'Criar item',
  },
};

export const WithoutButton: Story = {
  args: {
    icon: '🔎',
    title: 'Nada encontrado',
    description: 'Tente alterar os filtros ou buscar por outro termo.',
    buttonLabel: null,
  },
};
