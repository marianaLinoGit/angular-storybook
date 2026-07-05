import type { Meta, StoryObj } from '@storybook/angular';
import { switchPlaygroundPlay } from '../../storybook/play.helpers';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiSwitchComponent } from './ui-switch.component';

type UiSwitchStoryArgs = {
  id: string;
  name: string;
  label: string;
  ariaLabel: string | null;
  checked: boolean;
  checkedLabel: string | null;
  uncheckedLabel: string | null;
  checkedIcon: (typeof UI_ICON_NAMES)[number] | null;
  uncheckedIcon: (typeof UI_ICON_NAMES)[number] | null;
  showOnlyCurrentSide: boolean;
  activeText: string;
  inactiveText: string;
  showSideLabels: boolean;
  showStatus: boolean;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
  customClass: string;
  checkedChange?: (value: boolean) => void;
};

const playgroundDefaults = {
  id: 'themeSwitch',
  name: 'themeSwitch',
  label: 'Tema',
  ariaLabel: null as string | null,
  checked: false,
  checkedLabel: 'Ativado',
  uncheckedLabel: 'Desativado',
  checkedIcon: null as (typeof UI_ICON_NAMES)[number] | null,
  uncheckedIcon: null as (typeof UI_ICON_NAMES)[number] | null,
  showOnlyCurrentSide: false,
  activeText: 'Ativado',
  inactiveText: 'Desativado',
  showSideLabels: false,
  showStatus: true,
  disabled: false,
  size: 'md' as const,
  customClass: '',
};

const meta: Meta<UiSwitchStoryArgs> = {
  title: 'Components/Switch',
  component: UiSwitchComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|Checked|WithSideLabels|WithSideLabelsChecked|WithoutSideLabels|Small|Medium|Large|ThemeSwitcher|ThemeSwitcherChecked|ThemeSwitcherIconsOnly|ThemeSwitcherIconsOnlyChecked|ShowOnlyCurrentSide|ShowOnlyCurrentSideChecked|WithoutVisibleLabel|Disabled|DisabledChecked|DisabledIconsOnly)$/,
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
          'Switch toggle para estados binários. Suporta labels laterais, ícones, texto de status e tamanhos variados.\n\n' +
          '**Uso:** vincule `[checked]` e escute `checkedChange`. No Storybook, use o controle `checked`.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-switch
        [id]="id"
        [name]="name"
        [label]="label"
        [ariaLabel]="ariaLabel"
        [checked]="checked"
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
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto visível associado ao switch acima ou ao lado do controle.',
    },
    checkedLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Label ou texto exibido para o estado ativo (lateral ou status).',
    },
    uncheckedLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Label ou texto exibido para o estado inativo (lateral ou status).',
    },
    activeText: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto padrão do estado ativo usado quando `checkedLabel` não é informado.',
    },
    inactiveText: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto padrão do estado inativo usado quando `uncheckedLabel` não é informado.',
    },
    checkedIcon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Conteúdo' },
      description: 'Ícone exibido no estado ativo. Usa o componente `ui-icon`.',
    },
    uncheckedIcon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Conteúdo' },
      description: 'Ícone exibido no estado inativo. Usa o componente `ui-icon`.',
    },
    id: {
      control: 'text',
      table: { category: 'Formulário' },
      description: 'Identificador único do switch.',
    },
    name: {
      control: 'text',
      table: { category: 'Formulário' },
      description: 'Nome do campo enviado em formulários HTML.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description: 'Tamanho visual do switch.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao elemento raiz.',
    },
    checked: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Estado do switch no Storybook. No uso real, utilize o input `[checked]`.',
    },
    showSideLabels: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Exibe labels ou ícones nas laterais do controle para alternância entre dois estados.',
    },
    showStatus: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Exibe texto de status ao lado do switch quando `showSideLabels` é `false`.',
    },
    showOnlyCurrentSide: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Quando `true`, exibe apenas o label ou ícone correspondente ao estado atual.',
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita a interação com o switch.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível utilizado quando o switch não possui label visível.',
    },
    checkedChange: {
      action: 'checkedChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando o estado do switch muda.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiSwitchStoryArgs>;

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
  play: switchPlaygroundPlay,
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Switch padrão desmarcado com label e status.' } },
  },
  args: { ...playgroundDefaults },
};

export const Checked: Story = {
  parameters: {
    docs: { description: { story: 'Switch no estado ativo (`checked = true`).' } },
  },
  args: { ...playgroundDefaults, checked: true },
};

export const WithSideLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Alternância Light/Dark com labels nas laterais do controle.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Alternar tema',
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
  },
};

export const WithSideLabelsChecked: Story = {
  parameters: {
    docs: { description: { story: 'Labels laterais com switch ativo (Dark).' } },
  },
  args: {
    ...WithSideLabels.args,
    checked: true,
  },
};

export const WithoutSideLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modo escuro com texto de status ao lado, sem labels laterais.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Ativar modo escuro',
    showSideLabels: false,
    showStatus: true,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
  },
};

export const Small: Story = {
  parameters: {
    docs: { description: { story: 'Switch no tamanho `sm`.' } },
  },
  args: { ...playgroundDefaults, size: 'sm' },
};

export const Medium: Story = {
  parameters: {
    docs: { description: { story: 'Switch no tamanho `md` (padrão).' } },
  },
  args: { ...playgroundDefaults, size: 'md' },
};

export const Large: Story = {
  parameters: {
    docs: { description: { story: 'Switch no tamanho `lg`.' } },
  },
  args: { ...playgroundDefaults, size: 'lg' },
};

export const ThemeSwitcher: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Seletor de tema com labels e ícones sol/lua nas laterais.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Alternar tema',
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
    uncheckedIcon: 'sun',
    checkedIcon: 'moon',
  },
};

export const ThemeSwitcherChecked: Story = {
  parameters: {
    docs: { description: { story: 'Seletor de tema ativo (modo escuro).' } },
  },
  args: { ...ThemeSwitcher.args, checked: true },
};

export const ThemeSwitcherIconsOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Seletor de tema apenas com ícones, sem labels textuais.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Alternar tema',
    showSideLabels: true,
    showStatus: false,
    uncheckedLabel: null,
    checkedLabel: null,
    uncheckedIcon: 'sun',
    checkedIcon: 'moon',
  },
};

export const ThemeSwitcherIconsOnlyChecked: Story = {
  parameters: {
    docs: { description: { story: 'Ícones sol/lua com switch ativo.' } },
  },
  args: { ...ThemeSwitcherIconsOnly.args, checked: true },
};

export const ShowOnlyCurrentSide: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Exibe apenas o label/ícone do estado atual (`showOnlyCurrentSide`).',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Alternar tema',
    showSideLabels: true,
    showStatus: false,
    showOnlyCurrentSide: true,
    uncheckedLabel: 'Light',
    checkedLabel: 'Dark',
    uncheckedIcon: 'sun',
    checkedIcon: 'moon',
  },
};

export const ShowOnlyCurrentSideChecked: Story = {
  parameters: {
    docs: { description: { story: '`showOnlyCurrentSide` com switch ativo.' } },
  },
  args: { ...ShowOnlyCurrentSide.args, checked: true },
};

export const WithoutVisibleLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Switch sem label visível, usando `ariaLabel` e texto de status.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Ativar notificações',
    checkedLabel: 'Ativo',
    uncheckedLabel: 'Inativo',
    showStatus: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'Switch desabilitado no estado inativo.' } },
  },
  args: { ...playgroundDefaults, disabled: true },
};

export const DisabledChecked: Story = {
  parameters: {
    docs: { description: { story: 'Switch desabilitado no estado ativo.' } },
  },
  args: { ...playgroundDefaults, checked: true, disabled: true },
};

export const DisabledIconsOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Seletor de tema com ícones desabilitado.',
      },
    },
  },
  args: { ...ThemeSwitcherIconsOnly.args, disabled: true },
};
