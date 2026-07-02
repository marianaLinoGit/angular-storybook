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
  minCardWidth = input('180px');
  gap = input('16px');

  gridStyles = computed(() => ({
    '--ui-stat-card-grid-min': this.minCardWidth(),
    '--ui-stat-card-grid-gap': this.gap(),
  }));
}
