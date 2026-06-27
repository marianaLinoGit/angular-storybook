import type { Meta, StoryObj } from '@storybook/angular';
import { UiInputComponent } from './ui-input.component';

const meta: Meta<UiInputComponent> = {
  title: 'Components/Input',
  component: UiInputComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    id: { control: 'text' },
    name: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    placeholder: { control: 'text' },
    autocomplete: { control: 'text' },
    inputMode: { control: 'text' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showOptionalText: { control: 'boolean' },
    errorMessage: { control: 'text' },
    showError: { control: 'boolean' },
    customClass: { control: 'text' },
    valueChange: {
      action: 'valueChange',
      table: { category: 'Events' },
    },
  },
};

export default meta;

type Story = StoryObj<UiInputComponent>;

export const Default: Story = {
  args: {
    label: 'Nome completo',
    id: 'fullName',
    name: 'fullName',
    type: 'text',
    placeholder: 'Seu nome',
    autocomplete: 'name',
    required: true,
    readonly: false,
    disabled: false,
    showOptionalText: true,
    errorMessage: '*Campo obrigatório',
    showError: false,
    customClass: '',
  },
};

export const Email: Story = {
  args: {
    ...Default.args,
    label: 'E-mail',
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'seu@email.com',
    autocomplete: 'email',
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    label: 'Senha',
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Mínimo 8 caracteres',
    autocomplete: 'new-password',
  },
};

export const Optional: Story = {
  args: {
    ...Default.args,
    label: 'Nome preferido',
    id: 'preferredName',
    name: 'preferredName',
    placeholder: 'Como quer ser chamada',
    required: false,
  },
};

export const RequiredWithError: Story = {
  args: {
    ...Default.args,
    showError: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
