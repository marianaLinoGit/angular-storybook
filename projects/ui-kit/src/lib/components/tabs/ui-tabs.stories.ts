import type { Meta, StoryObj } from '@storybook/angular';
import { UiTabsComponent } from './ui-tabs.component';

const meta: Meta<UiTabsComponent> = {
  title: 'Components/Tabs',
  component: UiTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
    },
    initialActiveId: {
      control: 'text',
      description: 'ID da aba ativa inicial.',
    },
    tabChange: {
      action: 'tabChange',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<UiTabsComponent>;

export const Default: Story = {
  args: {
    initialActiveId: 'overview',
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: 'Conteúdo da aba Overview.',
      },
      {
        id: 'details',
        label: 'Detalhes',
        content: 'Conteúdo da aba Detalhes.',
      },
      {
        id: 'settings',
        label: 'Configurações',
        content: 'Conteúdo da aba Configurações.',
      },
    ],
  },
};

export const WithCounts: Story = {
  args: {
    initialActiveId: 'all',
    tabs: [
      {
        id: 'all',
        label: 'Todos',
        count: 24,
        content: 'Todos os itens.',
      },
      {
        id: 'active',
        label: 'Ativos',
        count: 12,
        content: 'Itens ativos.',
      },
      {
        id: 'archived',
        label: 'Arquivados',
        count: 3,
        content: 'Itens arquivados.',
      },
    ],
  },
};

export const StepperLike: Story = {
  args: {
    initialActiveId: 'payment',
    tabs: [
      {
        id: 'account',
        label: 'Conta',
        checked: true,
        content: 'Dados da conta já preenchidos.',
      },
      {
        id: 'profile',
        label: 'Perfil',
        checked: true,
        content: 'Dados do perfil já preenchidos.',
      },
      {
        id: 'payment',
        label: 'Pagamento',
        content: 'Etapa atual de pagamento.',
      },
      {
        id: 'finish',
        label: 'Finalizar',
        disabled: true,
        content: 'Etapa ainda bloqueada.',
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    initialActiveId: 'available',
    tabs: [
      {
        id: 'available',
        label: 'Disponível',
        content: 'Essa aba está disponível.',
      },
      {
        id: 'disabled',
        label: 'Desabilitada',
        disabled: true,
        content: 'Essa aba não pode ser aberta.',
      },
      {
        id: 'other',
        label: 'Outra aba',
        content: 'Outra aba disponível.',
      },
    ],
  },
};

export const InitialDisabledFallback: Story = {
  args: {
    initialActiveId: 'blocked',
    tabs: [
      {
        id: 'blocked',
        label: 'Bloqueada',
        disabled: true,
        content: 'Essa aba não deve abrir inicialmente.',
      },
      {
        id: 'first-available',
        label: 'Primeira disponível',
        content: 'Como a inicial estava desabilitada, esta aba é exibida.',
      },
      {
        id: 'second-available',
        label: 'Segunda disponível',
        content: 'Outra opção disponível.',
      },
    ],
  },
};
