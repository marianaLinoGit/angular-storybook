import type { Meta, StoryObj } from '@storybook/angular';
import { UiLabelComponent } from './ui-label.component';

const meta: Meta<UiLabelComponent> = {
  title: 'Components/Label',
  component: UiLabelComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    forId: { control: 'text' },
    required: { control: 'boolean' },
    optionalText: { control: 'text' },
    showOptionalText: { control: 'boolean' },
    customClass: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<UiLabelComponent>;

export const Required: Story = {
  args: {
    label: 'E-mail',
    forId: 'email',
    required: true,
    optionalText: 'Opcional',
    showOptionalText: true,
    customClass: '',
  },
};

export const Optional: Story = {
  args: {
    label: 'Nome preferido',
    forId: 'preferredName',
    required: false,
    optionalText: 'Opcional',
    showOptionalText: true,
    customClass: '',
  },
};
