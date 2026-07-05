import type { Meta, StoryObj } from '@storybook/angular';
import { UiEmptyStateComponent } from './ui-empty-state.component';

const meta: Meta<UiEmptyStateComponent> = {
  title: 'Components/Empty State',
  component: UiEmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: [
        'info',
        'folder',
        'list',
        'filter',
        'lock-blocked',
        'alert',
        'pet',
        'home',
      ],
      description:
        'Nome do ícone exibido no empty state. Usa o componente ui-icon.',
    },
    title: {
      control: 'text',
      description: 'Título principal exibido no estado vazio.',
    },
    description: {
      control: 'text',
      description: 'Texto complementar exibido abaixo do título.',
    },
    buttonLabel: {
      control: 'text',
      description:
        'Texto do botão de ação. Quando vazio, o botão não é exibido.',
    },
    buttonAriaLabel: {
      control: 'text',
      description:
        'Texto acessível do botão. Quando vazio, usa o valor de buttonLabel.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Define o tamanho geral do empty state.',
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: 'Define o alinhamento do conteúdo.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'dashed', 'plain'],
      description: 'Define a aparência visual do container.',
    },
    buttonVariant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline'],
      description: 'Define a variação visual do botão.',
    },
    buttonDisabled: {
      control: 'boolean',
      description: 'Desabilita o botão de ação.',
    },
    customClass: {
      control: 'text',
      description: 'Classe customizada aplicada ao container principal.',
    },
    buttonClick: {
      action: 'buttonClick',
      table: { category: 'Events' },
      description: 'Evento emitido ao clicar no botão.',
    },
  },
};

export default meta;

type Story = StoryObj<UiEmptyStateComponent>;

export const Default: Story = {
  args: {
    iconName: 'info',
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

export const Pets: Story = {
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
