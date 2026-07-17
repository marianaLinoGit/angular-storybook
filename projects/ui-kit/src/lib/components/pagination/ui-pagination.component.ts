import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiSize } from '../../design-system/types/ui.types';
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
  showFirstLast = input(true);
  showPageSize = input(false);
  pageSize = input(10);
  pageSizeOptions = input<number[]>([5, 10, 20, 50, 100]);

  loading = input(false);
  disabled = input(false);
  size = input<UiSize>('sm');

  firstLabel = input('');
  previousLabel = input('');
  nextLabel = input('');
  lastLabel = input('');
  pageLabel = input('');
  ofLabel = input('');
  pageSizeLabel = input<string | null>(null);
  pageSizeAriaLabel = input<string | null>(null);
  ariaLabel = input('');

  pageIndexChange = output<number>();
  pageSizeChange = output<number>();

  readonly statusId = `ui-pagination-status-${crypto.randomUUID()}`;

  pageSizeSelectLabel = computed(() => this.pageSizeLabel()?.trim() || null);

  pageSizeSelectAriaLabel = computed(() => {
    const explicit = this.pageSizeAriaLabel()?.trim();
    if (explicit) return explicit;

    const visibleLabel = this.pageSizeSelectLabel();
    if (visibleLabel) return visibleLabel;

    return '';
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

  goToFirst(): void {
    if (this.isFirstPage() || this.isControlsDisabled()) return;
    this.pageIndexChange.emit(1);
  }

  goToPrevious(): void {
    if (this.isFirstPage() || this.isControlsDisabled()) return;
    this.pageIndexChange.emit(this.pageIndex() - 1);
  }

  goToNext(): void {
    if (this.isLastPage() || this.isControlsDisabled()) return;
    this.pageIndexChange.emit(this.pageIndex() + 1);
  }

  goToLast(): void {
    if (this.isLastPage() || this.isControlsDisabled()) return;
    this.pageIndexChange.emit(this.totalPages());
  }

  onPageSizeChange(value: string | string[]): void {
    const raw = Array.isArray(value) ? value[0] : value;
    const next = Number(raw);
    if (!Number.isFinite(next) || next <= 0) return;
    this.pageSizeChange.emit(next);
  }
}
