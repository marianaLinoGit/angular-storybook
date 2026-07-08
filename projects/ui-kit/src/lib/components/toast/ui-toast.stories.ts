import type { Meta, StoryObj } from '@storybook/angular';
import { toastPlaygroundPlay } from '../../storybook/play.helpers';
import { UI_ICON_NAMES } from '../icon/ui-icon.component';
import { UiToastComponent } from './ui-toast.component';

const playgroundDefaults = {
  title: 'Informação',
  text: 'Essa é uma mensagem informativa.',
  color: 'info' as const,
  variant: 'solid' as const,
  size: 'md' as const,
  shadow: 'sm' as const,
  icon: null as (typeof UI_ICON_NAMES)[number] | null,
  showIcon: true,
  position: 'top-right' as const,
  presentationMode: 'inline' as const,
  closable: true,
  closeAriaLabel: 'Fechar notificação',
  duration: 5000,
  ariaLive: 'polite' as const,
  customClass: '',
};

const meta: Meta<UiToastComponent> = {
  title: 'Components/Toast',
  component: UiToastComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|Success|Warning|Danger|Solid|Outline|WithoutShadow|MediumShadow|WithoutIcon|NotClosable)$/,
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
      table: { category: 'Conteúdo' },
      description:
        'Título principal da notificação. É associado via aria-labelledby.',
    },
    text: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Mensagem da notificação. É associada via aria-describedby.',
    },
    icon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Conteúdo' },
      description:
        'Ícone visual exibido antes do conteúdo via `ui-icon`. Quando omitido, usa o ícone padrão da cor.',
    },
    showIcon: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe ou oculta o ícone decorativo.',
    },
    color: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
      table: { category: 'Aparência' },
      description: 'Cor semântica da notificação.',
    },
    variant: {
      control: 'radio',
      options: ['soft', 'solid', 'outline'],
      table: { category: 'Aparência' },
      description: 'Variação visual do toast.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description: 'Tamanho visual do toast.',
    },
    shadow: {
      control: 'radio',
      options: ['none', 'sm', 'md'],
      table: { category: 'Aparência' },
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
      table: { category: 'Layout' },
      description:
        'Posição do toast quando presentationMode estiver como fixed.',
    },
    presentationMode: {
      control: 'radio',
      options: ['inline', 'fixed'],
      table: { category: 'Layout' },
      description:
        'Modo de apresentação. Use inline na documentação e fixed em uso real.',
    },
    closable: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe ou oculta o botão de fechar.',
    },
    closeAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Texto acessível do botão de fechar.',
    },
    duration: {
      control: 'number',
      table: { category: 'Comportamento' },
      description:
        'Duração sugerida em milissegundos. Pode ser usada pelo consumidor para auto-dismiss.',
    },
    ariaLive: {
      control: 'radio',
      options: ['polite', 'assertive'],
      table: { category: 'Acessibilidade' },
      description:
        'Define a prioridade do anúncio por leitores de tela. Use assertive apenas para mensagens urgentes.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS customizada.',
    },
    closed: {
      action: 'closed',
      table: { category: 'Events' },
      description: 'Evento disparado quando o toast é fechado.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiToastComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  parameters: {
    docs: {
      description: {
        story: 'Modelo interativo com **todas as opções** disponíveis nos controles.',
      },
    },
  },
  args: { ...playgroundDefaults },
  play: toastPlaygroundPlay,
};

export const Default: Story = {
  args: { ...playgroundDefaults },
};

export const Success: Story = {
  args: {
    ...playgroundDefaults,
    title: 'Sucesso',
    text: 'Operação realizada com sucesso.',
    color: 'success',
    icon: 'check-circle',
  },
};

export const Warning: Story = {
  args: {
    ...playgroundDefaults,
    title: 'Atenção',
    text: 'Revise as informações antes de continuar.',
    color: 'warning',
    icon: 'warning',
  },
};

export const Danger: Story = {
  args: {
    ...playgroundDefaults,
    title: 'Erro',
    text: 'Não foi possível concluir a operação.',
    color: 'danger',
    icon: 'alert',
    ariaLive: 'assertive',
  },
};

export const Solid: Story = {
  args: {
    ...playgroundDefaults,
    variant: 'solid',
  },
};

export const Outline: Story = {
  args: {
    ...playgroundDefaults,
    variant: 'outline',
  },
};

export const WithoutShadow: Story = {
  args: {
    ...playgroundDefaults,
    shadow: 'none',
  },
};

export const MediumShadow: Story = {
  args: {
    ...playgroundDefaults,
    shadow: 'md',
  },
};

export const WithoutIcon: Story = {
  args: {
    ...playgroundDefaults,
    icon: null,
    showIcon: false,
  },
};

export const NotClosable: Story = {
  args: {
    ...playgroundDefaults,
    closable: false,
  },
};
