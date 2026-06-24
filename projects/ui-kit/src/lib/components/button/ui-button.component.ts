import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  UiColor,
  UiHorizontalPosition,
  UiSize,
} from '@design-system/types/ui.types';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  label = input('Button');
  ariaLabel = input<string | null>(null);

  color = input<UiColor>('primary');
  size = input<UiSize>('md');
  position = input<UiHorizontalPosition>('center');

  disabled = input(false);
  loading = input(false);

  fullWidth = input(false);
  rounded = input(false);
  outline = input(false);

  icon = input<string | null>(null);
  iconPosition = input<'left' | 'right'>('left');

  customClass = input('');

  type = input<'button' | 'submit' | 'reset'>('button');

  buttonClick = output<void>();

  accessibleLabel = computed(() => this.ariaLabel() || this.label());

  buttonClasses = computed(() =>
    [
      'ui-button',
      `ui-button--${this.color()}`,
      `ui-button--${this.size()}`,
      this.outline() ? 'ui-button--outline' : '',
      this.fullWidth() ? 'ui-button--full' : '',
      this.rounded() ? 'ui-button--rounded' : '',
      this.disabled() ? 'ui-button--disabled' : '',
      this.loading() ? 'ui-button--loading' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  wrapperClasses = computed(
    () => `ui-button-wrapper ui-button-wrapper--${this.position()}`,
  );

  onClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.buttonClick.emit();
    }
  }
}
