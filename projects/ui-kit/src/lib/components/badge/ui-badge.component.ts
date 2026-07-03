import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type UiBadgeType = 'default' | 'danger' | 'warning' | 'success' | 'info';

@Component({
  selector: 'ui-badge',
  standalone: true,
  templateUrl: './ui-badge.component.html',
  styleUrl: './ui-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBadgeComponent {
  label = input.required<string | number>();
  type = input<UiBadgeType>('default');

  badgeClasses = computed(() =>
    ['ui-badge', `ui-badge--${this.type()}`].join(' '),
  );
}
