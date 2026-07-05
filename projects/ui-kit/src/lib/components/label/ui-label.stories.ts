import type { Meta, StoryObj } from '@storybook/angular';
import { labelPlaygroundPlay } from '../../storybook/play.helpers';
import { UiLabelComponent } from './ui-label.component';

const playgroundDefaults = {
  label: 'E-mail',
  forId: 'email',
  required: true,
  optionalText: 'Opcional',
  showOptionalText: true,
  customClass: '',
};

const meta: Meta<UiLabelComponent> = {
  title: 'Components/Label',
  component: UiLabelComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Required|Optional|OptionalEnglish)$/,
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
          'Label reutilizável para campos de formulário. Exibe indicador de obrigatoriedade ou texto opcional.\n\n' +
          '**Uso:** associe ao campo via `forId` com o `id` do input/select correspondente.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto visível do label.',
    },
    forId: {
      control: 'text',
      table: { category: 'Formulário' },
      description:
        'ID do campo associado. Preenche o atributo `for` do elemento `<label>`.',
    },
    required: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Quando `true`, exibe indicador visual de campo obrigatório. Quando `false`, pode exibir texto opcional.',
    },
    optionalText: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto exibido ao lado do label quando o campo não é obrigatório (ex.: "Opcional").',
    },
    showOptionalText: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Controla a exibição do texto opcional quando `required` é `false`.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao elemento raiz.',
    },
  },
  args: { ...playgroundDefaults },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 8px; max-width: 320px;">
        <ui-label
          [label]="label"
          [forId]="forId"
          [required]="required"
          [optionalText]="optionalText"
          [showOptionalText]="showOptionalText"
          [customClass]="customClass"
        />
        <input [id]="forId" type="text" />
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<UiLabelComponent>;

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
  play: labelPlaygroundPlay,
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Label de campo obrigatório com asterisco visual.',
      },
    },
  },
  args: { ...playgroundDefaults },
};

export const Optional: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Label de campo opcional com texto "Opcional".',
      },
    },
  },
  args: {
    label: 'Nome preferido',
    forId: 'preferredName',
    required: false,
    optionalText: 'Opcional',
    showOptionalText: true,
    customClass: '',
  },
};

export const OptionalEnglish: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Campo opcional com texto customizado em outro idioma.',
      },
    },
  },
  args: {
    label: 'Preferred name',
    forId: 'preferredName',
    required: false,
    optionalText: 'Optional',
    showOptionalText: true,
    customClass: '',
  },
};
