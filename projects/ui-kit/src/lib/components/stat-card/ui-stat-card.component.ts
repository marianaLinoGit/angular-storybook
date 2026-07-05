import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  UiIconComponent,
  UiIconName,
  UiIconSize,
} from '../icon/ui-icon.component';

export type UiStatCardType =
  | 'default'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info';

export type UiStatCardSize = 'sm' | 'md' | 'lg';

export type UiStatCardAppearance = 'solid' | 'gradient';

@Component({
  selector: 'ui-stat-card',
  standalone: true,
  imports: [UiIconComponent],
  templateUrl: './ui-stat-card.component.html',
  styleUrl: './ui-stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStatCardComponent {
  type = input<UiStatCardType>('default');
  size = input<UiStatCardSize>('md');
  appearance = input<UiStatCardAppearance>('solid');

  value = input.required<string | number>();
  label = input.required<string>();

  icon = input<UiIconName | null>(null);
  ariaLabel = input<string | null>(null);

  fullWidth = input(false);

  iconSize = computed<UiIconSize>(() => {
    if (this.size() === 'sm') return 'md';
    if (this.size() === 'lg') return 'xl';

    return 'lg';
  });

  cardClasses = computed(() =>
    [
      'ui-stat-card',
      `ui-stat-card--${this.type()}`,
      `ui-stat-card--${this.size()}`,
      `ui-stat-card--${this.appearance()}`,
      this.fullWidth() ? 'ui-stat-card--full' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  computedAriaLabel = computed(() => {
    const aria = this.ariaLabel()?.trim();
    if (aria) return aria;

    return `${this.value()} ${this.label()}`.trim();
  });
}
