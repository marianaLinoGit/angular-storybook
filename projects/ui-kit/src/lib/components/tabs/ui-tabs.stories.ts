import type { Meta, StoryObj } from '@storybook/angular';
import { UiTabsComponent } from './ui-tabs.component';

const meta: Meta<UiTabsComponent> = {
  title: 'Components/Tabs',
  component: UiTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description:
        'Lista de abas. Cada aba deve conter id, label e content. Também pode conter count, countLabel, checked e disabled.',
    },
    initialActiveId: {
      control: 'text',
      description: 'ID da aba ativa inicial.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Texto acessível para identificar o conjunto de abas.',
    },
    tabChange: {
      action: 'tabChange',
      table: {
        category: 'Events',
      },
      description: 'Evento disparado quando uma aba é selecionada.',
    },
  },
};

export default meta;

type Story = StoryObj<UiTabsComponent>;

export const Default: Story = {
  args: {
    ariaLabel: 'Navegação por abas',
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
    ariaLabel: 'Filtros por status',
    initialActiveId: 'all',
    tabs: [
      {
        id: 'all',
        label: 'Todos',
        count: 24,
        countLabel: '24 itens no total',
        content: 'Todos os itens.',
      },
      {
        id: 'active',
        label: 'Ativos',
        count: 12,
        countLabel: '12 itens ativos',
        content: 'Itens ativos.',
      },
      {
        id: 'archived',
        label: 'Arquivados',
        count: 3,
        countLabel: '3 itens arquivados',
        content: 'Itens arquivados.',
      },
    ],
  },
};

export const StepperLike: Story = {
  args: {
    ariaLabel: 'Etapas do cadastro',
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
    ariaLabel: 'Abas com item desabilitado',
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
    ariaLabel: 'Fallback de aba inicial',
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
