import type { Meta, StoryObj } from '@storybook/angular';
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
    ariaLabel: {
      control: 'text',
      description: 'Texto utilizado por leitores de tela.',
    },
    icon: {
      control: 'text',
      description:
        'Ícone exibido no botão. Pode ser emoji, caractere ou texto curto.',
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
    },
  },
};

export default meta;

type Story = StoryObj<UiButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Salvar',
    ariaLabel: '',
    icon: '',
    color: 'primary',
    size: 'md',
    position: 'center',
    iconPosition: 'left',
    disabled: false,
    loading: false,
    fullWidth: false,
    rounded: false,
    outline: false,
    customClass: '',
    type: 'button',
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    label: 'Adicionar',
    icon: '+',
    iconPosition: 'left',
    color: 'secondary',
  },
};

export const IconRight: Story = {
  args: {
    ...Default.args,
    label: 'Continuar',
    icon: '→',
    iconPosition: 'right',
    color: 'primary',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    label: 'Cancelar',
    color: 'danger',
    outline: true,
  },
};

export const Rounded: Story = {
  args: {
    ...Default.args,
    label: 'Continuar',
    rounded: true,
    color: 'primary',
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    label: 'Botão largura total',
    fullWidth: true,
    color: 'info',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Desabilitado',
    icon: '🔒',
    disabled: true,
    color: 'disabled',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    label: 'Salvando...',
    ariaLabel: 'Salvando informações',
    icon: '⏳',
    loading: true,
    color: 'primary',
  },
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; max-width: 320px;">
        <ui-button label="Primary" color="primary"></ui-button>
        <ui-button label="Secondary" color="secondary"></ui-button>
        <ui-button label="Success" color="success"></ui-button>
        <ui-button label="Warning" color="warning"></ui-button>
        <ui-button label="Danger" color="danger"></ui-button>
        <ui-button label="Info" color="info"></ui-button>
        <ui-button label="Disabled" color="disabled" [disabled]="true"></ui-button>
      </div>
    `,
  }),
};

export const AllColorsOutline: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; max-width: 320px;">
        <ui-button label="Primary" color="primary" [outline]="true"></ui-button>
        <ui-button label="Secondary" color="secondary" [outline]="true"></ui-button>
        <ui-button label="Success" color="success" [outline]="true"></ui-button>
        <ui-button label="Warning" color="warning" [outline]="true"></ui-button>
        <ui-button label="Danger" color="danger" [outline]="true"></ui-button>
        <ui-button label="Info" color="info" [outline]="true"></ui-button>
      </div>
    `,
  }),
};
