import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type UiStatCardType =
  | 'default'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info';

export type UiStatCardSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-stat-card',
  standalone: true,
  templateUrl: './ui-stat-card.component.html',
  styleUrl: './ui-stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStatCardComponent {
  type = input<UiStatCardType>('default');
  size = input<UiStatCardSize>('md');

  value = input.required<string | number>();
  label = input.required<string>();

  icon = input<string | null>(null);
  ariaLabel = input<string | null>(null);

  fullWidth = input(false);

  cardClasses = computed(() =>
    [
      'ui-stat-card',
      `ui-stat-card--${this.type()}`,
      `ui-stat-card--${this.size()}`,
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
