import type { Meta, StoryObj } from '@storybook/angular';
import { UiButtonComponent } from './ui-button.component';

const meta: Meta<UiButtonComponent> = {
  title: 'Components/Button',
  component: UiButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'disabled',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    position: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
};

export default meta;

type Story = StoryObj<UiButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Salvar',
    color: 'primary',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Adicionar',
    icon: '+',
    iconPosition: 'left',
    color: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    label: 'Cancelar',
    color: 'danger',
    outline: true,
  },
};

export const Rounded: Story = {
  args: {
    label: 'Continuar',
    rounded: true,
    color: 'primary',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Botão largura total',
    fullWidth: true,
    color: 'info',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Desabilitado',
    disabled: true,
    color: 'disabled',
  },
};
