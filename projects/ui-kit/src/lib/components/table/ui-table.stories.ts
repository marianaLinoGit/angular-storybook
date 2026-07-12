import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { tablePlaygroundPlay } from '../../storybook/play.helpers';
import { UiBadgeComponent } from '../badge/ui-badge.component';
import { UiButtonComponent } from '../button/ui-button.component';
import { UI_ICON_NAMES, UiIconName } from '../icon/ui-icon.component';
import {
  getUiTableBodyCellClasses,
  resolveUiTableBadge,
  UiTableColumn,
  UiTableComponent,
  UiTablePaginationPosition,
  UiTableSize,
  UiTableSortChange,
  UiTableSortDir,
} from './ui-table.component';

type InviteStatus = 'PENDING' | 'ACCEPTED' | 'REVOKED' | 'EXPIRED';

type VetInviteDemoRow = {
  id: string;
  pet_name: string;
  owner: {
    full_name: string;
    email: string;
  };
  status: InviteStatus;
};

const inviteColumns: UiTableColumn[] = [
  {
    key: 'pet_name',
    label: 'Pet',
    sortable: true,
    minWidth: '180px',
  },
  {
    key: 'owner.full_name',
    label: 'Tutor',
    sortable: true,
    hideMobile: true,
    minWidth: '220px',
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    hideMobile: true,
    align: 'center',
    headerAlign: 'center',
    width: '140px',
    badge: {
      map: {
        PENDING: { label: 'Pendente', type: 'warning' },
        ACCEPTED: { label: 'Aceito', type: 'success' },
        REVOKED: { label: 'Revogado', type: 'danger' },
        EXPIRED: { label: 'Expirado', type: 'warning' },
      },
      defaultType: 'default',
    },
  },
  {
    key: 'actions',
    label: 'Ações',
    isActions: true,
    width: '180px',
  },
];

const inviteRows: VetInviteDemoRow[] = [
  {
    id: '1',
    pet_name: 'Dino',
    owner: { full_name: 'Mariana Lino', email: 'mariana@email.com' },
    status: 'PENDING',
  },
  {
    id: '2',
    pet_name: 'Lessie',
    owner: { full_name: 'João Silva', email: 'joao@email.com' },
    status: 'ACCEPTED',
  },
  {
    id: '3',
    pet_name: 'Diana Prince',
    owner: { full_name: 'Ana Souza', email: 'ana@email.com' },
    status: 'EXPIRED',
  },
  {
    id: '4',
    pet_name: 'Dorothy Cake',
    owner: { full_name: 'Bruno Lima', email: 'bruno@email.com' },
    status: 'REVOKED',
  },
  {
    id: '5',
    pet_name: 'Nala',
    owner: { full_name: 'Carla Mendes', email: 'carla@email.com' },
    status: 'PENDING',
  },
  {
    id: '6',
    pet_name: 'Arlequina',
    owner: { full_name: 'Diego Rocha', email: 'diego@email.com' },
    status: 'ACCEPTED',
  },
];

function statusLabel(status: InviteStatus): string {
  const map: Record<InviteStatus, string> = {
    PENDING: 'Pendente',
    ACCEPTED: 'Aceito',
    REVOKED: 'Revogado',
    EXPIRED: 'Expirado',
  };

  return map[status];
}

function sortValue(row: VetInviteDemoRow, sortBy: string): string {
  if (sortBy === 'pet_name') return row.pet_name;
  if (sortBy === 'owner.full_name') return row.owner.full_name;
  if (sortBy === 'status') return row.status;
  return '';
}

@Component({
  standalone: true,
  selector: 'ui-table-playground',
  imports: [CommonModule, UiBadgeComponent, UiButtonComponent, UiTableComponent],
  styles: [
    `
      .demo-pet strong {
        display: block;
        color: var(--ui-color-primary);
        font-weight: var(--ui-font-weight-semibold);
      }

      .demo-mobile-text {
        display: none;
        font-size: var(--ui-font-size-xs);
        color: var(--ui-color-muted);
      }

      @media (max-width: 767px) {
        .demo-mobile-text {
          display: inline;
        }
      }
    `,
  ],
  template: `
    <ui-table
      [columns]="columns()"
      [total]="displayTotal()"
      [pageIndex]="pageIndex()"
      [pageSize]="pageSize()"
      [pageSizeOptions]="pageSizeOptions()"
      [sortBy]="sortBy()"
      [sortDir]="sortDir()"
      [loading]="loading()"
      [hasFilters]="hasFilters()"
      [showPagination]="showPagination()"
      [showPaginationWhenSinglePage]="showPaginationWhenSinglePage()"
      [showPageSize]="showPageSize()"
      [showTotal]="showTotal()"
      [paginationPosition]="paginationPosition()"
      [size]="size()"
      [hover]="hover()"
      [stickyHeader]="stickyHeader()"
      [bordered]="bordered()"
      [fullWidth]="fullWidth()"
      [customClass]="customClass()"
      [skeletonRows]="skeletonRows()"
      [skeletonColumns]="skeletonColumns()"
      [emptyIcon]="emptyIcon()"
      [emptyTitle]="emptyTitle()"
      [emptyDescription]="emptyDescription()"
      [noResultsIcon]="noResultsIcon()"
      [noResultsTitle]="noResultsTitle()"
      [noResultsDescription]="noResultsDescription()"
      [ariaLabel]="ariaLabel()"
      [previousLabel]="previousLabel()"
      [nextLabel]="nextLabel()"
      [pageSizeLabel]="pageSizeLabel()"
      [pageSizeAriaLabel]="pageSizeAriaLabel()"
      [totalLabel]="totalLabel()"
      [pageLabel]="pageLabel()"
      [ofLabel]="ofLabel()"
      (pageIndexChange)="onPageIndexChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (sortChange)="onSort($event)"
    >
      @for (row of pagedRows(); track row.id) {
        <tr>
          <td>
            <span class="demo-pet">
              <strong>{{ row.pet_name }}</strong>
              <span class="demo-mobile-text">{{ row.owner.full_name }}</span>
            </span>
          </td>

          <td class="ui-table__cell--hide-mobile">
            {{ row.owner.full_name }}
          </td>

          <td [class]="statusCellClasses">
            <ui-badge
              [label]="statusBadge(row.status).label"
              [type]="statusBadge(row.status).type"
            />
          </td>

          <td class="ui-table__cell--actions">
            <span class="ui-table__actions">
              @if (row.status === 'PENDING') {
                <ui-button label="Aprovar" size="sm" color="success" [outline]="true" type="button" />
                <ui-button
                  label="Recusar"
                  size="sm"
                  color="danger"
                  [outline]="true"
                  type="button"
                />
              } @else {
                <ui-badge
                  [label]="statusBadge(row.status).label"
                  [type]="statusBadge(row.status).type"
                />
              }
            </span>
          </td>
        </tr>
      }
    </ui-table>
  `,
})
class UiTablePlaygroundComponent {
  columns = input<UiTableColumn[]>(inviteColumns);
  data = input<VetInviteDemoRow[]>(inviteRows);
  forceEmpty = input(false);

  readonly statusColumn = inviteColumns.find((column) => column.key === 'status')!;
  readonly statusCellClasses = getUiTableBodyCellClasses(this.statusColumn);
  readonly statusBadge = (status: InviteStatus) =>
    resolveUiTableBadge(this.statusColumn, status, statusLabel(status));

  loading = input(false);
  hasFilters = input(false);

  showPagination = input(true);
  showPaginationWhenSinglePage = input(false);
  showPageSize = input(true);
  showTotal = input(true);
  paginationPosition = input<UiTablePaginationPosition>('bottom');
  pageSizeOptions = input<number[]>([3, 5, 10, 20, 50]);

  size = input<UiTableSize>('md');
  hover = input(true);
  stickyHeader = input(false);
  bordered = input(true);
  fullWidth = input(true);
  customClass = input('');

  skeletonRows = input(5);
  skeletonColumns = input<number | null>(null);

  emptyIcon = input<UiIconName | null>('folder');
  emptyTitle = input('Nenhum convite cadastrado');
  emptyDescription = input(
    'Quando um tutor compartilhar um pet com você, ele aparecerá aqui.',
  );

  noResultsIcon = input<UiIconName | null>('filter');
  noResultsTitle = input('Nenhum convite encontrado');
  noResultsDescription = input(
    'Tente ajustar os filtros para encontrar o que procura.',
  );

  ariaLabel = input('Tabela de convites veterinários');
  previousLabel = input('Anterior');
  nextLabel = input('Próxima');
  pageSizeLabel = input<string | null>(null);
  pageSizeAriaLabel = input<string | null>(null);
  totalLabel = input('registro(s)');
  pageLabel = input('Página');
  ofLabel = input('de');

  initialPageSize = input(3);

  pageIndex = signal(1);
  pageSize = signal(3);
  sortBy = signal('pet_name');
  sortDir = signal<UiTableSortDir>('asc');

  readonly currentRows = computed(() => (this.forceEmpty() ? [] : this.data()));

  readonly sortedRows = computed(() =>
    this.sortRows(this.currentRows(), this.sortBy(), this.sortDir()),
  );

  readonly displayTotal = computed(() => this.sortedRows().length);

  readonly pagedRows = computed(() => {
    const size = this.pageSize();
    const start = (this.pageIndex() - 1) * size;
    return this.sortedRows().slice(start, start + size);
  });

  statusLabel = statusLabel;

  constructor() {
    effect(() => {
      this.initialPageSize();
      this.forceEmpty();
      this.data();
      this.pageSize.set(this.initialPageSize());
      this.pageIndex.set(1);
    });
  }

  onPageIndexChange(value: number): void {
    this.pageIndex.set(value);
  }

  onSort(event: UiTableSortChange): void {
    this.sortBy.set(event.sortBy);
    this.sortDir.set(event.sortDir);
    this.pageIndex.set(1);
  }

  onPageSizeChange(value: number): void {
    this.pageSize.set(value);
    this.pageIndex.set(1);
  }

  private sortRows(
    data: VetInviteDemoRow[],
    sortBy: string,
    sortDir: UiTableSortDir,
  ): VetInviteDemoRow[] {
    return [...data].sort((a, b) => {
      const result = sortValue(a, sortBy).localeCompare(sortValue(b, sortBy), 'pt-BR', {
        sensitivity: 'base',
      });

      return sortDir === 'asc' ? result : result * -1;
    });
  }
}

const playgroundDefaults = {
  columns: inviteColumns,
  data: inviteRows,
  loading: false,
  hasFilters: false,
  forceEmpty: false,
  showPagination: true,
  showPaginationWhenSinglePage: true,
  showPageSize: true,
  showTotal: true,
  paginationPosition: 'both' as UiTablePaginationPosition,
  pageSizeOptions: [3, 5, 10, 20, 50],
  initialPageSize: 3,
  size: 'md' as UiTableSize,
  hover: true,
  stickyHeader: true,
  bordered: true,
  fullWidth: true,
  customClass: '',
  skeletonRows: 5,
  skeletonColumns: null as number | null,
  emptyIcon: 'folder' as UiIconName,
  emptyTitle: 'Nenhum convite cadastrado',
  emptyDescription:
    'Quando um tutor compartilhar um pet com você, ele aparecerá aqui.',
  noResultsIcon: 'filter' as UiIconName,
  noResultsTitle: 'Nenhum convite encontrado',
  noResultsDescription: 'Tente ajustar os filtros para encontrar o que procura.',
  ariaLabel: 'Tabela de convites veterinários',
  previousLabel: 'Anterior',
  nextLabel: 'Próxima',
  pageSizeLabel: null as string | null,
  pageSizeAriaLabel: null as string | null,
  totalLabel: 'registro(s)',
  pageLabel: 'Página',
  ofLabel: 'de',
};

const meta: Meta<UiTablePlaygroundComponent> = {
  title: 'Components/Table',
  component: UiTablePlaygroundComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Default|Loading|EmptyWithoutFilters|EmptyWithFilters|OnePage|MultiplePages|WithoutPagination|StickyHeaderStory|Sizes|Mobile)$/,
  decorators: [
    moduleMetadata({
      imports: [UiTablePlaygroundComponent, UiTableComponent],
    }),
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
          'Tabela do design system para listagens e CRUDs. Usa tokens de `--ui-space-*`, `--ui-font-size-*`, `--ui-radius-*` e `--ui-color-*`. Inclui header com cor primária translúcida, divisórias verticais/horizontais, rodapé unificado (total + paginação + itens por página), ordenação, skeleton, empty states, responsividade, hover, sticky header, larguras e alinhamento.\n\n' +
          '**Uso:** declare `[columns]` e projete as linhas (`<tr>`) via conteúdo. O `thead` é gerado automaticamente.\n\n' +
          '**Colunas (`UiTableColumn`):** `key`, `label`, `sortable`, `hideOn` (`mobile` | `tablet`), `hideMobile` (legado), `width`, `minWidth`, `align`, `headerAlign`, `isActions`, `badge` (mapa valor → `ui-badge`).\n\n' +
          '**Breakpoints:** mobile `<768`, tablet `768–1023`, desktop `≥1024`. Ex.: `hideOn: [\'mobile\', \'tablet\']` mostra a coluna só no desktop.\n\n' +
          '**Helpers exportados:** `resolveUiTableBadge()`, `getUiTableBodyCellClasses()`.\n\n' +
          '**Eventos:** `pageIndexChange`, `pageSizeChange`, `sortChange`.',
      },
    },
  },
  argTypes: {
    columns: {
      control: 'object',
      table: { category: 'Dados (demo)' },
      description:
        'Definição das colunas exibidas no demo. Cada coluna possui `key`, `label` e opcionalmente `sortable`, `hideMobile`, `width`, `minWidth`, `align`, `headerAlign`, `isActions` e `badge`.',
    },
    data: {
      control: 'object',
      table: { category: 'Dados (demo)' },
      description: 'Lista de registros mockados usada pelo playground para simular paginação e ordenação.',
    },
    forceEmpty: {
      control: 'boolean',
      table: { category: 'Dados (demo)' },
      description:
        'Força a lista vazia no demo, permitindo testar empty states mesmo com dados mockados disponíveis.',
    },
    initialPageSize: {
      control: { type: 'number', min: 1, max: 50, step: 1 },
      table: { category: 'Dados (demo)' },
      description:
        'Quantidade inicial de itens por página no playground. Reseta a paginação ao alterar.',
    },
    loading: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Exibe skeleton no corpo da tabela. Header e rodapé (total, paginação e itens por página) permanecem visíveis.',
    },
    hasFilters: {
      control: 'boolean',
      table: { category: 'Estado' },
      description:
        'Quando `true` e não há registros, exibe empty state de busca sem resultados. Quando `false`, exibe empty state de cadastro vazio.',
    },
    showPagination: {
      control: 'boolean',
      table: { category: 'Paginação' },
      description:
        'Exibe os controles de navegação (Anterior / Próxima) e o indicador de página atual.',
    },
    showPaginationWhenSinglePage: {
      control: 'boolean',
      table: { category: 'Paginação' },
      description:
        'Mantém a paginação visível mesmo quando todos os registros cabem em uma única página.',
    },
    showPageSize: {
      control: 'boolean',
      table: { category: 'Paginação' },
      description:
        'Exibe o seletor de quantidade de itens por página (`ui-select`, tamanho `sm`).',
    },
    showTotal: {
      control: 'boolean',
      table: { category: 'Paginação' },
      description:
        'Exibe a contagem de registros no rodapé (ex.: "1 - 5 de 25 registro(s)").',
    },
    paginationPosition: {
      control: 'select',
      options: ['top', 'bottom', 'both'],
      table: { category: 'Paginação' },
      description:
        'Posição do rodapé unificado (total + paginação + itens por página): acima da tabela, abaixo ou nos dois lados.',
    },
    pageSizeOptions: {
      control: 'object',
      table: { category: 'Paginação' },
      description:
        'Lista numérica de opções exibidas no seletor de itens por página.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Aparência' },
      description:
        'Densidade visual da tabela. Altera padding das células e tamanho da fonte via tokens.',
    },
    hover: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description:
        'Destaca a linha ao passar o mouse. Não afeta linhas de skeleton nem empty state.',
    },
    stickyHeader: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description:
        'Mantém o cabeçalho fixo ao rolar o conteúdo dentro do container da tabela.',
    },
    bordered: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description: 'Exibe borda externa ao redor da tabela.',
    },
    fullWidth: {
      control: 'boolean',
      table: { category: 'Aparência' },
      description: 'Faz a tabela ocupar 100% da largura disponível do container.',
    },
    customClass: {
      control: 'text',
      table: { category: 'Aparência' },
      description: 'Classe CSS adicional aplicada ao container principal da tabela.',
    },
    skeletonRows: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      table: { category: 'Skeleton' },
      description: 'Quantidade de linhas skeleton exibidas durante o loading.',
    },
    skeletonColumns: {
      control: { type: 'number', min: 1, max: 12, step: 1 },
      table: { category: 'Skeleton' },
      description:
        'Quantidade de colunas skeleton durante o loading. Quando `null`, usa o número de colunas definidas em `columns`.',
    },
    emptyIcon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Empty state' },
      description:
        'Ícone do empty state exibido quando não há registros e nenhum filtro está ativo. Usa o componente `ui-icon`.',
    },
    emptyTitle: {
      control: 'text',
      table: { category: 'Empty state' },
      description:
        'Título do empty state inicial (sem filtros aplicados).',
    },
    emptyDescription: {
      control: 'text',
      table: { category: 'Empty state' },
      description:
        'Texto complementar do empty state inicial (sem filtros aplicados).',
    },
    noResultsIcon: {
      control: 'select',
      options: [null, ...UI_ICON_NAMES],
      table: { category: 'Empty state' },
      description:
        'Ícone do empty state exibido quando a busca/filtros não retornam registros.',
    },
    noResultsTitle: {
      control: 'text',
      table: { category: 'Empty state' },
      description:
        'Título do empty state de busca sem resultados (`hasFilters = true`).',
    },
    noResultsDescription: {
      control: 'text',
      table: { category: 'Empty state' },
      description:
        'Texto complementar do empty state de busca sem resultados.',
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Textos / i18n' },
      description:
        'Texto acessível que identifica a tabela para leitores de tela (`aria-label`).',
    },
    previousLabel: {
      control: 'text',
      table: { category: 'Textos / i18n' },
      description: 'Texto do botão que navega para a página anterior.',
    },
    nextLabel: {
      control: 'text',
      table: { category: 'Textos / i18n' },
      description: 'Texto do botão que navega para a próxima página.',
    },
    pageSizeLabel: {
      control: 'text',
      table: { category: 'Textos / i18n' },
      description:
        'Rótulo visível do seletor de itens por página. Quando vazio ou omitido, nenhum rótulo é exibido.',
    },
    pageSizeAriaLabel: {
      control: 'text',
      table: { category: 'Textos / i18n' },
      description:
        'Texto acessível do seletor de itens por página. Quando vazio, usa `pageSizeLabel` ou "Itens por página".',
    },
    totalLabel: {
      control: 'text',
      table: { category: 'Textos / i18n' },
      description:
        'Sufixo exibido após o total de registros (ex.: "registro(s)").',
    },
    pageLabel: {
      control: 'text',
      table: { category: 'Textos / i18n' },
      description:
        'Rótulo exibido antes do número da página atual (ex.: "Página 1 de 3").',
    },
    ofLabel: {
      control: 'text',
      table: { category: 'Textos / i18n' },
      description:
        'Preposição usada na paginação e no total (ex.: "1 - 5 **de** 25", "Página 1 **de** 3").',
    },
  },
  render: (args) => ({
    props: args,
    template: `<ui-table-playground
      [columns]="columns"
      [data]="data"
      [loading]="loading"
      [hasFilters]="hasFilters"
      [forceEmpty]="forceEmpty"
      [showPagination]="showPagination"
      [showPaginationWhenSinglePage]="showPaginationWhenSinglePage"
      [showPageSize]="showPageSize"
      [showTotal]="showTotal"
      [paginationPosition]="paginationPosition"
      [pageSizeOptions]="pageSizeOptions"
      [initialPageSize]="initialPageSize"
      [size]="size"
      [hover]="hover"
      [stickyHeader]="stickyHeader"
      [bordered]="bordered"
      [fullWidth]="fullWidth"
      [customClass]="customClass"
      [skeletonRows]="skeletonRows"
      [skeletonColumns]="skeletonColumns"
      [emptyIcon]="emptyIcon"
      [emptyTitle]="emptyTitle"
      [emptyDescription]="emptyDescription"
      [noResultsIcon]="noResultsIcon"
      [noResultsTitle]="noResultsTitle"
      [noResultsDescription]="noResultsDescription"
      [ariaLabel]="ariaLabel"
      [previousLabel]="previousLabel"
      [nextLabel]="nextLabel"
      [pageSizeLabel]="pageSizeLabel"
      [pageSizeAriaLabel]="pageSizeAriaLabel"
      [totalLabel]="totalLabel"
      [pageLabel]="pageLabel"
      [ofLabel]="ofLabel"
    />`,
  }),
  args: { ...playgroundDefaults },
};

export default meta;
type Story = StoryObj<UiTablePlaygroundComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  parameters: {
    docs: {
      description: {
        story:
          'Modelo com **todas as opções** disponíveis nos controles: rodapé top/bottom, hover, sticky, ordenação, empty states, loading e labels customizados.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<ui-table-playground
      [columns]="columns"
      [data]="data"
      [loading]="loading"
      [hasFilters]="hasFilters"
      [forceEmpty]="forceEmpty"
      [showPagination]="showPagination"
      [showPaginationWhenSinglePage]="showPaginationWhenSinglePage"
      [showPageSize]="showPageSize"
      [showTotal]="showTotal"
      [paginationPosition]="paginationPosition"
      [pageSizeOptions]="pageSizeOptions"
      [initialPageSize]="initialPageSize"
      [size]="size"
      [hover]="hover"
      [stickyHeader]="stickyHeader"
      [bordered]="bordered"
      [fullWidth]="fullWidth"
      [customClass]="customClass"
      [skeletonRows]="skeletonRows"
      [skeletonColumns]="skeletonColumns"
      [emptyIcon]="emptyIcon"
      [emptyTitle]="emptyTitle"
      [emptyDescription]="emptyDescription"
      [noResultsIcon]="noResultsIcon"
      [noResultsTitle]="noResultsTitle"
      [noResultsDescription]="noResultsDescription"
      [ariaLabel]="ariaLabel"
      [previousLabel]="previousLabel"
      [nextLabel]="nextLabel"
      [pageSizeLabel]="pageSizeLabel"
      [pageSizeAriaLabel]="pageSizeAriaLabel"
      [totalLabel]="totalLabel"
      [pageLabel]="pageLabel"
      [ofLabel]="ofLabel"
    />`,
  }),
  args: { ...playgroundDefaults },
  play: tablePlaygroundPlay,
};

export const Default: Story = {
  render: (args) => ({
    props: { ...args, initialPageSize: 5, paginationPosition: 'bottom', stickyHeader: false, showPaginationWhenSinglePage: false },
    template: `<ui-table-playground
      [initialPageSize]="initialPageSize"
      [paginationPosition]="paginationPosition"
      [stickyHeader]="stickyHeader"
      [showPaginationWhenSinglePage]="showPaginationWhenSinglePage"
    />`,
  }),
  args: { ...playgroundDefaults },
  parameters: {
    docs: {
      description: {
        story: 'Uso padrão com ordenação, paginação e colunas responsivas.',
      },
    },
  },
};

export const Loading: Story = {
  render: (args) => ({
    props: { ...args, loading: true },
    template: `<ui-table-playground [loading]="loading" />`,
  }),
  args: { ...playgroundDefaults },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton no corpo; header e rodapé (total + paginação) permanecem visíveis.',
      },
    },
  },
};

export const EmptyWithoutFilters: Story = {
  render: (args) => ({
    props: { ...args, forceEmpty: true, hasFilters: false },
    template: `<ui-table-playground [forceEmpty]="forceEmpty" [hasFilters]="hasFilters" />`,
  }),
  args: { ...playgroundDefaults },
  parameters: {
    docs: {
      description: {
        story: 'Empty state inicial sem filtros. Hover não altera o fundo.',
      },
    },
  },
};

export const EmptyWithFilters: Story = {
  render: (args) => ({
    props: { ...args, forceEmpty: true, hasFilters: true },
    template: `<ui-table-playground [forceEmpty]="forceEmpty" [hasFilters]="hasFilters" />`,
  }),
  args: { ...playgroundDefaults },
  parameters: {
    docs: {
      description: {
        story: 'Empty state após busca/filtros sem resultados.',
      },
    },
  },
};

export const OnePage: Story = {
  render: (args) => ({
    props: {
      ...args,
      initialPageSize: 20,
      showPaginationWhenSinglePage: false,
    },
    template: `<ui-table-playground
      [initialPageSize]="initialPageSize"
      [showPaginationWhenSinglePage]="showPaginationWhenSinglePage"
    />`,
  }),
  args: { ...playgroundDefaults },
  parameters: {
    docs: {
      description: {
        story: 'Todos os registros cabem em uma página; paginação oculta.',
      },
    },
  },
};

export const MultiplePages: Story = {
  render: (args) => ({
    props: { ...args, initialPageSize: 3 },
    template: `<ui-table-playground [initialPageSize]="initialPageSize" />`,
  }),
  args: { ...playgroundDefaults },
  parameters: {
    docs: {
      description: {
        story: 'Paginação ativa com 3 itens por página.',
      },
    },
  },
};

export const WithoutPagination: Story = {
  name: 'Sem paginação (lista simples)',
  render: (args) => ({
    props: {
      ...args,
      showPagination: false,
      showPageSize: false,
      initialPageSize: 999,
    },
    template: `<ui-table-playground
      [showPagination]="showPagination"
      [showPageSize]="showPageSize"
      [initialPageSize]="initialPageSize"
    />`,
  }),
  args: { ...playgroundDefaults },
  parameters: {
    docs: {
      description: {
        story: 'Lista simples sem paginação — ideal para painéis como vet-invites.',
      },
    },
  },
};

export const StickyHeaderStory: Story = {
  name: 'Header sticky',
  render: (args) => ({
    props: { ...args, stickyHeader: true, initialPageSize: 3 },
    template: `<ui-table-playground
      [stickyHeader]="stickyHeader"
      [initialPageSize]="initialPageSize"
    />`,
  }),
  args: { ...playgroundDefaults },
  parameters: {
    docs: {
      description: {
        story: 'Header sticky com divisórias visíveis ao rolar.',
      },
    },
  },
};

export const Sizes: Story = {
  name: 'Tamanhos (sm / md / lg)',
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--ui-space-6);">
        <ui-table-playground size="sm" [initialPageSize]="3" [showPagination]="false" />
        <ui-table-playground size="md" [initialPageSize]="3" [showPagination]="false" />
        <ui-table-playground size="lg" [initialPageSize]="3" [showPagination]="false" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de densidade usando tokens de espaçamento e fonte.',
      },
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Colunas `hideMobile` ocultas; info resumida na primeira coluna.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, initialPageSize: 4 },
    template: `<ui-table-playground [initialPageSize]="initialPageSize" />`,
  }),
  args: { ...playgroundDefaults },
};
