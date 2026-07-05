import type { Meta, StoryObj } from '@storybook/angular';
import { tooltipPlaygroundPlay } from '../../storybook/play.helpers';
import { UiTooltipComponent } from './ui-tooltip.component';

const playgroundDefaults = {
  text: 'Texto simples do tooltip',
  html: null as string | null,
  position: 'top' as const,
  disabled: false,
  maxWidth: '240px',
  delay: '0ms',
  customClass: '',
};

const tooltipTemplate = `
  <div style="padding: 80px; display: flex; justify-content: center;">
    <ui-tooltip
      [text]="text"
      [html]="html"
      [position]="position"
      [disabled]="disabled"
      [maxWidth]="maxWidth"
      [delay]="delay"
      [customClass]="customClass"
    >
      <button type="button" style="padding: 10px 16px; border-radius: 8px; border: 1px solid #ddd;">
        Passe o mouse
      </button>
    </ui-tooltip>
  </div>
`;

const meta: Meta<UiTooltipComponent> = {
  title: 'Components/Tooltip',
  component: UiTooltipComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Text|WithHtml|Right|Disabled)$/,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        height: '220px',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Texto exibido no tooltip. Também deve ser usado como conteúdo acessível quando não houver HTML.',
    },
    html: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Conteúdo HTML opcional do tooltip. Use apenas com conteúdo confiável/sanitizado.',
    },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      table: { category: 'Layout' },
      description: 'Posição visual do tooltip em relação ao elemento alvo.',
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita a exibição do tooltip.',
    },
    maxWidth: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Largura máxima do tooltip.',
    },
    delay: {
      control: 'text',
      table: { category: 'Comportamento' },
      description: 'Delay da transição CSS. Exemplo: 0ms, 150ms, 300ms.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS customizada.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiTooltipComponent>;

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
  render: (args) => ({
    props: args,
    template: tooltipTemplate,
  }),
  play: tooltipPlaygroundPlay,
};

export const Text: Story = {
  render: (args) => ({
    props: args,
    template: tooltipTemplate,
  }),
  args: { ...playgroundDefaults },
};

export const WithHtml: Story = {
  render: (args) => ({
    props: args,
    template: tooltipTemplate.replace('Passe o mouse', 'Tooltip com HTML'),
  }),
  args: {
    ...playgroundDefaults,
    text: '',
    html: '<strong>Atenção:</strong> você pode usar <em>HTML formatado</em> aqui.',
    position: 'bottom',
  },
};

export const Right: Story = {
  args: {
    ...playgroundDefaults,
    text: 'Tooltip à direita',
    position: 'right',
  },
  render: Text.render,
};

export const Disabled: Story = {
  args: {
    ...playgroundDefaults,
    text: 'Esse tooltip não deve aparecer',
    disabled: true,
  },
  render: Text.render,
};
