import type { Meta, StoryObj } from '@storybook/angular';
import { pageTitlePlaygroundPlay } from '../../storybook/play.helpers';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiPageTitleComponent } from './ui-page-title.component';

const playgroundDefaults = {
  title: 'Meus Pets',
  subtitle: 'Central de alertas + gerenciamento',
  showBack: false,
  backLabel: 'Voltar',
  backAriaLabel: 'Voltar para a página anterior',
  showAction: true,
  actionLabel: 'Pet',
  actionAriaLabel: 'Adicionar pet',
  actionIcon: 'plus' as const,
  actionColor: 'primary' as const,
  actionName: '',
  actionRoute: 'new' as string | unknown[] | null,
  actionRouteMode: 'append' as const,
};

const meta: Meta<UiPageTitleComponent> = {
  title: 'Components/Page Title',
  component: UiPageTitleComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|WithBack|WithBackAndAction|CompatibleWithOldHeaderPage|WithoutSubtitle|WithoutAction|LongTitle|MobilePreview)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          padding: var(--ui-space-4);
        }
        `,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Cabeçalho de página com título, subtítulo opcional, botão voltar e ação principal.\n\n' +
          '**Uso:** informe `title`. Configure `showBack` e/ou `showAction` conforme a tela. Emite `backClick` e `actionClick`.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Título principal exibido no cabeçalho da página.',
    },
    subtitle: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Subtítulo opcional exibido abaixo do título. Quando vazio ou `null`, não é renderizado.',
    },
    backLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto do botão voltar exibido ao lado do ícone.',
    },
    actionLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto do botão de ação principal. Quando vazio, usa `actionName` como fallback.',
    },
    actionName: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Nome alternativo da ação. Mantém compatibilidade com o header-page antigo.',
    },
    actionIcon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Conteúdo' },
      description: 'Ícone do botão de ação. Usa o componente `ui-icon`.',
    },
    actionColor: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      table: { category: 'Aparência' },
      description: 'Variação de cor do botão de ação (`ui-button`).',
    },
    actionRoute: {
      control: 'object',
      table: { category: 'Formulário' },
      description:
        'Rota executada ao clicar na ação quando nenhum handler customizado é usado. Aceita string, array ou `null`.',
    },
    actionRouteMode: {
      control: 'radio',
      options: ['append', 'absolute'],
      table: { category: 'Formulário' },
      description:
        'Define se `actionRoute` é anexada à rota atual (`append`) ou tratada como rota absoluta.',
    },
    showBack: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Exibe o botão voltar com preset `back` do `ui-button`.',
    },
    showAction: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe o botão de ação principal à direita do cabeçalho.',
    },
    backAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Texto acessível do botão voltar.',
    },
    actionAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível do botão de ação. Quando vazio, usa o label resolvido.',
    },
    backClick: {
      action: 'backClick',
      table: { category: 'Events' },
      description: 'Evento disparado ao clicar no botão voltar.',
    },
    actionClick: {
      action: 'actionClick',
      table: { category: 'Events' },
      description: 'Evento disparado ao clicar no botão de ação.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiPageTitleComponent>;

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
  play: pageTitlePlaygroundPlay,
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cabeçalho padrão com título, subtítulo e botão de ação.',
      },
    },
  },
  args: { ...playgroundDefaults },
};

export const WithBack: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Página interna com botão voltar e sem ação principal.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    title: 'Editar pet',
    subtitle: 'Atualize os dados principais do cadastro',
    showBack: true,
    showAction: false,
  },
};

export const WithBackAndAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cabeçalho completo com voltar e ação de salvar.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    title: 'Dados do pet',
    subtitle: 'Cadastro, foto e informações principais',
    showBack: true,
    showAction: true,
    actionLabel: 'Salvar',
    actionAriaLabel: 'Salvar alterações',
    actionIcon: 'check',
  },
};

export const CompatibleWithOldHeaderPage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compatibilidade com o header-page antigo usando `actionName` e `actionRoute`.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    showBack: false,
    showAction: true,
    actionName: 'Pet',
    actionLabel: '',
    actionRoute: 'new',
    actionRouteMode: 'append',
  },
};

export const WithoutSubtitle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cabeçalho apenas com título, sem subtítulo.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    title: 'Configurações',
    subtitle: null,
    showBack: true,
    showAction: false,
  },
};

export const WithoutAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Listagem ou página informativa sem botão de ação.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    showAction: false,
  },
};

export const LongTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Título e subtítulo longos para validar quebra de linha e layout.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
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
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Visualização mobile com voltar e ação ativos.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    showBack: true,
    showAction: true,
  },
};
