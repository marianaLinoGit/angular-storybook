import type { Meta, StoryObj } from '@storybook/angular';
import { emptyStatePlaygroundPlay } from '../../storybook/play.helpers';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiEmptyStateComponent } from './ui-empty-state.component';

const playgroundDefaults = {
  iconName: 'info' as const,
  title: 'Nenhum dado encontrado',
  description: 'Crie um novo item para começar.',
  buttonLabel: 'Criar item',
  buttonAriaLabel: 'Criar novo item',
  size: 'md' as const,
  align: 'center' as const,
  variant: 'dashed' as const,
  buttonVariant: 'primary' as const,
  buttonDisabled: false,
  customClass: '',
};

const meta: Meta<UiEmptyStateComponent> = {
  title: 'Components/Empty State',
  component: UiEmptyStateComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|Pets|WithoutButton|Plain|LeftAligned|DisabledAction)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          max-width: 560px;
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
          'Estado vazio para listagens, tabelas e painéis sem dados. Suporta ícone, título, descrição e botão de ação opcional.\n\n' +
          '**Uso:** informe `title` e opcionalmente `description`, `iconName` e `buttonLabel`. Emite `buttonClick` ao clicar no botão.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Título principal exibido no estado vazio.',
    },
    description: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto complementar exibido abaixo do título.',
    },
    buttonLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto do botão de ação. Quando vazio ou `null`, o botão não é exibido.',
    },
    iconName: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Conteúdo' },
      description:
        'Nome do ícone exibido no topo. Usa o componente `ui-icon`. Quando `null`, o ícone não é exibido.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description: 'Tamanho geral do empty state (`sm`, `md`, `lg`).',
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      table: { category: 'Aparência' },
      description: 'Alinhamento horizontal do conteúdo.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'dashed', 'plain'],
      table: { category: 'Aparência' },
      description:
        'Aparência do container: `default` (com borda), `dashed` (tracejada) ou `plain` (sem borda).',
    },
    buttonVariant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline'],
      table: { category: 'Aparência' },
      description: 'Variação visual do botão de ação (`ui-button`).',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao container principal.',
    },
    buttonDisabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita o botão de ação.',
    },
    buttonAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível do botão. Quando vazio, usa o valor de `buttonLabel`.',
    },
    buttonClick: {
      action: 'buttonClick',
      table: { category: 'Events' },
      description: 'Evento emitido ao clicar no botão de ação.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiEmptyStateComponent>;

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
  play: emptyStatePlaygroundPlay,
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Empty state padrão com ícone, descrição e botão de ação.',
      },
    },
  },
  args: { ...playgroundDefaults },
};

export const Pets: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Exemplo contextual para listagem de pets sem registros.',
      },
    },
  },
  args: {
    iconName: 'paw',
    title: 'Nenhum pet encontrado',
    description: 'Cadastre seu primeiro pet para começar o acompanhamento.',
    buttonLabel: '+ Pet',
    buttonAriaLabel: 'Cadastrar novo pet',
    size: 'lg',
    align: 'center',
    variant: 'dashed',
    buttonVariant: 'primary',
    buttonDisabled: false,
    customClass: '',
  },
};

export const WithoutButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado vazio informativo sem call-to-action.',
      },
    },
  },
  args: {
    iconName: 'filter',
    title: 'Nada encontrado',
    description: 'Tente alterar os filtros ou buscar por outro termo.',
    buttonLabel: null,
    buttonAriaLabel: null,
    size: 'md',
    align: 'center',
    variant: 'dashed',
    buttonVariant: 'primary',
    buttonDisabled: false,
    customClass: '',
  },
};

export const Plain: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variante `plain` sem borda, ideal para uso dentro de tabelas ou cards.',
      },
    },
  },
  args: {
    iconName: 'check-circle',
    title: 'Tudo pronto por aqui',
    description: 'Não há nenhuma ação necessária no momento.',
    buttonLabel: null,
    buttonAriaLabel: null,
    size: 'md',
    align: 'center',
    variant: 'plain',
    buttonVariant: 'primary',
    buttonDisabled: false,
    customClass: '',
  },
};

export const LeftAligned: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Conteúdo alinhado à esquerda com botão outline.',
      },
    },
  },
  args: {
    iconName: 'folder',
    title: 'Nenhum arquivo encontrado',
    description: 'Adicione arquivos para visualizar a lista.',
    buttonLabel: 'Adicionar arquivo',
    buttonAriaLabel: 'Adicionar novo arquivo',
    size: 'md',
    align: 'left',
    variant: 'default',
    buttonVariant: 'outline',
    buttonDisabled: false,
    customClass: '',
  },
};

export const DisabledAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Botão de ação presente porém desabilitado.',
      },
    },
  },
  args: {
    iconName: 'lock-blocked',
    title: 'Ação indisponível',
    description: 'Você ainda não possui permissão para criar este item.',
    buttonLabel: 'Criar item',
    buttonAriaLabel: 'Criar novo item',
    size: 'md',
    align: 'center',
    variant: 'dashed',
    buttonVariant: 'primary',
    buttonDisabled: true,
    customClass: '',
  },
};
