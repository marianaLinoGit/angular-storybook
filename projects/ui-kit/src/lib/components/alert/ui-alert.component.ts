import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';

export type AlertColor = 'success' | 'warning' | 'danger' | 'info';
export type AlertVariant = 'soft' | 'solid' | 'outline';
export type AlertSize = 'sm' | 'md' | 'lg';
export type AlertPosition = 'top' | 'bottom';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [UiButtonComponent, UiIconComponent],
  templateUrl: './ui-alert.component.html',
  styleUrl: './ui-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAlertComponent {
  title = input<string | null>(null);
  message = input('Mensagem do alerta');
  closeAriaLabel = input('Fechar alerta');

  color = input<AlertColor>('info');
  variant = input<AlertVariant>('solid');
  size = input<AlertSize>('md');
  showIcon = input(true);
  closable = input(true);
  fixed = input(false);
  position = input<AlertPosition>('top');
  customClass = input('');

  closed = output<void>();

  isVisible = signal(true);

  defaultIcon = computed<UiIconName>(() => {
    switch (this.color()) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'alert';
      case 'info':
      default:
        return 'info';
    }
  });

  alertClasses = computed(() =>
    [
      'ui-alert',
      `ui-alert--${this.color()}`,
      `ui-alert--${this.variant()}`,
      `ui-alert--${this.size()}`,
      this.fixed() ? 'ui-alert--fixed' : '',
      this.fixed() ? `ui-alert--fixed-${this.position()}` : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  close(): void {
    this.isVisible.set(false);
    this.closed.emit();
  }
}
