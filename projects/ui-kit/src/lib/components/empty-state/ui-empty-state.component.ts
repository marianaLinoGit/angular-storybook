import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiColor } from '@design-system/types/ui.types';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';

export type UiEmptyStateSize = 'sm' | 'md' | 'lg';
export type UiEmptyStateAlign = 'left' | 'center' | 'right';
export type UiEmptyStateVariant = 'default' | 'dashed' | 'plain';
export type UiEmptyStateButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  imports: [UiButtonComponent, UiIconComponent],
  templateUrl: './ui-empty-state.component.html',
  styleUrl: './ui-empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiEmptyStateComponent {
  iconName = input<UiIconName | null>('paw');

  title = input('');
  description = input('');

  buttonLabel = input<string | null>(null);
  buttonAriaLabel = input<string | null>(null);

  size = input<UiEmptyStateSize>('md');
  align = input<UiEmptyStateAlign>('center');
  variant = input<UiEmptyStateVariant>('dashed');
  buttonVariant = input<UiEmptyStateButtonVariant>('primary');
  buttonDisabled = input(false);
  customClass = input('');

  buttonClick = output<void>();

  titleId = `ui-empty-state-title-${crypto.randomUUID()}`;
  descriptionId = `ui-empty-state-description-${crypto.randomUUID()}`;

  classes = computed(() =>
    [
      'ui-empty-state',
      `ui-empty-state--${this.size()}`,
      `ui-empty-state--align-${this.align()}`,
      `ui-empty-state--${this.variant()}`,
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  buttonColor = computed<UiColor>(() =>
    this.buttonVariant() === 'secondary' ? 'secondary' : 'primary',
  );

  buttonOutline = computed(() => this.buttonVariant() === 'outline');

  buttonPosition = computed(() => {
    switch (this.align()) {
      case 'left':
        return 'left' as const;
      case 'right':
        return 'right' as const;
      default:
        return 'center' as const;
    }
  });
}
