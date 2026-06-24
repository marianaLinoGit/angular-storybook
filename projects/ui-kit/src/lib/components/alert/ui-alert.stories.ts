import type { Meta, StoryObj } from '@storybook/angular';
import { UiAlertComponent } from './ui-alert.component';

const meta: Meta<UiAlertComponent> = {
  title: 'Components/Alert',
  component: UiAlertComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
    },
    variant: {
      control: 'select',
      options: ['soft', 'solid', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: 'text',
    },
    closable: {
      control: 'boolean',
    },
    fixed: {
      control: 'boolean',
    },
    position: {
      control: 'radio',
      options: ['top', 'bottom'],
    },
    customClass: {
      control: 'text',
    },
    closed: {
      action: 'closed',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<UiAlertComponent>;

export const Info: Story = {
  args: {
    title: 'Informação',
    message: 'Mensagem informativa para o usuário.',
    color: 'info',
    variant: 'soft',
    size: 'md',
    icon: 'ℹ️',
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Success: Story = {
  args: {
    title: 'Sucesso',
    message: 'Operação realizada com sucesso.',
    color: 'success',
    variant: 'soft',
    size: 'md',
    icon: '✅',
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Warning: Story = {
  args: {
    title: 'Atenção',
    message: 'Revise as informações antes de continuar.',
    color: 'warning',
    variant: 'soft',
    size: 'md',
    icon: '⚠️',
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Danger: Story = {
  args: {
    title: 'Erro',
    message: 'Não foi possível salvar os dados.',
    color: 'danger',
    variant: 'soft',
    size: 'md',
    icon: '❌',
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Solid: Story = {
  args: {
    title: 'Alerta sólido',
    message: 'Essa variação usa fundo preenchido.',
    color: 'info',
    variant: 'solid',
    size: 'md',
    icon: '📌',
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const Outline: Story = {
  args: {
    title: 'Alerta outline',
    message: 'Essa variação usa borda e fundo neutro.',
    color: 'success',
    variant: 'outline',
    size: 'md',
    icon: '✅',
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Sem ícone',
    message: 'Esse alerta é exibido sem ícone inicial.',
    color: 'info',
    variant: 'soft',
    size: 'md',
    icon: '',
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const WithoutTitle: Story = {
  args: {
    title: '',
    message: 'Esse alerta possui apenas mensagem.',
    color: 'warning',
    variant: 'soft',
    size: 'md',
    icon: '⚠️',
    closable: true,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const NotClosable: Story = {
  args: {
    title: 'Alerta fixo',
    message: 'Esse alerta não possui botão para fechar.',
    color: 'danger',
    variant: 'soft',
    size: 'md',
    icon: '❌',
    closable: false,
    fixed: false,
    position: 'top',
    customClass: '',
  },
};

export const FixedTop: Story = {
  args: {
    title: 'Topo da tela',
    message: 'Alerta fixo no topo da tela.',
    color: 'info',
    variant: 'soft',
    size: 'md',
    icon: '📌',
    closable: true,
    fixed: true,
    position: 'top',
    customClass: '',
  },
};

export const FixedBottom: Story = {
  args: {
    title: 'Rodapé da tela',
    message: 'Alerta fixo na parte inferior da tela.',
    color: 'success',
    variant: 'soft',
    size: 'md',
    icon: '✅',
    closable: true,
    fixed: true,
    position: 'bottom',
    customClass: '',
  },
};
