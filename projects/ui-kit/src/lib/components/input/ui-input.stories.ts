import type { Meta, StoryObj } from '@storybook/angular';
import { inputPlaygroundPlay } from '../../storybook/play.helpers';
import { UiInputComponent } from './ui-input.component';

const playgroundDefaults = {
  label: 'Nome completo',
  ariaLabel: null as string | null,
  id: 'fullName',
  name: 'fullName',
  type: 'text' as const,
  placeholder: 'Seu nome',
  autocomplete: 'name',
  inputMode: null as string | null,
  min: null as string | number | null,
  max: null as string | number | null,
  step: null as string | number | null,
  required: true,
  readonly: false,
  disabled: false,
  optionalText: 'Opcional',
  showOptionalText: false,
  errorMessage: '*Campo obrigatório',
  showError: false,
  customClass: '',
};

const meta: Meta<UiInputComponent> = {
  title: 'Components/Input',
  component: UiInputComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|Email|Password|Optional|RequiredWithError|Disabled|ReadOnly|Search|WithoutVisibleLabel|Date|DateTime|Time)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          max-width: 420px;
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
          'Campo de texto do design system com label integrado, validação visual e suporte a acessibilidade.\n\n' +
          '**Uso:** informe `label` e `id`. Emite `valueChange` a cada alteração do valor.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto exibido como label do campo via `ui-label`.',
    },
    placeholder: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto de exemplo exibido quando o campo está vazio.',
    },
    errorMessage: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Mensagem exibida abaixo do campo quando inválido. Associada via `aria-describedby`.',
    },
    optionalText: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto exibido pelo label quando o campo é opcional (ex.: "Opcional").',
    },
    id: {
      control: 'text',
      table: { category: 'Formulário' },
      description: 'Identificador único do campo. Usado no `for` do label.',
    },
    name: {
      control: 'text',
      table: { category: 'Formulário' },
      description: 'Nome do campo enviado em formulários HTML.',
    },
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'datetime-local',
        'time',
      ],
      table: { category: 'Formulário' },
      description: 'Tipo nativo do elemento `<input>`.',
    },
    min: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'Valor mínimo aceito (útil com `number`, `date`, `datetime-local` e `time`).',
    },
    max: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'Valor máximo aceito (útil com `number`, `date`, `datetime-local` e `time`).',
    },
    step: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'Incremento aceito pelo campo (útil com `number`, `date`, `datetime-local` e `time`).',
    },
    autocomplete: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'Valor do atributo `autocomplete` para preenchimento automático do navegador.',
    },
    inputMode: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'Sugere o tipo de teclado em dispositivos móveis (`text`, `email`, `numeric`, `tel` etc.).',
    },
    required: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Define se o campo é obrigatório.',
    },
    readonly: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Permite visualizar o valor sem possibilitar edição.',
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita a interação com o campo.',
    },
    showOptionalText: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Controla a exibição do texto de campo opcional.',
    },
    showError: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Força a exibição da mensagem de erro independentemente da validação do formulário.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao container do campo.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível utilizado quando o campo não possui label visível.',
    },
    valueChange: {
      action: 'valueChange',
      table: { category: 'Events' },
      description: 'Evento disparado sempre que o valor do campo é alterado.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiInputComponent>;

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
  play: inputPlaygroundPlay,
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Campo de texto padrão obrigatório.',
      },
    },
  },
  args: { ...playgroundDefaults },
};

export const Email: Story = {
  parameters: {
    docs: { description: { story: 'Campo de e-mail com `type="email"` e autocomplete.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'E-mail',
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'seu@email.com',
    autocomplete: 'email',
    inputMode: 'email',
  },
};

export const Password: Story = {
  parameters: {
    docs: { description: { story: 'Campo de senha com autocomplete de nova senha.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Senha',
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Mínimo 8 caracteres',
    autocomplete: 'new-password',
  },
};

export const Optional: Story = {
  parameters: {
    docs: { description: { story: 'Campo opcional com texto "Opcional" no label.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Nome preferido',
    id: 'preferredName',
    name: 'preferredName',
    placeholder: 'Como deseja ser chamado',
    required: false,
  },
};

export const RequiredWithError: Story = {
  parameters: {
    docs: { description: { story: 'Campo obrigatório com mensagem de erro visível.' } },
  },
  args: {
    ...playgroundDefaults,
    showError: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'Campo desabilitado sem interação.' } },
  },
  args: {
    ...playgroundDefaults,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  parameters: {
    docs: { description: { story: 'Campo somente leitura para exibição de valor fixo.' } },
  },
  args: {
    ...playgroundDefaults,
    readonly: true,
    label: 'Código do usuário',
    placeholder: '',
  },
};

export const Search: Story = {
  parameters: {
    docs: { description: { story: 'Campo de busca com `type="search"`.' } },
  },
  args: {
    ...playgroundDefaults,
    label: 'Pesquisar',
    id: 'search',
    name: 'search',
    type: 'search',
    placeholder: 'Buscar...',
    autocomplete: 'off',
    inputMode: 'search',
    required: false,
  },
};

export const WithoutVisibleLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Campo sem label visível, usando `ariaLabel` para acessibilidade.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: '',
    ariaLabel: 'Pesquisar componentes',
    id: 'searchComponents',
    name: 'searchComponents',
    type: 'search',
    placeholder: 'Buscar...',
    autocomplete: 'off',
    inputMode: 'search',
    required: false,
  },
};

export const Date: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Campo de data com `type="date"`. Use `max`/`min` para limitar o intervalo (ex.: impedir datas futuras).',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Data da medição',
    id: 'measuredAt',
    name: 'measuredAt',
    type: 'date',
    placeholder: '',
    autocomplete: 'off',
    max: '2026-12-31',
  },
};

export const DateTime: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Campo de data e hora com `type="datetime-local"`.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Data e hora da consulta',
    id: 'visitedAt',
    name: 'visitedAt',
    type: 'datetime-local',
    placeholder: '',
    autocomplete: 'off',
  },
};

export const Time: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Campo de horário com `type="time"`.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Horário',
    id: 'time',
    name: 'time',
    type: 'time',
    placeholder: '',
    autocomplete: 'off',
  },
};
