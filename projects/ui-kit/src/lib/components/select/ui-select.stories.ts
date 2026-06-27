import type { Meta, StoryObj } from '@storybook/angular';
import { UiSelectComponent } from './ui-select.component';

const referralOptions = [
  { value: 'INDICACAO', label: 'Indicação' },
  { value: 'REDES_SOCIAIS', label: 'Redes sociais' },
  { value: 'PESQUISA_GOOGLE', label: 'Pesquisa no Google' },
  { value: 'VETERINARIO', label: 'Veterinário' },
  { value: 'OUTRO', label: 'Outro' },
];

const meta: Meta<UiSelectComponent> = {
  title: 'Components/Select',
  component: UiSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    id: { control: 'text' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    options: { control: 'object' },
    required: { control: 'boolean' },
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

type Story = StoryObj<UiSelectComponent>;

export const Default: Story = {
  args: {
    label: 'Como conheceu?',
    id: 'referralSource',
    name: 'referralSource',
    placeholder: 'Selecione',
    options: referralOptions,
    required: true,
    disabled: false,
    showOptionalText: true,
    errorMessage: '*Campo obrigatório',
    showError: false,
    customClass: '',
  },
};

export const RequiredWithError: Story = {
  args: {
    ...Default.args,
    showError: true,
  },
};

export const Optional: Story = {
  args: {
    ...Default.args,
    label: 'Categoria',
    required: false,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
