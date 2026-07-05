import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import {
  UiColor,
  UiHorizontalPosition,
  UiSize,
} from '@design-system/types/ui.types';
import { RouteHistoryService } from '../../services/route-history.service';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [UiIconComponent],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  private routeHistory = inject(RouteHistoryService);

  label = input('Button');
  loadingLabel = input('Loading...');
  ariaLabel = input<string | null>(null);

  color = input<UiColor>('primary');
  size = input<UiSize>('md');
  position = input<UiHorizontalPosition>('center');

  disabled = input(false);
  loading = input(false);

  fullWidth = input(false);
  rounded = input(false);
  outline = input(false);
  iconOnly = input(false);
  hideLabelOnMobile = input(false);

  icon = input<UiIconName | null>(null);
  iconPosition = input<'left' | 'right'>('left');

  appearance = input<'default' | 'back'>('default');
  backFallbackUrl = input('/');

  customClass = input('');

  type = input<'button' | 'submit' | 'reset'>('button');

  buttonClick = output<void>();

  buttonIcon = computed<UiIconName | null>(() => {
    if (this.icon()) return this.icon();

    if (this.appearance() === 'back') return 'back';

    return null;
  });

  computedAriaLabel = computed(() => {
    const aria = this.ariaLabel()?.trim();
    if (aria) return aria;

    const label = this.label()?.trim();
    if (label) return label;

    if (this.appearance() === 'back') return 'Voltar';

    return null;
  });

  buttonClasses = computed(() =>
    [
      'ui-button',
      `ui-button--${this.color()}`,
      `ui-button--${this.size()}`,
      this.outline() ? 'ui-button--outline' : '',
      this.fullWidth() ? 'ui-button--full' : '',
      this.rounded() ? 'ui-button--rounded' : '',
      this.iconOnly() ? 'ui-button--icon-only' : '',
      this.appearance() === 'back' ? 'ui-button--back' : '',
      this.disabled() ? 'ui-button--disabled' : '',
      this.loading() ? 'ui-button--loading' : '',
      this.icon() ? 'ui-button-with-icon' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  wrapperClasses = computed(
    () => `ui-button-wrapper ui-button-wrapper--${this.position()}`,
  );

  onClick(): void {
    if (this.disabled() || this.loading()) return;

    if (this.appearance() === 'back') {
      this.routeHistory.back(this.backFallbackUrl());
      this.buttonClick.emit();
      return;
    }

    this.buttonClick.emit();
  }
}
