import type { Meta, StoryObj } from '@storybook/angular';
import { UiEmptyStateComponent } from './ui-empty-state.component';

const meta: Meta<UiEmptyStateComponent> = {
  title: 'Components/Empty State',
  component: UiEmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description:
        'Ícone exibido acima do conteúdo. Pode ser um emoji, caractere ou ícone textual.',
    },
    title: {
      control: 'text',
      description: 'Título principal do estado vazio.',
    },
    description: {
      control: 'text',
      description: 'Texto descritivo exibido abaixo do título.',
    },
    buttonLabel: {
      control: 'text',
      description:
        'Texto do botão de ação. Quando nulo, o botão não é exibido.',
    },
    buttonAriaLabel: {
      control: 'text',
      description:
        'Texto acessível do botão para leitores de tela. Quando não informado, utiliza o texto do botão.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho visual do componente.',
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: 'Alinhamento horizontal do conteúdo.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'dashed', 'plain'],
      description: 'Variação visual do Empty State.',
    },
    buttonVariant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline'],
      description: 'Estilo visual aplicado ao botão de ação.',
    },
    buttonDisabled: {
      control: 'boolean',
      description: 'Desabilita o botão de ação.',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS customizada.',
    },
    buttonClick: {
      action: 'buttonClick',
      table: {
        category: 'Events',
      },
      description: 'Evento disparado quando o botão de ação é clicado.',
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
    buttonAriaLabel: 'Criar novo item',
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
  args: {
    icon: '✨',
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
  args: {
    icon: '🗂️',
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
  args: {
    icon: '🔒',
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
