import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiColor, UiToastPosition } from '@design-system/types/ui.types';

@Component({
  selector: 'ui-toast',
  standalone: true,
  templateUrl: './ui-toast.component.html',
  styleUrl: './ui-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  title = input('Título do toast');
  text = input('Mensagem do toast');
  color =
    input<Extract<UiColor, 'success' | 'danger' | 'warning' | 'info'>>('info');
  icon = input<string | null>('ℹ️');
  position = input<UiToastPosition>('top-right');
  closable = input(true);
  duration = input(5000);

  closed = output<void>();

  classes = computed(() =>
    [
      'ui-toast',
      `ui-toast--${this.color()}`,
      `ui-toast--${this.position()}`,
    ].join(' '),
  );
}
