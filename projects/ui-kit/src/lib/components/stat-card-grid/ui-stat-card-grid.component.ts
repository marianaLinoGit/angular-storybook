import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'ui-stat-card-grid',
  standalone: true,
  templateUrl: './ui-stat-card-grid.component.html',
  styleUrl: './ui-stat-card-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStatCardGridComponent {
  /** @deprecated Prefer columnsMobile / columnsDesktop. Kept for API compatibility. */
  minCardWidth = input('180px');
  gap = input('16px');
  columnsMobile = input(2);
  columnsDesktop = input(4);

  gridStyles = computed(() => ({
    '--ui-stat-card-grid-gap': this.gap(),
    '--ui-stat-card-grid-cols-mobile': String(Math.max(1, this.columnsMobile())),
    '--ui-stat-card-grid-cols-desktop': String(
      Math.max(1, this.columnsDesktop()),
    ),
  }));
}
