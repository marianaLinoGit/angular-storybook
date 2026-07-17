import type { Meta, StoryObj } from '@storybook/angular';
import { UiFieldErrorComponent } from './ui-field-error.component';

const playgroundDefaults = {
  id: 'field-error-demo',
  message: '*Campo obrigatório',
  flush: false,
};

const meta: Meta<UiFieldErrorComponent> = {
  title: 'Components/FieldError',
  component: UiFieldErrorComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Message|DefaultSpacing|Flush)$/,
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
        .demo-box {
          border: 1px dashed var(--ui-color-border, #d0d5dd);
          padding: var(--ui-space-3);
          border-radius: var(--ui-radius-md, 8px);
        }
        .demo-label {
          margin: 0 0 var(--ui-space-2);
          font-size: var(--ui-font-size-sm, 0.875rem);
          color: var(--ui-color-text-muted, #667085);
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
          'Mensagem de erro de campo reutilizável, associada via `id` (ex.: `aria-describedby`).\n\n' +
          '**Uso:** `<ui-field-error id="email-error" message="*Campo obrigatório" />`.\n\n' +
          '**flush:** remove a margem superior — use dentro de `ui-form-field`, que já aplica gap.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Identificador do elemento de erro (referenciado por `aria-describedby`).',
    },
    message: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto da mensagem de erro exibida.',
    },
    flush: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description:
        'Remove a margem superior. Útil quando o container pai (ex.: `ui-form-field`) já define o espaçamento.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiFieldErrorComponent>;

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
};

export const Message: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Mensagem de erro padrão com espaçamento default (margem superior).',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    message: 'Informe um e-mail válido.',
  },
};

export const DefaultSpacing: Story = {
  name: 'Espaçamento default',
  parameters: {
    docs: {
      description: {
        story:
          'Com `flush=false` (padrão), a mensagem mantém margem superior para uso standalone abaixo do campo.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="demo-box">
        <p class="demo-label">Campo (simulado)</p>
        <ui-field-error [id]="id" [message]="message" [flush]="flush" />
      </div>
    `,
  }),
  args: {
    ...playgroundDefaults,
    flush: false,
    message: '*Campo obrigatório',
  },
};

export const Flush: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Com `flush=true`, sem margem superior — padrão recomendado dentro de `ui-form-field`.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="demo-box">
        <p class="demo-label">Form field (gap do container)</p>
        <ui-field-error [id]="id" [message]="message" [flush]="flush" />
      </div>
    `,
  }),
  args: {
    ...playgroundDefaults,
    flush: true,
    message: '*Campo obrigatório',
  },
};
