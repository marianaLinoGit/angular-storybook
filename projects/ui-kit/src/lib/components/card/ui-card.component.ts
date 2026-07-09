import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiSize } from '@design-system/types/ui.types';

export type UiCardAlign = 'left' | 'center' | 'right';
export type UiCardTarget = '_self' | '_blank';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './ui-card.component.html',
  styleUrl: './ui-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardComponent {
  title = input('');
  subtitle = input<string | null>(null);
  description = input('');

  imageUrl = input<string | null>(null);
  imageAlt = input<string | null>(null);

  ariaLabel = input<string | null>(null);

  size = input<UiSize>('md');
  shadow = input(true);
  bordered = input(false);
  clickable = input(false);
  highlighted = input(false);
  align = input<UiCardAlign>('left');

  footer = input<string | null>(null);

  linkUrl = input<string | null>(null);
  target = input<UiCardTarget>('_self');

  customClass = input('');

  cardClick = output<void>();

  cardClasses = computed(() =>
    [
      'ui-card',
      `ui-card--size-${this.size()}`,
      `ui-card--align-${this.align()}`,
      this.shadow() ? 'ui-card--shadow' : '',
      this.bordered() ? 'ui-card--bordered' : '',
      this.clickable() ? 'ui-card--clickable' : '',
      this.highlighted() ? 'ui-card--highlighted' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  accessibleLabel = computed(() => {
    if (!this.clickable()) {
      return null;
    }

    return this.ariaLabel() || this.title();
  });

  resolvedImageAlt = computed(() => {
    const alt = this.imageAlt();

    if (alt !== null) {
      return alt;
    }

    return this.title();
  });

  handleClick(): void {
    if (!this.clickable() || this.linkUrl()) {
      return;
    }

    this.cardClick.emit();
  }

  handleLinkClick(event: MouseEvent): void {
    if (!this.clickable()) {
      return;
    }

    this.cardClick.emit();

    if (this.target() === '_blank') {
      event.preventDefault();
      window.open(this.linkUrl()!, '_blank', 'noopener,noreferrer');
    }
  }

  handleSpaceKey(event: Event): void {
    event.preventDefault();
    this.handleClick();
  }
}
