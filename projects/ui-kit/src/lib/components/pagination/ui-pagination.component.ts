import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiSize } from '@design-system/types/ui.types';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiSelectComponent, UiSelectOption } from '../select/ui-select.component';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [UiButtonComponent, UiSelectComponent],
  templateUrl: './ui-pagination.component.html',
  styleUrl: './ui-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPaginationComponent {
  pageIndex = input(1);
  totalPages = input(1);

  showControls = input(true);
  showPageSize = input(false);
  pageSize = input(10);
  pageSizeOptions = input<number[]>([5, 10, 20, 50, 100]);

  loading = input(false);
  disabled = input(false);
  size = input<UiSize>('sm');

  previousLabel = input('Anterior');
  nextLabel = input('Próxima');
  pageLabel = input('Página');
  ofLabel = input('de');
  pageSizeLabel = input<string | null>(null);
  pageSizeAriaLabel = input<string | null>(null);
  ariaLabel = input('Paginação');

  pageIndexChange = output<number>();
  pageSizeChange = output<number>();

  readonly statusId = `ui-pagination-status-${crypto.randomUUID()}`;

  pageSizeSelectLabel = computed(() => this.pageSizeLabel()?.trim() || null);

  pageSizeSelectAriaLabel = computed(() => {
    const explicit = this.pageSizeAriaLabel()?.trim();
    if (explicit) return explicit;

    const visibleLabel = this.pageSizeSelectLabel();
    if (visibleLabel) return visibleLabel;

    return 'Itens por página';
  });

  isFirstPage = computed(() => this.pageIndex() <= 1);

  isLastPage = computed(() => this.pageIndex() >= Math.max(1, this.totalPages()));

  isControlsDisabled = computed(() => this.disabled() || this.loading());

  selectSize = computed((): 'sm' | 'md' => {
    const size = this.size();
    return size === 'lg' ? 'md' : size;
  });

  pageSizeSelectOptions = computed<UiSelectOption[]>(() =>
    this.pageSizeOptions().map((value) => ({
      label: String(value),
      value: String(value),
    })),
  );

  goToPrevious(): void {
    if (this.isFirstPage() || this.isControlsDisabled()) return;
    this.pageIndexChange.emit(this.pageIndex() - 1);
  }

  goToNext(): void {
    if (this.isLastPage() || this.isControlsDisabled()) return;
    this.pageIndexChange.emit(this.pageIndex() + 1);
  }

  onPageSizeChange(value: string): void {
    const next = Number(value);
    if (!Number.isFinite(next) || next <= 0) return;
    this.pageSizeChange.emit(next);
  }
}
