import type { Meta, StoryObj } from '@storybook/angular';
import { UiBadgeComponent } from './ui-badge.component';

const meta: Meta<UiBadgeComponent> = {
  title: 'Components/Badge',
  component: UiBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto ou número exibido no badge.',
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
    type: 'default',
  },
};

export const Danger: Story = {
  args: {
    label: 'Urgente',
    type: 'danger',
  },
};

export const Warning: Story = {
  args: {
    label: 'Em breve',
    type: 'warning',
  },
};

export const Success: Story = {
  args: {
    label: 'Concluído',
    type: 'success',
  },
};

export const Info: Story = {
  args: {
    label: 'Informativo',
    type: 'info',
  },
};

export const AllTypes: Story = {
  render: () => ({
    imports: [UiBadgeComponent],
    template: `
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <ui-badge label="Default" type="default" />
                <ui-badge label="Danger" type="danger" />
                <ui-badge label="Warning" type="warning" />
                <ui-badge label="Success" type="success" />
                <ui-badge label="Info" type="info" />
            </div>
        `,
  }),
};
