import type { Meta, StoryObj } from '@storybook/angular';
import { UiTooltipComponent } from './ui-tooltip.component';

const meta: Meta<UiTooltipComponent> = {
  title: 'Components/Tooltip',
  component: UiTooltipComponent,
  tags: ['autodocs'],
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
    },
    html: {
      control: 'text',
    },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    disabled: {
      control: 'boolean',
    },
    maxWidth: {
      control: 'text',
    },
    delay: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<UiTooltipComponent>;

export const Text: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; display: flex; justify-content: center;">
        <ui-tooltip
          [text]="text"
          [html]="html"
          [position]="position"
          [disabled]="disabled"
          [maxWidth]="maxWidth"
          [delay]="delay"
        >
          <button style="padding: 10px 16px; border-radius: 8px; border: 1px solid #ddd;">
            Passe o mouse
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
  args: {
    text: 'Texto simples do tooltip',
    html: null,
    position: 'top',
    disabled: false,
    maxWidth: '240px',
    delay: '0ms',
  },
};

export const WithHtml: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; display: flex; justify-content: center;">
        <ui-tooltip
          [html]="html"
          [position]="position"
          [disabled]="disabled"
          [maxWidth]="maxWidth"
          [delay]="delay"
        >
          <button style="padding: 10px 16px; border-radius: 8px; border: 1px solid #ddd;">
            Tooltip com HTML
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
  args: {
    text: '',
    html: '<strong>Atenção:</strong> você pode usar <em>HTML formatado</em> aqui.',
    position: 'bottom',
    disabled: false,
    maxWidth: '260px',
    delay: '0ms',
  },
};

export const Right: Story = {
  args: {
    text: 'Tooltip à direita',
    html: null,
    position: 'right',
    disabled: false,
    maxWidth: '240px',
    delay: '0ms',
  },
  render: Text.render,
};

export const Disabled: Story = {
  args: {
    text: 'Esse tooltip não deve aparecer',
    html: null,
    position: 'top',
    disabled: true,
    maxWidth: '240px',
    delay: '0ms',
  },
  render: Text.render,
};
