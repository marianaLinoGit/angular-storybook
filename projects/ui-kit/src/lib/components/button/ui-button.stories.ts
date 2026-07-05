import type { Meta, StoryObj } from '@storybook/angular';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiButtonComponent } from './ui-button.component';

const meta: Meta<UiButtonComponent> = {
  title: 'Components/Button',
  component: UiButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido no botão.',
    },
    loadingLabel: {
      control: 'text',
      description: 'Texto exibido quando o botão está carregando.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Texto utilizado por leitores de tela quando o botão não possui texto visível suficiente.',
    },
    icon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      description: 'Nome do ícone exibido no botão. Usa o componente ui-icon.',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'disabled',
      ],
      description: 'Variação visual do botão.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão.',
    },
    position: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Alinhamento do botão dentro do wrapper.',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Posição do ícone em relação ao texto.',
    },
    appearance: {
      control: 'select',
      options: ['default', 'back'],
      description:
        'Preset visual do botão. Quando definido como back, usa automaticamente o ícone back caso nenhum ícone seja informado.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão.',
    },
    loading: {
      control: 'boolean',
      description: 'Exibe o botão em estado de carregamento.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Define o botão com largura total.',
    },
    rounded: {
      control: 'boolean',
      description: 'Aplica borda totalmente arredondada.',
    },
    outline: {
      control: 'boolean',
      description: 'Aplica estilo outline.',
    },
    iconOnly: {
      control: 'boolean',
      description:
        'Exibe apenas o ícone. Use ariaLabel para manter acessibilidade.',
    },
    hideLabelOnMobile: {
      control: 'boolean',
      description: 'Oculta o texto em telas menores que 900px.',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS customizada.',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo nativo do botão.',
    },
    buttonClick: {
      action: 'buttonClick',
      table: {
        category: 'Events',
      },
      description:
        'Evento disparado quando o botão é clicado. Não é emitido quando disabled ou loading estiverem ativos.',
    },
  },
};

export default meta;

type Story = StoryObj<UiButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Salvar',
    loadingLabel: 'Carregando...',
    ariaLabel: null,
    icon: null,
    color: 'primary',
    size: 'md',
    position: 'center',
    iconPosition: 'left',
    appearance: 'default',
    disabled: false,
    loading: false,
    fullWidth: false,
    rounded: false,
    outline: false,
    iconOnly: false,
    hideLabelOnMobile: false,
    customClass: '',
    type: 'button',
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    label: 'Adicionar',
    icon: 'plus',
    iconPosition: 'left',
    color: 'secondary',
  },
};

export const IconRight: Story = {
  args: {
    ...Default.args,
    label: 'Continuar',
    icon: 'chevron-down',
    iconPosition: 'right',
    color: 'primary',
  },
};

export const Download: Story = {
  args: {
    ...Default.args,
    label: 'Baixar arquivo',
    icon: 'download',
    iconPosition: 'left',
    color: 'primary',
  },
};

export const Upload: Story = {
  args: {
    ...Default.args,
    label: 'Enviar arquivo',
    icon: 'upload',
    iconPosition: 'left',
    color: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    label: 'Cancelar',
    icon: 'close',
    color: 'danger',
    outline: true,
  },
};

export const Rounded: Story = {
  args: {
    ...Default.args,
    label: 'Continuar',
    icon: 'check',
    rounded: true,
    color: 'primary',
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    label: 'Botão largura total',
    icon: 'check-circle',
    fullWidth: true,
    color: 'info',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Desabilitado',
    icon: 'lock-blocked',
    disabled: true,
    color: 'disabled',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    label: 'Salvar',
    loadingLabel: 'Salvando...',
    icon: 'check',
    loading: true,
    color: 'primary',
  },
};

export const IconOnly: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Adicionar item',
    icon: 'plus',
    iconOnly: true,
    color: 'primary',
  },
};

export const BackButtonDesktop: Story = {
  args: {
    ...Default.args,
    label: 'Voltar',
    ariaLabel: 'Voltar para a página anterior',
    icon: 'back',
    iconPosition: 'left',
    appearance: 'back',
    color: 'primary',
    size: 'sm',
    outline: false,
    hideLabelOnMobile: false,
  },
};

export const BackButtonMobile: Story = {
  args: {
    ...Default.args,
    label: 'Voltar',
    ariaLabel: 'Voltar para a página anterior',
    icon: 'back',
    iconPosition: 'left',
    appearance: 'back',
    color: 'primary',
    size: 'sm',
    hideLabelOnMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const BackIconOnly: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Voltar',
    icon: 'back',
    iconOnly: true,
    appearance: 'back',
    color: 'primary',
    size: 'sm',
  },
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; max-width: 320px;">
        <ui-button label="Primary" color="primary" icon="check"></ui-button>
        <ui-button label="Secondary" color="secondary" icon="plus"></ui-button>
        <ui-button label="Success" color="success" icon="check-circle"></ui-button>
        <ui-button label="Warning" color="warning" icon="warning"></ui-button>
        <ui-button label="Danger" color="danger" icon="delete"></ui-button>
        <ui-button label="Info" color="info" icon="info"></ui-button>
        <ui-button label="Disabled" color="disabled" icon="lock-blocked" [disabled]="true"></ui-button>
      </div>
    `,
  }),
};

export const AllColorsOutline: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; max-width: 320px;">
        <ui-button label="Primary" color="primary" icon="check" [outline]="true"></ui-button>
        <ui-button label="Secondary" color="secondary" icon="plus" [outline]="true"></ui-button>
        <ui-button label="Success" color="success" icon="check-circle" [outline]="true"></ui-button>
        <ui-button label="Warning" color="warning" icon="warning" [outline]="true"></ui-button>
        <ui-button label="Danger" color="danger" icon="delete" [outline]="true"></ui-button>
        <ui-button label="Info" color="info" icon="info" [outline]="true"></ui-button>
      </div>
    `,
  }),
};
