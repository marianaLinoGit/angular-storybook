import type { Meta, StoryObj } from '@storybook/angular';
import { UiEmptyStateComponent } from './ui-empty-state.component';

const meta: Meta<UiEmptyStateComponent> = {
  title: 'Components/Empty State',
  component: UiEmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    buttonLabel: { control: 'text' },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'dashed', 'plain'],
    },
    buttonVariant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline'],
    },
    buttonDisabled: {
      control: 'boolean',
    },
    customClass: {
      control: 'text',
    },
    buttonClick: {
      action: 'buttonClick',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<UiEmptyStateComponent>;

export const Default: Story = {
  args: {
    icon: '📭',
    title: 'Nenhum dado encontrado',
    description: 'Crie um novo item para começar.',
    buttonLabel: 'Criar item',
    size: 'md',
    align: 'center',
    variant: 'dashed',
    buttonVariant: 'primary',
    buttonDisabled: false,
    customClass: '',
  },
};

export const WithoutButton: Story = {
  args: {
    icon: '🔎',
    title: 'Nada encontrado',
    description: 'Tente alterar os filtros ou buscar por outro termo.',
    buttonLabel: null,
    size: 'md',
    align: 'center',
    variant: 'dashed',
    buttonVariant: 'primary',
    buttonDisabled: false,
    customClass: '',
  },
};

export const Plain: Story = {
  args: {
    icon: '✨',
    title: 'Tudo pronto por aqui',
    description: 'Não há nenhuma ação necessária no momento.',
    buttonLabel: null,
    size: 'md',
    align: 'center',
    variant: 'plain',
    buttonVariant: 'primary',
    buttonDisabled: false,
    customClass: '',
  },
};

export const LeftAligned: Story = {
  args: {
    icon: '🗂️',
    title: 'Nenhum arquivo encontrado',
    description: 'Adicione arquivos para visualizar a lista.',
    buttonLabel: 'Adicionar arquivo',
    size: 'md',
    align: 'left',
    variant: 'default',
    buttonVariant: 'outline',
    buttonDisabled: false,
    customClass: '',
  },
};

export const DisabledAction: Story = {
  args: {
    icon: '🔒',
    title: 'Ação indisponível',
    description: 'Você ainda não possui permissão para criar este item.',
    buttonLabel: 'Criar item',
    size: 'md',
    align: 'center',
    variant: 'dashed',
    buttonVariant: 'primary',
    buttonDisabled: true,
    customClass: '',
  },
};
