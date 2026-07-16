import type { Meta, StoryObj } from '@storybook/angular';
import { checkboxPlaygroundPlay } from '../../storybook/play.helpers';
import { UiCheckboxComponent } from './ui-checkbox.component';

const playgroundDefaults = {
  id: 'termsAccepted',
  name: 'termsAccepted',
  label: 'Li e aceito os',
  labelTooltip: '',
  ariaLabel: null as string | null,
  linkLabel: 'termos de uso',
  linkUrl: '/termos-de-uso',
  linkTarget: '_blank' as const,
  required: true,
  disabled: false,
  showError: false,
  errorMessage: '*Campo obrigatório',
  customClass: '',
};

const meta: Meta<UiCheckboxComponent> = {
  title: 'Components/Checkbox',
  component: UiCheckboxComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|WithoutLink|RequiredWithError|Disabled|LabelOnly|AccessibleLabelOnly)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          max-width: 480px;
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
          'Checkbox do design system com `ui-label` (texto + `labelTooltip`), link opcional, validação e suporte a formulários reativos (`ControlValueAccessor`).\n\n' +
          '**Uso:** informe `label` e `id`. Use `labelTooltip` no mesmo padrão do `ui-label`. Emite `checkedChange` ao alternar o estado.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto principal exibido ao lado do checkbox.',
    },
    labelTooltip: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto do tooltip (ícone info) exibido ao lado do label. Quando vazio, o ícone não aparece.',
    },
    linkLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto do link exibido após o label (ex.: "termos de uso"). Quando `null`, o link não é exibido.',
    },
    errorMessage: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Mensagem de erro exibida abaixo do componente. Associada via `aria-describedby`.',
    },
    id: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'Identificador único do checkbox. Usado no `for` do label associado.',
    },
    name: {
      control: 'text',
      table: { category: 'Formulário' },
      description: 'Nome do campo enviado em formulários HTML.',
    },
    linkUrl: {
      control: 'text',
      table: { category: 'Formulário' },
      description: 'URL aberta ao clicar no link. Quando `null`, o link não é exibido.',
    },
    linkTarget: {
      control: 'radio',
      options: ['_self', '_blank'],
      table: { category: 'Formulário' },
      description:
        'Define se o link abre na mesma aba (`_self`) ou em nova aba (`_blank`).',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao container do checkbox.',
    },
    required: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Define se o campo é obrigatório (indicador visual).',
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita a interação com o checkbox.',
    },
    showError: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Força a exibição da mensagem de erro independentemente da validação do formulário.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível utilizado quando não há label visível.',
    },
    checkedChange: {
      action: 'checkedChange',
      table: { category: 'Events' },
      description: 'Evento disparado quando o estado do checkbox é alterado.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiCheckboxComponent>;

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
  play: checkboxPlaygroundPlay,
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox obrigatório com label e link para termos de uso.',
      },
    },
  },
  args: { ...playgroundDefaults },
};

export const WithoutLink: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox opcional apenas com label, sem link.',
      },
    },
  },
  args: {
    id: 'newsletter',
    name: 'newsletter',
    label: 'Desejo receber novidades por e-mail',
    ariaLabel: null,
    linkLabel: null,
    linkUrl: null,
    linkTarget: '_blank',
    required: false,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
  },
};

export const RequiredWithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Campo obrigatório com mensagem de erro visível.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    showError: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox desabilitado sem interação.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    disabled: true,
  },
};

export const LabelOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox simples com label, sem link e sem obrigatoriedade.',
      },
    },
  },
  args: {
    id: 'privacyAccepted',
    name: 'privacyAccepted',
    label: 'Aceito receber comunicações sobre novidades',
    ariaLabel: null,
    linkLabel: null,
    linkUrl: null,
    linkTarget: '_blank',
    required: false,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
  },
};

export const AccessibleLabelOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox sem label visível, usando `ariaLabel` para acessibilidade.',
      },
    },
  },
  args: {
    id: 'iconOnlyCheckbox',
    name: 'iconOnlyCheckbox',
    label: '',
    ariaLabel: 'Aceitar termos de uso',
    linkLabel: null,
    linkUrl: null,
    linkTarget: '_blank',
    required: true,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
  },
};
