import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiEmptyStateComponent } from '../empty-state/ui-empty-state.component';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';
import { UiPaginationComponent } from '../pagination/ui-pagination.component';
import { UiBadgeType } from '../badge/ui-badge.component';

export type UiTableSortDir = 'asc' | 'desc';
export type UiTableAlign = 'left' | 'center' | 'right';
export type UiTableSize = 'sm' | 'md' | 'lg';
export type UiTablePaginationPosition = 'top' | 'bottom' | 'both';

/** Breakpoints: mobile < 768px, tablet 768–1023px, desktop ≥ 1024px */
export type UiTableBreakpoint = 'mobile' | 'tablet';

export type UiTableColumnBadgeValue =
  | UiBadgeType
  | {
      label?: string;
      type?: UiBadgeType;
    };

export interface UiTableColumnBadge {
  map?: Record<string, UiTableColumnBadgeValue>;
  defaultType?: UiBadgeType;
}

export interface UiTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  /**
   * Hide this column on the given breakpoints.
   * - `mobile`: hidden below 768px
   * - `tablet`: hidden between 768px and 1023px
   * Use `['mobile', 'tablet']` to show only on desktop (≥1024px).
   */
  hideOn?: UiTableBreakpoint[];
  /** @deprecated Prefer `hideOn: ['mobile']` */
  hideMobile?: boolean;
  width?: string;
  minWidth?: string;
  align?: UiTableAlign;
  headerAlign?: UiTableAlign;
  isActions?: boolean;
  badge?: UiTableColumnBadge;
}

export interface UiTableSortChange {
  sortBy: string;
  sortDir: UiTableSortDir;
}

export interface UiTableBadgeCell {
  label: string;
  type: UiBadgeType;
}

function normalizeUiTableCellValue(value: unknown): string {
  return String(value ?? '').trim();
}

function parseUiTableBadgeValue(
  entry: UiTableColumnBadgeValue | undefined,
): { label?: string; type?: UiBadgeType } {
  if (!entry) return {};
  if (typeof entry === 'string') return { type: entry };
  return { label: entry.label, type: entry.type };
}

export function resolveUiTableBadge(
  column: UiTableColumn,
  value: unknown,
  fallbackLabel?: string,
): UiTableBadgeCell {
  const key = normalizeUiTableCellValue(value);
  const parsed = parseUiTableBadgeValue(column.badge?.map?.[key]);

  return {
    label: parsed.label ?? fallbackLabel ?? key,
    type: parsed.type ?? column.badge?.defaultType ?? 'default',
  };
}

export function getUiTableColumnHideClasses(column: UiTableColumn): string {
  const hideOn = new Set(column.hideOn ?? []);
  if (column.hideMobile) hideOn.add('mobile');

  return [
    hideOn.has('mobile') ? 'ui-table__cell--hide-mobile' : '',
    hideOn.has('tablet') ? 'ui-table__cell--hide-tablet' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getUiTableBodyCellClasses(column: UiTableColumn): string {
  return [
    getUiTableColumnHideClasses(column),
    column.isActions ? 'ui-table__cell--actions' : '',
    column.badge ? 'ui-table__cell--badge' : '',
    `ui-table__cell--align-${column.align ?? 'left'}`,
  ]
    .filter(Boolean)
    .join(' ');
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    UiEmptyStateComponent,
    UiIconComponent,
    UiPaginationComponent,
  ],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UiTableComponent {
  columns = input.required<UiTableColumn[]>();

  loading = input(false);
  total = input(0);
  pageIndex = input(1);
  pageSize = input(10);
  pageSizeOptions = input<number[]>([5, 10, 20, 50, 100]);

  sortBy = input<string | null>(null);
  sortDir = input<UiTableSortDir>('asc');

  hasFilters = input(false);
  showPagination = input(true);
  showPaginationWhenSinglePage = input(false);
  showPageSize = input(true);
  showTotal = input(true);
  paginationPosition = input<UiTablePaginationPosition>('both');

  size = input<UiTableSize>('md');
  hover = input(true);
  stickyHeader = input(false);
  bordered = input(true);
  fullWidth = input(true);
  customClass = input('');

  skeletonRows = input(5);
  skeletonColumns = input<number | null>(null);

  emptyIcon = input<UiIconName | null>('folder');
  emptyTitle = input('');
  emptyDescription = input('');

  noResultsIcon = input<UiIconName | null>('filter');
  noResultsTitle = input('');
  noResultsDescription = input('');

  ariaLabel = input('');
  paginationAriaLabel = input('');
  paginationTopSuffix = input('');
  paginationBottomSuffix = input('');
  previousLabel = input('');
  nextLabel = input('');
  firstLabel = input('');
  lastLabel = input('');
  pageSizeLabel = input<string | null>(null);
  pageSizeAriaLabel = input<string | null>(null);
  totalLabel = input('');
  pageLabel = input('');
  ofLabel = input('');
  sortByAriaLabel = input('');
  sortAscAriaLabel = input('');
  sortDescAriaLabel = input('');

  pageIndexChange = output<number>();
  pageSizeChange = output<number>();
  sortChange = output<UiTableSortChange>();

  tableClasses = computed(() =>
    [
      'ui-table',
      `ui-table--${this.size()}`,
      this.hover() ? 'ui-table--hover' : '',
      this.stickyHeader() ? 'ui-table--sticky' : '',
      this.bordered() ? 'ui-table--bordered' : '',
      this.fullWidth() ? 'ui-table--full' : '',
      !this.hasRows() && !this.loading() ? 'ui-table--empty' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  totalPages = computed(() =>
    Math.max(1, Math.ceil(Math.max(0, this.total()) / Math.max(1, this.pageSize()))),
  );

  firstItem = computed(() => {
    if (this.total() <= 0) return 0;
    return (this.pageIndex() - 1) * this.pageSize() + 1;
  });

  lastItem = computed(() => Math.min(this.pageIndex() * this.pageSize(), this.total()));

  hasRows = computed(() => this.total() > 0);

  showPaginationControls = computed(() => {
    if (!this.showPagination()) return false;
    if (this.showPaginationWhenSinglePage()) return true;
    return this.totalPages() > 1;
  });

  showFooter = computed(
    () =>
      this.showTotal() ||
      this.showPaginationControls() ||
      (this.showPageSize() && this.hasRows()),
  );

  pageSizeSelectAriaLabel = computed(() => {
    const explicit = this.pageSizeAriaLabel()?.trim();
    if (explicit) return explicit;

    const visibleLabel = this.pageSizeLabel()?.trim();
    if (visibleLabel) return visibleLabel;

    return '';
  });

  showFooterTop = computed(
    () =>
      this.showFooter() &&
      (this.paginationPosition() === 'top' || this.paginationPosition() === 'both'),
  );

  showFooterBottom = computed(
    () =>
      this.showFooter() &&
      (this.paginationPosition() === 'bottom' || this.paginationPosition() === 'both'),
  );

  paginationNavAriaLabel(position: 'top' | 'bottom'): string {
    const base = this.paginationAriaLabel();

    if (this.showFooterTop() && this.showFooterBottom()) {
      const suffix =
        position === 'top'
          ? this.paginationTopSuffix().trim()
          : this.paginationBottomSuffix().trim();

      return suffix ? `${base} ${suffix}` : base;
    }

    return base;
  }

  currentEmptyIcon = computed(() =>
    this.hasFilters() ? this.noResultsIcon() : this.emptyIcon(),
  );

  currentEmptyTitle = computed(() =>
    this.hasFilters() ? this.noResultsTitle() : this.emptyTitle(),
  );

  currentEmptyDescription = computed(() =>
    this.hasFilters() ? this.noResultsDescription() : this.emptyDescription(),
  );

  skeletonRowsArray = computed(() =>
    Array.from({ length: Math.max(1, this.skeletonRows()) }, (_, index) => index),
  );

  skeletonColumnsArray = computed(() => {
    const count = this.skeletonColumns() ?? this.columns().length;
    return Array.from({ length: Math.max(1, count) }, (_, index) => index);
  });

  getColumnClasses(column: UiTableColumn): string {
    return [
      getUiTableColumnHideClasses(column),
      column.isActions ? 'ui-table__cell--actions' : '',
      `ui-table__cell--align-${column.align ?? 'left'}`,
    ]
      .filter(Boolean)
      .join(' ');
  }

  getHeaderClasses(column: UiTableColumn): string {
    return [
      getUiTableColumnHideClasses(column),
      column.isActions ? 'ui-table__cell--actions' : '',
      column.badge ? 'ui-table__cell--badge' : '',
      column.sortable ? 'ui-table__header-cell--sortable' : '',
      `ui-table__cell--align-${column.headerAlign ?? column.align ?? 'left'}`,
    ]
      .filter(Boolean)
      .join(' ');
  }

  getColumnStyle(column: UiTableColumn): Record<string, string> {
    return {
      ...(column.width ? { width: column.width } : {}),
      ...(column.minWidth ? { minWidth: column.minWidth } : {}),
    };
  }

  sortIcon(column: UiTableColumn): UiIconName {
    if (this.sortBy() !== column.key) return 'chevron-down';
    return this.sortDir() === 'asc' ? 'chevron-up' : 'chevron-down';
  }

  getSortAriaLabel(column: UiTableColumn): string {
    const template = this.sortByAriaLabel().trim();
    const base = template
      ? template.replace(/\{column\}|__COLUMN__/g, column.label)
      : column.label;

    if (this.sortBy() !== column.key) {
      return base;
    }

    const direction =
      this.sortDir() === 'asc'
        ? this.sortAscAriaLabel().trim()
        : this.sortDescAriaLabel().trim();

    return direction ? `${base}, ${direction}` : base;
  }

  onSort(column: UiTableColumn): void {
    if (!column.sortable) return;

    const nextDir: UiTableSortDir =
      this.sortBy() === column.key && this.sortDir() === 'asc' ? 'desc' : 'asc';

    this.sortChange.emit({
      sortBy: column.key,
      sortDir: nextDir,
    });
  }

  onPageSizeChange(value: number): void {
    if (!Number.isFinite(value) || value <= 0) return;
    this.pageSizeChange.emit(value);
  }
}
