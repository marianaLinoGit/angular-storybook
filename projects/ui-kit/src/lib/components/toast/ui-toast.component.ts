import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { UiColor, UiToastPosition } from '@design-system/types/ui.types';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';

type UiToastColor = Extract<UiColor, 'success' | 'danger' | 'warning' | 'info'>;

type UiToastVariant = 'soft' | 'solid' | 'outline';
type UiToastSize = 'sm' | 'md' | 'lg';
type UiToastShadow = 'none' | 'sm' | 'md';
type UiToastPresentationMode = 'fixed' | 'inline';
type UiToastAriaLive = 'polite' | 'assertive';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [UiButtonComponent, UiIconComponent],
  templateUrl: './ui-toast.component.html',
  styleUrl: './ui-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToastComponent {
  title = input('Título do toast');
  text = input('Mensagem do toast');

  color = input<UiToastColor>('info');
  variant = input<UiToastVariant>('solid');

  size = input<UiToastSize>('md');
  shadow = input<UiToastShadow>('sm');

  icon = input<UiIconName | null>(null);
  showIcon = input(true);

  position = input<UiToastPosition>('top-right');
  presentationMode = input<UiToastPresentationMode>('fixed');

  closable = input(true);
  closeAriaLabel = input('Fechar notificação');

  duration = input(5000);
  ariaLive = input<UiToastAriaLive>('polite');

  customClass = input('');

  closed = output<void>();

  private hidden = signal(false);

  titleId = `ui-toast-title-${crypto.randomUUID()}`;
  textId = `ui-toast-text-${crypto.randomUUID()}`;

  visible = computed(() => !this.hidden());

  resolvedIcon = computed<UiIconName>(() => {
    const customIcon = this.icon();
    if (customIcon) {
      return customIcon;
    }

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

  role = computed(() => (this.ariaLive() === 'assertive' ? 'alert' : 'status'));

  classes = computed(() =>
    [
      'ui-toast',
      `ui-toast--${this.color()}`,
      `ui-toast--${this.variant()}`,
      `ui-toast--${this.size()}`,
      `ui-toast--shadow-${this.shadow()}`,
      `ui-toast--${this.presentationMode()}`,
      this.presentationMode() === 'fixed' ? `ui-toast--${this.position()}` : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  close(): void {
    this.hidden.set(true);
    this.closed.emit();
  }
}
