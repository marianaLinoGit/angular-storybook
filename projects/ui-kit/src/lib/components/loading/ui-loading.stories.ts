import type { Meta, StoryObj } from '@storybook/angular';
import { UiLoadingComponent } from './ui-loading.component';

const meta: Meta<UiLoadingComponent> = {
  title: 'Components/Loading',
  component: UiLoadingComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'spinner',
        'dots',
        'skeleton-text',
        'skeleton-card',
        'skeleton-table',
        'skeleton-avatar',
      ],
      description:
        'Tipo de indicador de carregamento exibido: spinner, dots ou variações de skeleton.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description:
        'Tamanho visual do indicador. Nos skeletons, também altera a largura máxima.',
    },
    message: {
      control: 'text',
      description:
        'Mensagem opcional exibida abaixo do indicador e associada via aria-describedby.',
    },
    skeletonRows: {
      control: {
        type: 'number',
        min: 1,
        max: 12,
        step: 1,
      },
      description:
        'Quantidade de linhas exibidas nos skeletons de texto, card, tabela e avatar.',
    },
    overlay: {
      control: 'boolean',
      description:
        'Exibe o loading sobre um overlay cobrindo o conteúdo da página ou container.',
    },
    overlayMode: {
      control: 'radio',
      options: ['fixed', 'absolute'],
      description:
        'Modo de posicionamento do overlay. Use absolute no Storybook e fixed em telas reais.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Texto anunciado por leitores de tela para identificar o estado de carregamento.',
    },
  },
};

export default meta;

type Story = StoryObj<UiLoadingComponent>;

export const Spinner: Story = {
  args: {
    type: 'spinner',
    size: 'md',
    message: 'Carregando...',
    skeletonRows: 4,
    overlay: false,
    overlayMode: 'fixed',
    ariaLabel: 'Carregando conteúdo',
  },
};

export const Dots: Story = {
  args: {
    type: 'dots',
    size: 'lg',
    message: 'Processando...',
    skeletonRows: 4,
    overlay: false,
    overlayMode: 'fixed',
    ariaLabel: 'Processando solicitação',
  },
};

export const SkeletonText: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'skeleton-text',
    size: 'md',
    message: null,
    skeletonRows: 4,
    overlay: false,
    overlayMode: 'fixed',
    ariaLabel: 'Carregando texto',
  },
};

export const SkeletonCard: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'skeleton-card',
    size: 'md',
    message: null,
    skeletonRows: 3,
    overlay: false,
    overlayMode: 'fixed',
    ariaLabel: 'Carregando card',
  },
};

export const SkeletonTable: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'skeleton-table',
    size: 'lg',
    message: null,
    skeletonRows: 5,
    overlay: false,
    overlayMode: 'fixed',
    ariaLabel: 'Carregando tabela',
  },
};

export const SkeletonAvatar: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'skeleton-avatar',
    size: 'md',
    message: null,
    skeletonRows: 2,
    overlay: false,
    overlayMode: 'fixed',
    ariaLabel: 'Carregando perfil',
  },
};

export const SkeletonRows: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'skeleton-table',
    size: 'lg',
    message: null,
    skeletonRows: 8,
    overlay: false,
    overlayMode: 'fixed',
    ariaLabel: 'Carregando tabela com múltiplas linhas',
  },
};

export const Overlay: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative; width: 420px; height: 260px; border: 1px solid #ddd; border-radius: 12px; overflow: hidden;">
        <div style="padding: 24px;">
          <h3 style="margin-top: 0;">Conteúdo da página</h3>
          <p>Esse conteúdo está sendo coberto pelo loading em modo overlay.</p>
        </div>

        <ui-loading
          [type]="type"
          [size]="size"
          [message]="message"
          [skeletonRows]="skeletonRows"
          [overlay]="overlay"
          [overlayMode]="overlayMode"
          [ariaLabel]="ariaLabel"
        />
      </div>
    `,
  }),
  args: {
    type: 'spinner',
    size: 'lg',
    message: 'Carregando página...',
    skeletonRows: 4,
    overlay: true,
    overlayMode: 'absolute',
    ariaLabel: 'Carregando página',
  },
};
