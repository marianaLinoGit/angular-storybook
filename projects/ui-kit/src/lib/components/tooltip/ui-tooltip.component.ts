import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  signal,
} from '@angular/core';
import {
  UiIconComponent,
  UiIconName,
  UiIconSize,
} from '../icon/ui-icon.component';

export type UiTooltipPosition = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  imports: [UiIconComponent],
  templateUrl: './ui-tooltip.component.html',
  styleUrl: './ui-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTooltipComponent {
  text = input('');
  html = input<string | null>(null);
  position = input<UiTooltipPosition>('top');
  disabled = input(false);
  maxWidth = input('240px');
  delay = input('0ms');
  customClass = input('');

  icon = input<UiIconName | null>(null);
  iconSize = input<UiIconSize>('sm');
  iconColor = input<string | null>(null);
  iconLabel = input('');

  private readonly fallbackTooltipId = `ui-tooltip-${crypto.randomUUID()}`;
  id = input<string | null>(null);

  readonly visible = signal(false);

  resolvedTooltipId = computed(
    () => this.id()?.trim() || this.fallbackTooltipId,
  );

  resolvedIconLabel = computed(() => {
    const label = this.iconLabel().trim();
    if (label) {
      return label;
    }

    return this.text().trim() || null;
  });

  tooltipClasses = computed(() =>
    [
      'ui-tooltip__content',
      `ui-tooltip__content--${this.position()}`,
      this.visible() ? 'ui-tooltip__content--visible' : '',
      this.disabled() ? 'ui-tooltip__content--disabled' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  @HostListener('mouseenter')
  @HostListener('focusin')
  showTooltip(): void {
    if (!this.disabled()) {
      this.visible.set(true);
    }
  }

  @HostListener('mouseleave')
  @HostListener('focusout', ['$event'])
  hideTooltip(event: FocusEvent): void {
    const host = event.currentTarget as HTMLElement;
    const nextTarget = event.relatedTarget as Node | null;

    if (nextTarget && host.contains(nextTarget)) {
      return;
    }

    this.visible.set(false);
  }
}
