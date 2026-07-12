import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UiSize } from '../../design-system/types/ui.types';

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
  ariaLabel = input('');

  overlay = input(false);
  overlayMode = input<UiLoadingOverlayMode>('fixed');

  skeletonRows = input(3);

  /** Colunas do skeleton-table no mobile (< 768px). */
  skeletonColumnsMobile = input(3);
  /** Colunas do skeleton-table no tablet (768px–1023px). */
  skeletonColumnsTablet = input(4);
  /** Colunas do skeleton-table no desktop (≥ 1024px). */
  skeletonColumnsDesktop = input(5);

  messageId = `ui-loading-message-${crypto.randomUUID()}`;

  skeletonRowsArray = computed(() =>
    Array.from(
      { length: Math.max(1, this.skeletonRows()) },
      (_, index) => index,
    ),
  );

  skeletonTableCols = computed(() => {
    const mobile = Math.max(1, this.skeletonColumnsMobile());
    const tablet = Math.max(1, this.skeletonColumnsTablet());
    const desktop = Math.max(1, this.skeletonColumnsDesktop());
    const max = Math.max(mobile, tablet, desktop);

    return Array.from({ length: max }, (_, index) => ({
      index,
      mobile: index < mobile,
      tablet: index < tablet,
      desktop: index < desktop,
    }));
  });

  skeletonTableStyles = computed(() => ({
    '--skeleton-cols-mobile': String(Math.max(1, this.skeletonColumnsMobile())),
    '--skeleton-cols-tablet': String(Math.max(1, this.skeletonColumnsTablet())),
    '--skeleton-cols-desktop': String(
      Math.max(1, this.skeletonColumnsDesktop()),
    ),
  }));

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
      this.type() === 'skeleton-table' ? 'ui-loading--skeleton-table' : '',
      this.overlay() ? 'ui-loading--overlay' : '',
      this.overlay() ? `ui-loading--overlay-${this.overlayMode()}` : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
