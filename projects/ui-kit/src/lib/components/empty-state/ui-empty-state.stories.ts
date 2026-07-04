import type { Meta, StoryObj } from '@storybook/angular';
import { UiEmptyStateComponent } from './ui-empty-state.component';

const pawSvg = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
	<path d="M7.5 10.5c1.38 0 2.5-1.57 2.5-3.5S8.88 3.5 7.5 3.5 5 5.07 5 7s1.12 3.5 2.5 3.5Zm9 0C17.88 10.5 19 8.93 19 7s-1.12-3.5-2.5-3.5S14 5.07 14 7s1.12 3.5 2.5 3.5ZM4.5 15C5.88 15 7 13.66 7 12s-1.12-3-2.5-3S2 10.34 2 12s1.12 3 2.5 3Zm15 0c1.38 0 2.5-1.34 2.5-3s-1.12-3-2.5-3S17 10.34 17 12s1.12 3 2.5 3ZM12 12.5c-3.4 0-6.5 3.1-6.5 5.7 0 1.7 1.3 2.3 2.7 2.3 1.2 0 2.2-.7 3.8-.7s2.6.7 3.8.7c1.4 0 2.7-.6 2.7-2.3 0-2.6-3.1-5.7-6.5-5.7Z"/>
</svg>
`;

const meta: Meta<UiEmptyStateComponent> = {
  title: 'Components/Empty State',
  component: UiEmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    iconSvg: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    buttonLabel: { control: 'text' },
    buttonAriaLabel: { control: 'text' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    align: { control: 'radio', options: ['left', 'center', 'right'] },
    variant: { control: 'radio', options: ['default', 'dashed', 'plain'] },
    buttonVariant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline'],
    },
    buttonDisabled: { control: 'boolean' },
    customClass: { control: 'text' },
    buttonClick: {
      action: 'buttonClick',
      table: { category: 'Events' },
    },
  },
};

export default meta;

type Story = StoryObj<UiEmptyStateComponent>;

export const Default: Story = {
  args: {
    icon: '🐾',
    iconSvg: null,
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

export const WithSvgIcon: Story = {
  args: {
    icon: '',
    iconSvg: pawSvg,
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
    icon: '🔎',
    iconSvg: null,
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
    iconSvg: null,
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
    iconSvg: null,
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
    iconSvg: null,
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
