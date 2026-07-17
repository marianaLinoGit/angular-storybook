import type { Meta, StoryObj } from '@storybook/angular';
import { buttonPlaygroundPlay } from '../../storybook/play.helpers';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiButtonComponent } from './ui-button.component';

const playgroundDefaults = {
  label: 'Salvar',
  loadingLabel: 'Carregando...',
  ariaLabel: null as string | null,
  icon: null as (typeof UI_ICON_NAMES)[number] | null,
  color: 'primary' as const,
  size: 'md' as const,
  position: 'center' as const,
  iconPosition: 'left' as const,
  appearance: 'default' as const,
  backFallbackUrl: '/',
  disabled: false,
  loading: false,
  fullWidth: false,
  rounded: false,
  outline: false,
  iconOnly: false,
  hideLabelOnMobile: false,
  customClass: '',
  type: 'button' as const,
};

const meta: Meta<UiButtonComponent> = {
  title: 'Components/Button',
  component: UiButtonComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|WithIcon|IconRight|Download|Upload|Outline|Rounded|FullWidth|Disabled|Loading|IconOnly|BackButtonDesktop|BackButtonMobile|BackIconOnly|AllSizes|AllColors|AllColorsOutline)$/,
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
          'Botão do design system com suporte a ícones, variantes de cor, outline, loading e preset de voltar.\n\n' +
          '**Uso:** informe `label` e `color`. Emite `buttonClick` ao clicar (exceto quando `disabled` ou `loading`).',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto exibido no botão.',
    },
    loadingLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto exibido quando o botão está em estado de carregamento.',
    },
    icon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Conteúdo' },
      description: 'Nome do ícone exibido no botão. Usa o componente `ui-icon`.',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      table: { category: 'Conteúdo' },
      description: 'Posição do ícone em relação ao texto.',
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
      table: { category: 'Aparência' },
      description: 'Variação visual e semântica do botão.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description: 'Tamanho do botão.',
    },
    position: {
      control: 'select',
      options: ['left', 'center', 'right'],
      table: { category: 'Aparência' },
      description: 'Alinhamento do botão dentro do wrapper.',
    },
    appearance: {
      control: 'select',
      options: ['default', 'back'],
      table: { category: 'Aparência' },
      description:
        'Preset visual. Com `back`, usa automaticamente o ícone `back` se nenhum ícone for informado.',
    },
    outline: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description: 'Aplica estilo outline (fundo transparente com borda).',
    },
    rounded: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description: 'Aplica borda totalmente arredondada (pill).',
    },
    fullWidth: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description: 'Faz o botão ocupar 100% da largura do container.',
    },
    iconOnly: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description:
        'Exibe apenas o ícone. Use `ariaLabel` para manter acessibilidade.',
    },
    hideLabelOnMobile: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description: 'Oculta o texto do botão em telas menores que 900px.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao botão.',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      table: { category: 'Formulário' },
      description: 'Tipo nativo do elemento `<button>`.',
    },
    backFallbackUrl: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'URL de fallback usada pelo preset `back` quando não há histórico de navegação.',
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita o botão e impede cliques.',
    },
    loading: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe spinner e `loadingLabel` no lugar do conteúdo normal.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto para leitores de tela quando o botão não possui texto visível suficiente.',
    },
    buttonClick: {
      action: 'buttonClick',
      table: { category: 'Events' },
      description:
        'Evento disparado ao clicar. Não é emitido quando `disabled` ou `loading` estão ativos.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiButtonComponent>;

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
  play: buttonPlaygroundPlay,
};

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Botão primário padrão sem ícone.' } },
  },
  args: { ...playgroundDefaults },
  play: buttonPlaygroundPlay,
};

export const WithIcon: Story = {
  parameters: {
    docs: { description: { story: 'Botão com ícone à esquerda do texto.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Adicionar',
    icon: 'plus',
    color: 'secondary',
  },
};

export const IconRight: Story = {
  parameters: {
    docs: { description: { story: 'Botão com ícone à direita do texto.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Continuar',
    icon: 'chevron-down',
    iconPosition: 'right',
  },
};

export const Download: Story = {
  parameters: {
    docs: { description: { story: 'Ação de download com ícone `download`.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Baixar arquivo',
    icon: 'download',
  },
};

export const Upload: Story = {
  parameters: {
    docs: { description: { story: 'Ação de upload com ícone `upload`.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Enviar arquivo',
    icon: 'upload',
    color: 'secondary',
  },
};

export const Outline: Story = {
  parameters: {
    docs: { description: { story: 'Botão outline para ações secundárias ou de cancelamento.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Cancelar',
    icon: 'close',
    color: 'danger',
    outline: true,
  },
};

export const Rounded: Story = {
  parameters: {
    docs: { description: { story: 'Botão com bordas totalmente arredondadas.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Continuar',
    icon: 'check',
    rounded: true,
  },
};

export const FullWidth: Story = {
  parameters: {
    docs: { description: { story: 'Botão ocupando toda a largura disponível.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Botão largura total',
    icon: 'check-circle',
    fullWidth: true,
    color: 'info',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'Botão desabilitado sem interação.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Desabilitado',
    icon: 'lock-blocked',
    disabled: true,
    color: 'disabled',
  },
};

export const Loading: Story = {
  parameters: {
    docs: { description: { story: 'Estado de carregamento com spinner e label alternativo.' } },
  },
  args: {
    ...playgroundDefaults,
    loadingLabel: 'Salvando...',
    icon: 'check',
    loading: true,
  },
};

export const IconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Botão apenas com ícone. Requer `ariaLabel` para acessibilidade.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Adicionar item',
    icon: 'plus',
    iconOnly: true,
  },
};

export const BackButtonDesktop: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Preset `back` com label visível em desktop.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Voltar',
    ariaLabel: 'Voltar para a página anterior',
    icon: 'back',
    appearance: 'back',
    size: 'sm',
    outline: false,
    hideLabelOnMobile: false,
  },
};

export const BackButtonMobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Preset `back` com label oculto em mobile (`hideLabelOnMobile`).',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Voltar',
    ariaLabel: 'Voltar para a página anterior',
    icon: 'back',
    appearance: 'back',
    size: 'sm',
    hideLabelOnMobile: true,
  },
};

export const BackIconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Botão voltar apenas com ícone usando preset `back`.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Voltar',
    icon: 'back',
    iconOnly: true,
    appearance: 'back',
    size: 'sm',
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparação dos tamanhos `sm`, `md` e `lg` com e sem ícone.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; max-width: 320px;">
        <ui-button label="Primary" color="primary" icon="check" size="sm"></ui-button>
        <ui-button label="Primary" color="primary" icon="check" size="md"></ui-button>
        <ui-button label="Primary" color="primary" icon="check" size="lg"></ui-button>
        <ui-button label="Primary" color="primary" size="sm"></ui-button>
        <ui-button label="Primary" color="primary" size="md"></ui-button>
        <ui-button label="Primary" color="primary" size="lg"></ui-button>
      </div>
    `,
  }),
};

export const AllColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todas as variações de `color` no estilo sólido.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todas as variações de `color` no estilo outline.',
      },
    },
  },
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
