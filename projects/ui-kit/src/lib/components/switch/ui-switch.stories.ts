import type { Meta, StoryObj } from '@storybook/angular';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiSwitchComponent } from './ui-switch.component';

type UiSwitchStoryArgs = UiSwitchComponent & {
  checkedValue: boolean;
};

const meta: Meta<UiSwitchStoryArgs> = {
  title: 'Components/Switch',
  component: UiSwitchComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <ui-switch
        [id]="id"
        [name]="name"
        [label]="label"
        [ariaLabel]="ariaLabel"
        [checked]="checkedValue"
        [checkedLabel]="checkedLabel"
        [uncheckedLabel]="uncheckedLabel"
        [checkedIcon]="checkedIcon"
        [uncheckedIcon]="uncheckedIcon"
        [showOnlyCurrentSide]="showOnlyCurrentSide"
        [activeText]="activeText"
        [inactiveText]="inactiveText"
        [showSideLabels]="showSideLabels"
        [showStatus]="showStatus"
        [disabled]="disabled"
        [size]="size"
        [customClass]="customClass"
        (checkedChange)="checkedChange($event)"
      />
    `,
  }),
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
    checkedValue: {
      control: 'boolean',
      name: 'checked',
      description:
        'Estado visual inicial do switch no Storybook. No uso real, utilize o input [checked].',
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
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      description:
        'Nome do ícone exibido quando o switch está ativo. Usa o componente ui-icon.',
    },
    uncheckedIcon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      description:
        'Nome do ícone exibido quando o switch está inativo. Usa o componente ui-icon.',
    },
    showOnlyCurrentSide: {
      control: 'boolean',
      description:
        'Quando true, exibe apenas o label ou ícone correspondente ao estado atual.',
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
      description:
        'Exibe labels ou ícones nas laterais do controle, útil para alternância entre dois estados nomeados.',
    },
    showStatus: {
      control: 'boolean',
      description:
        'Exibe texto de status ao lado do switch quando showSideLabels está falso.',
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
      description: 'Classe CSS customizada aplicada ao elemento raiz.',
    },
    checkedChange: {
      action: 'checkedChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando o estado do switch muda.',
    },
  },
};

export default meta;

type Story = StoryObj<UiSwitchStoryArgs>;

export const Default: Story = {
  args: {
    id: 'themeSwitch',
    name: 'themeSwitch',
    label: 'Tema',
    ariaLabel: null,
    checkedValue: false,
    checkedLabel: 'Ativado',
    uncheckedLabel: 'Desativado',
    checkedIcon: null,
    uncheckedIcon: null,
    showOnlyCurrentSide: false,
    activeText: 'Ativado',
    inactiveText: 'Desativado',
    showSideLabels: false,
    showStatus: true,
    disabled: false,
    size: 'md',
    customClass: '',
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checkedValue: true,
  },
};

export const WithSideLabels: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Alternar tema',
    checkedValue: false,
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
  },
};

export const WithSideLabelsChecked: Story = {
  args: {
    ...WithSideLabels.args,
    checkedValue: true,
  },
};

export const WithoutSideLabels: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Ativar modo escuro',
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

export const Medium: Story = {
  args: {
    ...Default.args,
    size: 'md',
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
    checkedValue: false,
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
    uncheckedIcon: 'sun',
    checkedIcon: 'moon',
    size: 'md',
  },
};

export const ThemeSwitcherChecked: Story = {
  args: {
    ...ThemeSwitcher.args,
    checkedValue: true,
  },
};

export const ThemeSwitcherIconsOnly: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Alternar tema',
    checkedValue: false,
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: null,
    checkedLabel: null,
    uncheckedIcon: 'sun',
    checkedIcon: 'moon',
    size: 'md',
  },
};

export const ThemeSwitcherIconsOnlyChecked: Story = {
  args: {
    ...ThemeSwitcherIconsOnly.args,
    checkedValue: true,
  },
};

export const ShowOnlyCurrentSide: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Alternar tema',
    checkedValue: false,
    showSideLabels: true,
    showStatus: false,
    showOnlyCurrentSide: true,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
    uncheckedIcon: 'sun',
    checkedIcon: 'moon',
    size: 'md',
  },
};

export const ShowOnlyCurrentSideChecked: Story = {
  args: {
    ...ShowOnlyCurrentSide.args,
    checkedValue: true,
  },
};

export const WithoutVisibleLabel: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Ativar notificações',
    checkedValue: false,
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

export const DisabledChecked: Story = {
  args: {
    ...Default.args,
    checkedValue: true,
    disabled: true,
  },
};

export const DisabledIconsOnly: Story = {
  args: {
    ...ThemeSwitcherIconsOnly.args,
    disabled: true,
  },
};
