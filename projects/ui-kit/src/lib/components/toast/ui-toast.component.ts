import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { UiColor, UiToastPosition } from '@design-system/types/ui.types';

type UiToastColor = Extract<UiColor, 'success' | 'danger' | 'warning' | 'info'>;

type UiToastVariant = 'soft' | 'solid' | 'outline';
type UiToastSize = 'sm' | 'md' | 'lg';
type UiToastShadow = 'none' | 'sm' | 'md';
type UiToastPresentationMode = 'fixed' | 'inline';

@Component({
  selector: 'ui-toast',
  standalone: true,
  templateUrl: './ui-toast.component.html',
  styleUrl: './ui-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToastComponent {
  title = input('Título do toast');
  text = input('Mensagem do toast');

  color = input<UiToastColor>('info');
  variant = input<UiToastVariant>('soft');

  size = input<UiToastSize>('md');
  shadow = input<UiToastShadow>('sm');

  icon = input<string | null>('ℹ️');

  position = input<UiToastPosition>('top-right');
  presentationMode = input<UiToastPresentationMode>('fixed');

  closable = input(true);
  duration = input(5000);

  customClass = input('');

  closed = output<void>();

  private hidden = signal(false);

  visible = computed(() => !this.hidden());

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
