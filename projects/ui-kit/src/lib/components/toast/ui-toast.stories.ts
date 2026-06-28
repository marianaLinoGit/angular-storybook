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
      description:
        'Título principal da notificação. É associado via aria-labelledby.',
    },
    text: {
      control: 'text',
      description: 'Mensagem da notificação. É associada via aria-describedby.',
    },
    icon: {
      control: 'text',
      description:
        'Ícone visual exibido antes do conteúdo. É decorativo e oculto de leitores de tela.',
    },
    color: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
      description: 'Cor semântica da notificação.',
    },
    variant: {
      control: 'radio',
      options: ['soft', 'solid', 'outline'],
      description: 'Variação visual do toast.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho visual do toast.',
    },
    shadow: {
      control: 'radio',
      options: ['none', 'sm', 'md'],
      description: 'Intensidade da sombra aplicada ao toast.',
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
      description:
        'Posição do toast quando presentationMode estiver como fixed.',
    },
    presentationMode: {
      control: 'radio',
      options: ['inline', 'fixed'],
      description:
        'Modo de apresentação. Use inline na documentação e fixed em uso real.',
    },
    closable: {
      control: 'boolean',
      description: 'Exibe ou oculta o botão de fechar.',
    },
    closeAriaLabel: {
      control: 'text',
      description: 'Texto acessível do botão de fechar.',
    },
    duration: {
      control: 'number',
      description:
        'Duração sugerida em milissegundos. Pode ser usada pelo consumidor para auto-dismiss.',
    },
    ariaLive: {
      control: 'radio',
      options: ['polite', 'assertive'],
      description:
        'Define a prioridade do anúncio por leitores de tela. Use assertive apenas para mensagens urgentes.',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS customizada.',
    },
    closed: {
      action: 'closed',
      table: {
        category: 'Events',
      },
      description: 'Evento disparado quando o toast é fechado.',
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
    closeAriaLabel: 'Fechar notificação',
    duration: 5000,
    ariaLive: 'polite',
    customClass: '',
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
    text: 'Revise as informações antes de continuar.',
    color: 'warning',
    icon: '⚠️',
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    title: 'Erro',
    text: 'Não foi possível concluir a operação.',
    color: 'danger',
    icon: '❌',
    ariaLive: 'assertive',
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
    icon: null,
  },
};

export const NotClosable: Story = {
  args: {
    ...Default.args,
    closable: false,
  },
};
