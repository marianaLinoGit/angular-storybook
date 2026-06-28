import type { Meta, StoryObj } from '@storybook/angular';
import { UiSwitchComponent } from './ui-switch.component';

const meta: Meta<UiSwitchComponent> = {
  title: 'Components/Switch',
  component: UiSwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Identificador único do switch.',
    },
    name: {
      control: 'text',
      description: 'Nome do campo enviado em formulários HTML.',
    },
    label: {
      control: 'text',
      description: 'Texto visível associado ao switch.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Texto acessível utilizado quando o switch não possui label visível.',
    },
    checkedLabel: {
      control: 'text',
      description: 'Texto exibido quando o switch está marcado.',
    },
    uncheckedLabel: {
      control: 'text',
      description: 'Texto exibido quando o switch está desmarcado.',
    },
    activeText: {
      control: 'text',
      description:
        'Texto padrão usado para estado ativo quando checkedLabel não é informado.',
    },
    inactiveText: {
      control: 'text',
      description:
        'Texto padrão usado para estado inativo quando uncheckedLabel não é informado.',
    },
    showSideLabels: {
      control: 'boolean',
      description: 'Exibe os labels nas laterais do controle.',
    },
    checkedInput: {
      control: 'boolean',
      name: 'checked',
      description:
        'Estado controlado do switch. Define se o componente inicia marcado ou desmarcado.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita a interação com o switch.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho visual do switch.',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS customizada.',
    },
    checkedChange: {
      action: 'checkedChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando o estado do switch muda.',
    },
  },
};

export default meta;

type Story = StoryObj<UiSwitchComponent>;

export const Default: Story = {
  args: {
    id: 'themeSwitch',
    name: 'themeSwitch',
    label: 'Tema',
    ariaLabel: null,
    checkedLabel: 'Ativado',
    uncheckedLabel: 'Desativado',
    activeText: 'Ativado',
    inactiveText: 'Desativado',
    showSideLabels: false,
    checkedInput: false,
    disabled: false,
    size: 'md',
    customClass: '',
  },
};

export const WithSideLabels: Story = {
  args: {
    ...Default.args,
    showSideLabels: true,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const ThemeSwitcher: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Alternar tema',
    showSideLabels: true,
    uncheckedLabel: '☀️ Light',
    checkedLabel: '🌙 Dark',
    size: 'md',
  },
};

export const WithoutVisibleLabel: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Ativar notificações',
    checkedLabel: 'Ativo',
    uncheckedLabel: 'Inativo',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
