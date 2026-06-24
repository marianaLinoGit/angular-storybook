import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from './ui-tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  args: {
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
    ],
  },
};
