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
      control: 'text',
      description:
        'Ícone exibido no botão. Pode ser emoji, caractere, caminho de imagem ou SVG usado como máscara.',
    },
    iconMode: {
      control: 'radio',
      options: ['text', 'image', 'mask'],
      description: 'Define se o ícone é texto, imagem ou máscara SVG.',
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
      description: 'Preset visual do botão.',
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
        'Exibe apenas o ícone, mantendo acessibilidade via ariaLabel.',
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
    iconMode: 'text',
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
    icon: '+',
    iconMode: 'text',
    iconPosition: 'left',
    color: 'secondary',
  },
};

export const IconRight: Story = {
  args: {
    ...Default.args,
    label: 'Continuar',
    icon: '→',
    iconMode: 'text',
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
    label: 'Salvar',
    loadingLabel: 'Salvando...',
    icon: '⏳',
    loading: true,
    color: 'primary',
  },
};

export const IconOnly: Story = {
  args: {
    ...Default.args,
    label: '',
    ariaLabel: 'Adicionar item',
    icon: '+',
    iconOnly: true,
    color: 'primary',
  },
};

export const BackButtonDesktop: Story = {
  args: {
    ...Default.args,
    label: 'Voltar',
    ariaLabel: 'Voltar para a página anterior',
    icon: '/icons/back.svg',
    iconMode: 'mask',
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
    icon: '/icons/back.svg',
    iconMode: 'mask',
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
    icon: '/icons/back.svg',
    iconMode: 'mask',
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
