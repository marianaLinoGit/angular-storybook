import type { Meta, StoryObj } from '@storybook/angular';
import { dividerPlaygroundPlay } from '../../storybook/play.helpers';
import { UiDividerComponent } from './ui-divider.component';

const playgroundDefaults = {
  color: 'default' as const,
  orientation: 'horizontal' as const,
  variant: 'solid' as const,
  size: 'md' as const,
  label: '',
  customClass: '',
};

const meta: Meta<UiDividerComponent> = {
  title: 'Components/Divider',
  component: UiDividerComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Primary|WithLabel|Dashed|Dotted|LabelDashed|AllColors|AllSizes|Vertical)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          padding: var(--ui-space-4);
        }
        .demo-row {
          display: flex;
          align-items: center;
          gap: var(--ui-space-3);
        }
        .demo-stack {
          display: grid;
          gap: var(--ui-space-4);
          max-width: 480px;
        }
        .demo-stack__item {
          display: grid;
          gap: var(--ui-space-2);
        }
        .demo-stack__label {
          margin: 0;
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
          'Separador visual horizontal ou vertical, com controle de cor semântica, espessura/tamanho e estilo da linha.\n\n' +
          '**Cores:** `default`, `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `muted`.\n\n' +
          '**Uso:** `<ui-divider />` ou `<ui-divider color="primary" label="Seção" />`.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'muted',
      ],
      table: { category: 'Aparência' },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: { category: 'Aparência' },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      table: { category: 'Aparência' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
    },
    label: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiDividerComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  args: { ...playgroundDefaults },
  play: dividerPlaygroundPlay,
};

export const Primary: Story = {
  args: { ...playgroundDefaults, color: 'primary' },
};

export const WithLabel: Story = {
  name: 'Com label',
  args: { ...playgroundDefaults, label: 'Continua', color: 'muted' },
};

export const Dashed: Story = {
  args: { ...playgroundDefaults, variant: 'dashed', color: 'primary' },
};

export const Dotted: Story = {
  parameters: {
    docs: {
      description: { story: 'Variante `dotted` com cor muted.' },
    },
  },
  args: { ...playgroundDefaults, variant: 'dotted', color: 'muted' },
};

export const LabelDashed: Story = {
  name: 'Label + dashed',
  parameters: {
    docs: {
      description: {
        story: 'Divider horizontal com label central e linha tracejada.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Ou continue com',
    variant: 'dashed',
    color: 'muted',
  },
};

export const AllColors: Story = {
  name: 'Matriz de cores',
  parameters: {
    docs: {
      description: {
        story:
          'Comparação visual de todas as cores semânticas (`default`, `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `muted`).',
      },
    },
  },
  render: () => ({
    template: `
      <div class="demo-stack">
        @for (color of colors; track color) {
          <div class="demo-stack__item">
            <p class="demo-stack__label">{{ color }}</p>
            <ui-divider [color]="color" />
          </div>
        }
      </div>
    `,
    props: {
      colors: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'muted',
      ],
    },
  }),
};

export const AllSizes: Story = {
  name: 'Tamanhos sm / md / lg',
  parameters: {
    docs: {
      description: {
        story: 'Comparação das espessuras `sm`, `md` e `lg`.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="demo-stack">
        @for (size of sizes; track size) {
          <div class="demo-stack__item">
            <p class="demo-stack__label">{{ size }}</p>
            <ui-divider [size]="size" color="primary" />
          </div>
        }
      </div>
    `,
    props: {
      sizes: ['sm', 'md', 'lg'],
    },
  }),
};

export const Vertical: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="demo-row">
        <span>Antes</span>
        <ui-divider
          [color]="color"
          orientation="vertical"
          [variant]="variant"
          [size]="size"
        />
        <span>Depois</span>
      </div>
    `,
  }),
  args: { ...playgroundDefaults, orientation: 'vertical', color: 'primary' },
};
