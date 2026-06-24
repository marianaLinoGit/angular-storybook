import type { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from './ui-toast.component';

const meta: Meta<ToastComponent> = {
  title: 'Components/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'info'],
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<ToastComponent>;

export const Info: Story = {
  args: {
    title: 'Informação',
    text: 'Essa é uma mensagem informativa.',
    color: 'info',
    icon: 'ℹ️',
    position: 'top-right',
    closable: true,
    duration: 5000,
  },
};

export const Success: Story = {
  args: {
    title: 'Sucesso',
    text: 'A operação foi concluída com sucesso.',
    color: 'success',
    icon: '✅',
    position: 'top-right',
    closable: true,
    duration: 5000,
  },
};

export const Warning: Story = {
  args: {
    title: 'Atenção',
    text: 'Revise as informações antes de continuar.',
    color: 'warning',
    icon: '⚠️',
    position: 'bottom-right',
    closable: true,
    duration: 7000,
  },
};

export const Danger: Story = {
  args: {
    title: 'Erro',
    text: 'Não foi possível concluir a ação.',
    color: 'danger',
    icon: '❌',
    position: 'top-center',
    closable: true,
    duration: 5000,
  },
};
