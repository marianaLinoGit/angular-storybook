import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UiSize } from '@design-system/types/ui.types';

export type UiLoadingType =
  | 'spinner'
  | 'dots'
  | 'skeleton-text'
  | 'skeleton-card'
  | 'skeleton-card-text'
  | 'skeleton-table'
  | 'skeleton-avatar';

export type UiLoadingOverlayMode = 'fixed' | 'absolute';

@Component({
  selector: 'ui-loading',
  standalone: true,
  templateUrl: './ui-loading.component.html',
  styleUrl: './ui-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLoadingComponent {
  type = input<UiLoadingType>('spinner');
  size = input<UiSize>('md');

  message = input<string | null>(null);
  ariaLabel = input('Carregando conteúdo');

  overlay = input(false);
  overlayMode = input<UiLoadingOverlayMode>('fixed');

  skeletonRows = input(3);

  messageId = `ui-loading-message-${crypto.randomUUID()}`;

  skeletonRowsArray = computed(() =>
    Array.from(
      { length: Math.max(1, this.skeletonRows()) },
      (_, index) => index,
    ),
  );

  skeletonCardTextLineClass(index: number): string {
    const total = this.skeletonRowsArray().length;

    if (index === 0) {
      return 'ui-skeleton-card-text__line ui-skeleton-card-text__line--label';
    }

    if (total > 1 && index === total - 1) {
      return 'ui-skeleton-card-text__line ui-skeleton-card-text__line--meta';
    }

    if (index === 1) {
      return 'ui-skeleton-card-text__line ui-skeleton-card-text__line--value';
    }

    return 'ui-skeleton-card-text__line ui-skeleton-card-text__line--body';
  }

  classes = computed(() =>
    [
      'ui-loading',
      `ui-loading--${this.size()}`,
      this.overlay() ? 'ui-loading--overlay' : '',
      this.overlay() ? `ui-loading--overlay-${this.overlayMode()}` : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
