import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type UiDividerColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'muted';

export type UiDividerOrientation = 'horizontal' | 'vertical';
export type UiDividerVariant = 'solid' | 'dashed' | 'dotted';
export type UiDividerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-divider',
  standalone: true,
  templateUrl: './ui-divider.component.html',
  styleUrl: './ui-divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class UiDividerComponent {
  color = input<UiDividerColor>('default');
  orientation = input<UiDividerOrientation>('horizontal');
  variant = input<UiDividerVariant>('solid');
  size = input<UiDividerSize>('md');
  /** Optional label rendered in the middle of a horizontal divider. */
  label = input('');
  customClass = input('');

  readonly horizontalLabel = computed(() =>
    this.orientation() === 'horizontal' ? this.label().trim() : '',
  );

  readonly hostClasses = computed(() =>
    [
      'ui-divider',
      `ui-divider--${this.orientation()}`,
      `ui-divider--${this.color()}`,
      `ui-divider--${this.variant()}`,
      `ui-divider--${this.size()}`,
      this.horizontalLabel() ? 'ui-divider--with-label' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
