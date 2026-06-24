import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UiSize } from '@design-system/types/ui.types';

type LoadingType =
  | 'spinner'
  | 'dots'
  | 'skeleton-text'
  | 'skeleton-card'
  | 'skeleton-table'
  | 'skeleton-avatar';

@Component({
  selector: 'ui-loading',
  standalone: true,
  templateUrl: './ui-loading.component.html',
  styleUrl: './ui-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLoadingComponent {
  type = input<LoadingType>('spinner');

  size = input<UiSize>('md');

  message = input<string | null>(null);

  overlay = input(false);

  ariaLabel = input('Carregando conteúdo');

  classes = computed(() =>
    [
      'ui-loading',
      `ui-loading--${this.size()}`,
      this.overlay() ? 'ui-loading--overlay' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
