import type { Meta, StoryObj } from '@storybook/angular';
import { tabsPlaygroundPlay } from '../../storybook/play.helpers';
import { UiTabsComponent } from './ui-tabs.component';

const playgroundDefaults = {
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
};

const meta: Meta<UiTabsComponent> = {
  title: 'Components/Tabs',
  component: UiTabsComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|WithCounts|StepperLike|WithDisabled|InitialDisabledFallback)$/,
  argTypes: {
    tabs: {
      control: 'object',
      table: { category: 'Conteúdo' },
      description:
        'Lista de abas. Cada aba deve conter id, label e content. Também pode conter count, checked e disabled.',
    },
    initialActiveId: {
      control: 'text',
      table: { category: 'Estado' },
      description: 'ID da aba ativa inicial.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Texto acessível para identificar o conjunto de abas.',
    },
    tabChange: {
      action: 'tabChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando uma aba é selecionada.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiTabsComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  parameters: {
    docs: {
      description: {
        story: 'Modelo interativo com **todas as opções** disponíveis nos controles.',
      },
    },
  },
  args: { ...playgroundDefaults },
  play: tabsPlaygroundPlay,
};

export const Default: Story = {
  args: { ...playgroundDefaults },
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
