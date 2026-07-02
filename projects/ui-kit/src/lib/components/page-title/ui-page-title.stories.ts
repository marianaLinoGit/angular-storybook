import type { Meta, StoryObj } from '@storybook/angular';
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
      description: 'Exibe o botão de voltar.',
    },
    backLabel: {
      control: 'text',
      description: 'Texto do botão de voltar.',
    },
    backAriaLabel: {
      control: 'text',
      description: 'Label acessível do botão de voltar.',
    },
    backIcon: {
      control: 'text',
      description: 'Caminho do ícone SVG usado como máscara.',
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
    actionIcon: {
      control: 'text',
      description: 'Ícone textual do botão de ação.',
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
    backIcon: '/icons/back.svg',
    showAction: true,
    actionLabel: 'Pet',
    actionAriaLabel: 'Adicionar pet',
    actionIcon: '+',
    actionColor: 'primary',
    actionName: '',
    actionRoute: 'new',
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
    actionIcon: '✓',
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
    actionIcon: '+',
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
