import type { Meta, StoryObj } from '@storybook/angular';
import { UiCheckboxComponent } from './ui-checkbox.component';

const meta: Meta<UiCheckboxComponent> = {
  title: 'Components/Checkbox',
  component: UiCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    linkLabel: { control: 'text' },
    linkUrl: { control: 'text' },
    linkTarget: {
      control: 'radio',
      options: ['_self', '_blank'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showError: { control: 'boolean' },
    errorMessage: { control: 'text' },
    customClass: { control: 'text' },
    checkedChange: {
      action: 'checkedChange',
      table: { category: 'Events' },
    },
  },
};

export default meta;

type Story = StoryObj<UiCheckboxComponent>;

export const Default: Story = {
  args: {
    id: 'termsAccepted',
    name: 'termsAccepted',
    label: 'Li e aceito os',
    linkLabel: 'termos de uso',
    linkUrl: '/termos-de-uso',
    linkTarget: '_blank',
    required: true,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
  },
};

export const WithoutLink: Story = {
  args: {
    id: 'newsletter',
    name: 'newsletter',
    label: 'Desejo receber novidades por e-mail',
    linkLabel: null,
    linkUrl: null,
    linkTarget: '_blank',
    required: false,
    disabled: false,
    showError: false,
    errorMessage: '*Campo obrigatório',
    customClass: '',
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
