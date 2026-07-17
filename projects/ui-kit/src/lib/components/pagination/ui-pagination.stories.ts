import type { Meta, StoryObj } from '@storybook/angular';
import { paginationPlaygroundPlay } from '../../storybook/play.helpers';
import { UiPaginationComponent } from './ui-pagination.component';

const playgroundDefaults = {
  currentPageIndex: 2,
  totalPages: 5,
  showControls: true,
  showFirstLast: true,
  showPageSize: true,
  currentPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
  loading: false,
  disabled: false,
  size: 'sm' as const,
  previousLabel: 'Anterior',
  nextLabel: 'Próxima',
  firstLabel: 'Primeira',
  lastLabel: 'Última',
  pageLabel: 'Página',
  ofLabel: 'de',
  pageSizeLabel: 'Itens por página',
  pageSizeAriaLabel: null as string | null,
  ariaLabel: 'Paginação de resultados',
};

type UiPaginationStoryArgs = {
  currentPageIndex: number;
  totalPages: number;
  showControls: boolean;
  showFirstLast: boolean;
  showPageSize: boolean;
  currentPageSize: number;
  pageSizeOptions: number[];
  loading: boolean;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
  previousLabel: string;
  nextLabel: string;
  firstLabel: string;
  lastLabel: string;
  pageLabel: string;
  ofLabel: string;
  pageSizeLabel: string | null;
  pageSizeAriaLabel: string | null;
  ariaLabel: string;
};

const meta: Meta<UiPaginationStoryArgs> = {
  title: 'Components/Pagination',
  component: UiPaginationComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|ControlesApenas|ComSeletor|SemPrimeiraUltima|PrimeiraPagina|UltimaPagina|PaginaUnica|Sizes|Loading|Disabled)$/,
  decorators: [
    (story) => ({
      ...story(),
      styles: [
        `
        :host {
          display: block;
          padding: var(--ui-space-4);
        }
        .demo-stack {
          display: grid;
          gap: var(--ui-space-5);
        }
        .demo-stack__label {
          margin: 0 0 var(--ui-space-2);
          font-size: var(--ui-font-size-sm, 0.875rem);
          color: var(--ui-color-text-muted, #667085);
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
          'Controles de paginação reutilizáveis com navegação primeira/anterior/próxima/última, indicador de página e seletor opcional de itens por página.\n\n' +
          '**Mobile (< 768px):** os botões exibem símbolos compactos (`<<`, `<`, `>`, `>>`); o texto acessível (`aria-label`) permanece o label completo.\n\n' +
          '**Uso:** informe `pageIndex` e `totalPages`. Escute `pageIndexChange` e `pageSizeChange` para atualizar o estado no componente pai.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      handlePageIndexChange(index: number) {
        this['currentPageIndex'] = index;
      },
      handlePageSizeChange(size: number) {
        this['currentPageSize'] = size;
        this['currentPageIndex'] = 1;
      },
    },
    template: `
      <ui-pagination
        [pageIndex]="currentPageIndex"
        [totalPages]="totalPages"
        [showControls]="showControls"
        [showFirstLast]="showFirstLast"
        [showPageSize]="showPageSize"
        [pageSize]="currentPageSize"
        [pageSizeOptions]="pageSizeOptions"
        [loading]="loading"
        [disabled]="disabled"
        [size]="size"
        [previousLabel]="previousLabel"
        [nextLabel]="nextLabel"
        [firstLabel]="firstLabel"
        [lastLabel]="lastLabel"
        [pageLabel]="pageLabel"
        [ofLabel]="ofLabel"
        [pageSizeLabel]="pageSizeLabel"
        [pageSizeAriaLabel]="pageSizeAriaLabel"
        [ariaLabel]="ariaLabel"
        (pageIndexChange)="handlePageIndexChange($event)"
        (pageSizeChange)="handlePageSizeChange($event)"
      />
    `,
  }),
  argTypes: {
    currentPageIndex: {
      name: 'pageIndex',
      control: { type: 'number', min: 1, step: 1 },
      table: { category: 'Conteúdo' },
      description: 'Página atual (base 1).',
    },
    totalPages: {
      control: { type: 'number', min: 1, step: 1 },
      table: { category: 'Conteúdo' },
      description: 'Quantidade total de páginas.',
    },
    currentPageSize: {
      name: 'pageSize',
      control: { type: 'number', min: 1, step: 1 },
      table: { category: 'Conteúdo' },
      description: 'Valor selecionado no seletor de itens por página.',
    },
    pageSizeOptions: {
      control: 'object',
      table: { category: 'Conteúdo' },
      description: 'Opções numéricas disponíveis no seletor de itens por página.',
    },
    previousLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto do botão de página anterior.',
    },
    nextLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto do botão de próxima página.',
    },
    firstLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto do botão da primeira página.',
    },
    lastLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Texto do botão da última página.',
    },
    pageLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Rótulo exibido antes do número da página atual.',
    },
    ofLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Separador entre página atual e total de páginas.',
    },
    pageSizeLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description:
        'Rótulo visível do seletor de itens por página. Quando vazio ou omitido, nenhum rótulo é exibido.',
    },
    showControls: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe botões anterior/próxima e indicador de página.',
    },
    showFirstLast: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe botões de primeira e última página.',
    },
    showPageSize: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Exibe o seletor de itens por página.',
    },
    loading: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita a navegação enquanto o conteúdo está carregando.',
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Estado' },
      description: 'Desabilita todos os controles interativos.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description: 'Tamanho dos botões e do seletor.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description: 'Nome acessível da região de navegação (`<nav>`).',
    },
    pageSizeAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
      description:
        'Texto acessível do seletor de itens por página. Quando vazio, usa `pageSizeLabel` ou "Itens por página".',
    },
  },
  args: { ...playgroundDefaults },
};

export default meta;

type Story = StoryObj<UiPaginationStoryArgs>;

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
  play: paginationPlaygroundPlay,
};

export const ControlesApenas: Story = {
  parameters: {
    docs: {
      description: { story: 'Apenas navegação entre páginas, sem seletor de tamanho.' },
    },
  },
  args: { ...playgroundDefaults, showPageSize: false },
};

export const ComSeletor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Paginação com seletor de itens por página visível.',
      },
    },
  },
  args: { ...playgroundDefaults, showPageSize: true },
};

export const SemPrimeiraUltima: Story = {
  name: 'Sem primeira/última',
  parameters: {
    docs: {
      description: {
        story:
          'Com `showFirstLast=false`, apenas botões anterior/próxima e indicador de página.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    showFirstLast: false,
    showPageSize: false,
  },
};

export const PrimeiraPagina: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Botões primeira e anterior desabilitados na primeira página.',
      },
    },
  },
  args: { ...playgroundDefaults, currentPageIndex: 1, showPageSize: false },
};

export const UltimaPagina: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Botões próxima e última desabilitados na última página.',
      },
    },
  },
  args: { ...playgroundDefaults, currentPageIndex: 5, totalPages: 5, showPageSize: false },
};

export const PaginaUnica: Story = {
  parameters: {
    docs: {
      description: { story: 'Ambos os botões desabilitados quando há apenas uma página.' },
    },
  },
  args: { ...playgroundDefaults, currentPageIndex: 1, totalPages: 1, showPageSize: false },
};

export const Sizes: Story = {
  name: 'Tamanhos sm / md / lg',
  parameters: {
    docs: {
      description: {
        story: 'Comparação visual dos tamanhos `sm`, `md` e `lg`.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      sizes: ['sm', 'md', 'lg'] as const,
      handlePageIndexChange(index: number) {
        this['currentPageIndex'] = index;
      },
      handlePageSizeChange(size: number) {
        this['currentPageSize'] = size;
        this['currentPageIndex'] = 1;
      },
    },
    template: `
      <div class="demo-stack">
        @for (s of sizes; track s) {
          <div>
            <p class="demo-stack__label">{{ s }}</p>
            <ui-pagination
              [pageIndex]="currentPageIndex"
              [totalPages]="totalPages"
              [showControls]="true"
              [showFirstLast]="showFirstLast"
              [showPageSize]="false"
              [size]="s"
              [previousLabel]="previousLabel"
              [nextLabel]="nextLabel"
              [firstLabel]="firstLabel"
              [lastLabel]="lastLabel"
              [pageLabel]="pageLabel"
              [ofLabel]="ofLabel"
              [ariaLabel]="ariaLabel + ' (' + s + ')'"
              (pageIndexChange)="handlePageIndexChange($event)"
            />
          </div>
        }
      </div>
    `,
  }),
  args: { ...playgroundDefaults, showPageSize: false },
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: { story: 'Controles desabilitados durante carregamento.' },
    },
  },
  args: { ...playgroundDefaults, loading: true, showPageSize: false },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: 'Estado desabilitado manualmente.' },
    },
  },
  args: { ...playgroundDefaults, disabled: true, showPageSize: false },
};
