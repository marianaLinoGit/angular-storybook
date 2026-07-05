import type { Meta, StoryObj } from '@storybook/angular';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiPageTitleComponent } from './ui-page-title.component';

const meta: Meta<UiPageTitleComponent> = {
  title: 'Components/Page Title',
  component: UiPageTitleComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título principal da página.',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo opcional da página.',
    },
    showBack: {
      control: 'boolean',
      description:
        'Exibe o botão de voltar. O ícone é fixo pelo ui-button quando appearance="back".',
    },
    backLabel: {
      control: 'text',
      description: 'Texto do botão de voltar.',
    },
    backAriaLabel: {
      control: 'text',
      description: 'Label acessível do botão de voltar.',
    },
    showAction: {
      control: 'boolean',
      description: 'Exibe o botão de ação principal.',
    },
    actionLabel: {
      control: 'text',
      description: 'Texto do botão de ação principal.',
    },
    actionAriaLabel: {
      control: 'text',
      description: 'Label acessível do botão de ação.',
    },
    actionName: {
      control: 'text',
      description:
        'Nome alternativo da ação. Mantém compatibilidade com o header-page antigo.',
    },
    actionRoute: {
      control: 'object',
      description:
        'Rota padrão executada ao clicar na ação. Pode ser string, array ou null.',
    },
    actionRouteMode: {
      control: 'radio',
      options: ['append', 'absolute'],
      description:
        'Define se a rota textual será anexada à rota atual ou tratada como absoluta.',
    },
    actionIcon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      description: 'Nome do ícone do botão de ação. Usa o componente ui-icon.',
    },
    actionColor: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Cor visual do botão de ação.',
    },
    backClick: {
      action: 'backClick',
      table: {
        category: 'Events',
      },
    },
    actionClick: {
      action: 'actionClick',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<UiPageTitleComponent>;

export const Default: Story = {
  args: {
    title: 'Meus Pets',
    subtitle: 'Central de alertas + gerenciamento',
    showBack: false,
    backLabel: 'Voltar',
    backAriaLabel: 'Voltar para a página anterior',
    showAction: true,
    actionLabel: 'Pet',
    actionAriaLabel: 'Adicionar pet',
    actionIcon: 'plus',
    actionColor: 'primary',
    actionName: '',
    actionRoute: 'new',
    actionRouteMode: 'append',
  },
};

export const WithBack: Story = {
  args: {
    ...Default.args,
    title: 'Editar pet',
    subtitle: 'Atualize os dados principais do cadastro',
    showBack: true,
    showAction: false,
  },
};

export const WithBackAndAction: Story = {
  args: {
    ...Default.args,
    title: 'Dados do pet',
    subtitle: 'Cadastro, foto e informações principais',
    showBack: true,
    showAction: true,
    actionLabel: 'Salvar',
    actionAriaLabel: 'Salvar alterações',
    actionIcon: 'check',
    actionColor: 'primary',
  },
};

export const CompatibleWithOldHeaderPage: Story = {
  args: {
    title: 'Meus Pets',
    subtitle: 'Central de alertas + gerenciamento',
    showBack: false,
    showAction: true,
    actionName: 'Pet',
    actionLabel: '',
    actionRoute: 'new',
    actionRouteMode: 'append',
    actionIcon: 'plus',
    actionColor: 'primary',
  },
};

export const WithoutSubtitle: Story = {
  args: {
    ...Default.args,
    title: 'Configurações',
    subtitle: null,
    showBack: true,
    showAction: false,
  },
};

export const WithoutAction: Story = {
  args: {
    ...Default.args,
    showAction: false,
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'Histórico completo de tratamentos e acompanhamentos',
    subtitle: 'Informações clínicas, alertas e próximos cuidados',
    showBack: true,
    showAction: true,
    actionLabel: 'Novo registro',
    actionAriaLabel: 'Criar novo registro',
    actionIcon: 'plus',
  },
};

export const MobilePreview: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ...Default.args,
    showBack: true,
    showAction: true,
  },
};
