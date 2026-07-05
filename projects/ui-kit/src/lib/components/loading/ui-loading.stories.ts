import type { Meta, StoryObj } from '@storybook/angular';
import { loadingPlaygroundPlay } from '../../storybook/play.helpers';
import { UiLoadingComponent } from './ui-loading.component';

const playgroundDefaults = {
  type: 'spinner' as const,
  size: 'md' as const,
  message: 'Carregando...',
  skeletonRows: 4,
  overlay: false,
  overlayMode: 'fixed' as const,
  ariaLabel: 'Carregando conteúdo',
};

const meta: Meta<UiLoadingComponent> = {
  title: 'Components/Loading',
  component: UiLoadingComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Spinner|Dots|SkeletonText|SkeletonCard|SkeletonTable|SkeletonAvatar|SkeletonRows)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          padding: var(--ui-space-4);
        }
        `,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Indicadores de carregamento do design system: spinner, dots e skeletons.\n\n' +
          '**Uso:** informe `type` e opcionalmente `message`. Use `overlay` para cobrir conteúdo existente.',
      },
    },
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
      table: { category: 'Conteúdo' },
      description:
        'Tipo de indicador: `spinner`, `dots` ou variações de skeleton (`skeleton-text`, `skeleton-card`, `skeleton-table`, `skeleton-avatar`).',
    },
    message: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Mensagem opcional exibida abaixo do indicador. Associada via `aria-describedby`.',
    },
    skeletonRows: {
      control: { type: 'number', min: 1, max: 12, step: 1 },
      table: { category: 'Conteúdo' },
      description:
        'Quantidade de linhas nos skeletons de texto, card, tabela e avatar.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description:
        'Tamanho visual do indicador. Nos skeletons, também altera a largura máxima.',
    },
    overlay: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Exibe o loading sobre um overlay cobrindo o conteúdo da página ou container.',
    },
    overlayMode: {
      control: 'radio',
      options: ['fixed', 'absolute'],
      table: { category: 'Estado' },
      description:
        'Posicionamento do overlay. Use `absolute` dentro de containers; `fixed` em telas reais.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto anunciado por leitores de tela para identificar o estado de carregamento.',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiLoadingComponent>;

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
  play: loadingPlaygroundPlay,
};

export const Spinner: Story = {
  parameters: {
    docs: { description: { story: 'Spinner circular com mensagem opcional.' } },
  },
  args: { ...playgroundDefaults },
};

export const Dots: Story = {
  parameters: {
    docs: { description: { story: 'Indicador animado com três pontos.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'dots',
    size: 'lg',
    message: 'Processando...',
    ariaLabel: 'Processando solicitação',
  },
};

export const SkeletonText: Story = {
  parameters: {
    docs: { description: { story: 'Skeleton de blocos de texto.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'skeleton-text',
    message: null,
  },
};

export const SkeletonCard: Story = {
  parameters: {
    docs: { description: { story: 'Skeleton simulando um card.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'skeleton-card',
    message: null,
    skeletonRows: 3,
    ariaLabel: 'Carregando card',
  },
};

export const SkeletonTable: Story = {
  parameters: {
    docs: { description: { story: 'Skeleton simulando linhas de tabela.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'skeleton-table',
    size: 'lg',
    message: null,
    skeletonRows: 5,
    ariaLabel: 'Carregando tabela',
  },
};

export const SkeletonAvatar: Story = {
  parameters: {
    docs: { description: { story: 'Skeleton com avatar e linhas de texto.' } },
  },
  args: {
    ...playgroundDefaults,
    type: 'skeleton-avatar',
    message: null,
    skeletonRows: 2,
    ariaLabel: 'Carregando perfil',
  },
};

export const SkeletonRows: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Skeleton de tabela com quantidade customizada de linhas.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    type: 'skeleton-table',
    size: 'lg',
    message: null,
    skeletonRows: 8,
    ariaLabel: 'Carregando tabela com múltiplas linhas',
  },
};

export const Overlay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Loading em modo overlay cobrindo conteúdo dentro de um container.',
      },
    },
  },
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
    ...playgroundDefaults,
    type: 'spinner',
    size: 'lg',
    message: 'Carregando página...',
    overlay: true,
    overlayMode: 'absolute',
    ariaLabel: 'Carregando página',
  },
};
