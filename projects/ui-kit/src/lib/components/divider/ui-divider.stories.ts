import type { Meta, StoryObj } from '@storybook/angular';
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
  includeStories: /^(PlaygroundCompleto|Primary|WithLabel|Dashed|Vertical)$/,
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
