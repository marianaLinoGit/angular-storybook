import type { Meta, StoryObj } from '@storybook/angular';
import { textareaPlaygroundPlay } from '../../storybook/play.helpers';
import { UiTextareaComponent } from './ui-textarea.component';

const playgroundDefaults = {
  label: 'Observações',
  ariaLabel: null as string | null,
  id: 'notes',
  name: 'notes',
  placeholder: 'Descreva detalhes relevantes…',
  autocomplete: null as string | null,
  rows: 4,
  cols: null as number | null,
  maxlength: null as number | null,
  resize: 'vertical' as const,
  required: false,
  readonly: false,
  disabled: false,
  optionalText: 'Opcional',
  showOptionalText: false,
  labelTooltip: '',
  errorMessage: '*Campo obrigatório',
  showError: false,
  customClass: '',
};

const meta: Meta<UiTextareaComponent> = {
  title: 'Components/Textarea',
  component: UiTextareaComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|Optional|RequiredWithError|Disabled|ReadOnly|WithoutVisibleLabel|NoResize|WithLabelTooltip)$/,
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
          'Campo de texto multilinha do design system com label integrado, validação visual e suporte a acessibilidade.\n\n' +
          '**Uso:** informe `label` e `id`. Emite `valueChange` a cada alteração do valor. Compatível com reactive forms via `ControlValueAccessor`.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    placeholder: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    errorMessage: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    optionalText: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    labelTooltip: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    id: {
      control: 'text',
      table: { category: 'Formulário' },
    },
    name: {
      control: 'text',
      table: { category: 'Formulário' },
    },
    rows: {
      control: 'number',
      table: { category: 'Formulário' },
    },
    cols: {
      control: 'number',
      table: { category: 'Formulário' },
    },
    maxlength: {
      control: 'number',
      table: { category: 'Formulário' },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      table: { category: 'Aparência' },
    },
    required: {
      control: 'boolean',
      table: { category: 'Estado' },
    },
    readonly: {
      control: 'boolean',
      table: { category: 'Estado' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
    },
    showOptionalText: {
      control: 'boolean',
      table: { category: 'Estado' },
    },
    showError: {
      control: 'boolean',
      table: { category: 'Estado' },
    },
    hideLabel: {
      control: 'boolean',
      table: { category: 'Aparência' },
    },
    hideError: {
      control: 'boolean',
      table: { category: 'Aparência' },
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
    },
    valueChange: {
      action: 'valueChange',
      table: { category: 'Events' },
    },
  },
  args: playgroundDefaults,
};

export default meta;
type Story = StoryObj<UiTextareaComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  args: { ...playgroundDefaults },
  play: textareaPlaygroundPlay,
};

export const Default: Story = {
  args: {
    ...playgroundDefaults,
    label: 'Descrição',
    placeholder: 'Digite a descrição…',
  },
};

export const Optional: Story = {
  parameters: {
    docs: {
      description: { story: 'Campo opcional com texto "Opcional" no label.' },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Observações adicionais',
    id: 'extraNotes',
    name: 'extraNotes',
    placeholder: 'Detalhes opcionais…',
    required: false,
    showOptionalText: true,
  },
};

export const RequiredWithError: Story = {
  args: {
    ...playgroundDefaults,
    label: 'Motivo',
    required: true,
    showError: true,
    errorMessage: '*Campo obrigatório',
  },
};

export const Disabled: Story = {
  args: {
    ...playgroundDefaults,
    disabled: true,
    placeholder: 'Campo desabilitado',
  },
};

export const ReadOnly: Story = {
  args: {
    ...playgroundDefaults,
    readonly: true,
    label: 'Somente leitura',
  },
};

export const WithoutVisibleLabel: Story = {
  args: {
    ...playgroundDefaults,
    hideLabel: true,
    ariaLabel: 'Observações',
  },
};

export const NoResize: Story = {
  args: {
    ...playgroundDefaults,
    resize: 'none',
    rows: 5,
  },
};

export const WithLabelTooltip: Story = {
  name: 'Com tooltip no label',
  parameters: {
    docs: {
      description: {
        story:
          'Campo com tooltip info no label via `labelTooltip`. O ícone info é exibido automaticamente.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Histórico clínico',
    id: 'clinicalHistory',
    name: 'clinicalHistory',
    placeholder: 'Resuma o histórico relevante…',
    required: false,
    showOptionalText: false,
    labelTooltip: 'Inclua diagnósticos prévios, alergias e medicações em uso.',
  },
};
