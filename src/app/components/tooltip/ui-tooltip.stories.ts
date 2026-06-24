import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipComponent } from './ui-tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
};

export default meta;

type Story = StoryObj<TooltipComponent>;

export const Text: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; display: flex; justify-content: center;">
        <ui-tooltip [text]="text" [position]="position">
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
  },
};

export const WithHtml: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; display: flex; justify-content: center;">
        <ui-tooltip [html]="html" [position]="position">
          <button style="padding: 10px 16px; border-radius: 8px; border: 1px solid #ddd;">
            Tooltip com HTML
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
  args: {
    html: '<strong>Atenção:</strong> você pode usar <em>HTML formatado</em> aqui.',
    position: 'bottom',
  },
};
