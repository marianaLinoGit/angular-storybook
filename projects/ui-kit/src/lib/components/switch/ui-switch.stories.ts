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
    checkedIcon: {
      control: 'text',
      description: 'Ícone exibido quando o switch está ativo.',
    },
    uncheckedIcon: {
      control: 'text',
      description: 'Ícone exibido quando o switch está inativo.',
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
      description: 'Exibe labels/ícones nas laterais do controle.',
    },
    showStatus: {
      control: 'boolean',
      description:
        'Exibe texto de status ao lado do switch quando showSideLabels está falso.',
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
    checkedIcon: null,
    uncheckedIcon: null,
    activeText: 'Ativado',
    inactiveText: 'Desativado',
    showSideLabels: false,
    showStatus: true,
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
    showStatus: false,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
  },
};

export const WithoutSideLabels: Story = {
  args: {
    ...Default.args,
    label: '',
    showSideLabels: false,
    showStatus: true,
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
    showStatus: false,
    uncheckedLabel: '☀️ Light',
    checkedLabel: '🌙 Dark',
    checkedIcon: null,
    uncheckedIcon: null,
    size: 'md',
  },
};

export const ThemeSwitcherIconsAndText: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Alternar tema',
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
    uncheckedIcon: '/icons/icon-sun.svg',
    checkedIcon: '/icons/icon-moon.svg',
    size: 'md',
  },
};

export const ThemeSwitcherIconsOnly: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Alternar tema',
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: null,
    checkedLabel: null,
    uncheckedIcon: '/icons/icon-sun.svg',
    checkedIcon: '/icons/icon-moon.svg',
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
    showStatus: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const DisabledIconsOnly: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Alternar tema',
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: null,
    checkedLabel: null,
    uncheckedIcon: '/icons/icon-sun.svg',
    checkedIcon: '/icons/icon-moon.svg',
    disabled: true,
    size: 'md',
  },
};
