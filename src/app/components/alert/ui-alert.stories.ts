import type { Meta, StoryObj } from '@storybook/angular';
import { UiAlertComponent } from './ui-alert.component';

const meta: Meta<UiAlertComponent> = {
  title: 'Components/Alert',
  component: UiAlertComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
    },
  },
};

export default meta;

type Story = StoryObj<UiAlertComponent>;

export const Info: Story = {
  args: {
    message: 'Mensagem informativa para o usuário.',
    color: 'info',
    icon: 'ℹ️',
    closable: true,
    fixed: false,
    visible: true,
  },
};

export const Success: Story = {
  args: {
    message: 'Operação realizada com sucesso.',
    color: 'success',
    icon: '✅',
    closable: true,
    fixed: false,
    visible: true,
  },
};

export const Warning: Story = {
  args: {
    message: 'Atenção: revise as informações.',
    color: 'warning',
    icon: '⚠️',
    closable: true,
    fixed: false,
    visible: true,
  },
};

export const Danger: Story = {
  args: {
    message: 'Erro ao salvar os dados.',
    color: 'danger',
    icon: '❌',
    closable: true,
    fixed: false,
    visible: true,
  },
};

export const FixedTop: Story = {
  args: {
    message: 'Alerta fixo no topo da tela.',
    color: 'info',
    icon: '📌',
    closable: true,
    fixed: true,
    visible: true,
  },
};
