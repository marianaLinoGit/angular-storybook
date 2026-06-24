import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type UiTooltipPosition = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  templateUrl: './ui-tooltip.component.html',
  styleUrl: './ui-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTooltipComponent {
  text = input('Passe o mouse');
  html = input<string | null>(null);
  position = input<UiTooltipPosition>('top');
  disabled = input(false);
  maxWidth = input('240px');
  delay = input('0ms');

  tooltipClasses = computed(() =>
    [
      'ui-tooltip__content',
      `ui-tooltip__content--${this.position()}`,
      this.disabled() ? 'ui-tooltip__content--disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
