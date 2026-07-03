import type { Meta, StoryObj } from '@storybook/angular';
import { UiBadgeComponent } from './ui-badge.component';

const meta: Meta<UiBadgeComponent> = {
  title: 'Components/Badge',
  component: UiBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description:
        'Texto exibido no badge. Pode conter HTML quando allowHtml estiver habilitado.',
    },
    allowHtml: {
      control: 'boolean',
      description: 'Renderiza o conteúdo usando innerHTML.',
    },
    type: {
      control: 'select',
      options: ['default', 'danger', 'warning', 'success', 'info'],
      description: 'Variação visual do badge.',
    },
  },
};

export default meta;

type Story = StoryObj<UiBadgeComponent>;

export const Default: Story = {
  args: {
    label: '12 pets',
    allowHtml: false,
    type: 'default',
  },
};

export const Html: Story = {
  args: {
    label: '<strong>12</strong> pets',
    allowHtml: true,
    type: 'default',
  },
};

export const Danger: Story = {
  args: {
    label: 'Urgente',
    allowHtml: false,
    type: 'danger',
  },
};

export const Warning: Story = {
  args: {
    label: 'Em breve',
    allowHtml: false,
    type: 'warning',
  },
};

export const Success: Story = {
  args: {
    label: 'Concluído',
    allowHtml: false,
    type: 'success',
  },
};

export const Info: Story = {
  args: {
    label: 'Informativo',
    allowHtml: false,
    type: 'info',
  },
};

export const AllTypes: Story = {
  render: () => ({
    imports: [UiBadgeComponent],
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <ui-badge label="Default" />
        <ui-badge label="Danger" type="danger" />
        <ui-badge label="Warning" type="warning" />
        <ui-badge label="Success" type="success" />
        <ui-badge label="Info" type="info" />
        <ui-badge
          label="<strong>12</strong> pets"
          [allowHtml]="true"
        />
      </div>
    `,
  }),
};
