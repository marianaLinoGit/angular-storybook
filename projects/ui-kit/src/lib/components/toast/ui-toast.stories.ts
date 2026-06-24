import type { Meta, StoryObj } from '@storybook/angular';
import { UiToastComponent } from './ui-toast.component';

const meta: Meta<UiToastComponent> = {
  title: 'Components/Toast',
  component: UiToastComponent,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',

    docs: {
      story: {
        height: '180px',
      },
    },
  },

  argTypes: {
    title: {
      control: 'text',
    },

    text: {
      control: 'text',
    },

    icon: {
      control: 'text',
    },

    color: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
    },

    variant: {
      control: 'radio',
      options: ['soft', 'solid', 'outline'],
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },

    shadow: {
      control: 'radio',
      options: ['none', 'sm', 'md'],
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

    presentationMode: {
      control: 'radio',
      options: ['inline', 'fixed'],
    },

    closable: {
      control: 'boolean',
    },

    duration: {
      control: 'number',
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

type Story = StoryObj<UiToastComponent>;

export const Default: Story = {
  args: {
    title: 'Informação',
    text: 'Essa é uma mensagem informativa.',
    color: 'info',
    variant: 'soft',
    size: 'md',
    shadow: 'sm',
    icon: 'ℹ️',
    position: 'top-right',
    presentationMode: 'inline',
    closable: true,
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    title: 'Sucesso',
    text: 'Operação realizada com sucesso.',
    color: 'success',
    icon: '✅',
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    title: 'Atenção',
    color: 'warning',
    icon: '⚠️',
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    title: 'Erro',
    color: 'danger',
    icon: '❌',
  },
};

export const Solid: Story = {
  args: {
    ...Default.args,
    variant: 'solid',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
};

export const WithoutShadow: Story = {
  args: {
    ...Default.args,
    shadow: 'none',
  },
};

export const MediumShadow: Story = {
  args: {
    ...Default.args,
    shadow: 'md',
  },
};

export const WithoutIcon: Story = {
  args: {
    ...Default.args,
    icon: '',
  },
};

export const NotClosable: Story = {
  args: {
    ...Default.args,
    closable: false,
  },
};
