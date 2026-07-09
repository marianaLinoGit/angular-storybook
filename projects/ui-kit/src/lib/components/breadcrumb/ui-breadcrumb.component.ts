import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  disabled?: boolean;
  icon?: UiIconName;
}

export type BreadcrumbHomeDisplay = 'icon' | 'text' | 'icon-text';

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  imports: [UiIconComponent],
  templateUrl: './ui-breadcrumb.component.html',
  styleUrl: './ui-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBreadcrumbComponent {
  items = input<BreadcrumbItem[]>([]);
  separator = input('/');
  ariaLabel = input('');
  homeDisplay = input<BreadcrumbHomeDisplay>('icon-text');
  showIcons = input(true);

  itemClick = output<BreadcrumbItem>();

  isFirst(index: number): boolean {
    return index === 0;
  }

  shouldShowIcon(item: BreadcrumbItem, index: number): boolean {
    if (!this.showIcons()) {
      return false;
    }

    if (this.isFirst(index)) {
      return (
        this.homeDisplay() === 'icon' || this.homeDisplay() === 'icon-text'
      );
    }

    return Boolean(item.icon);
  }

  shouldShowLabel(index: number): boolean {
    if (!this.isFirst(index)) {
      return true;
    }

    return this.homeDisplay() === 'text' || this.homeDisplay() === 'icon-text';
  }

  getIcon(item: BreadcrumbItem, index: number): UiIconName | null {
    if (!this.shouldShowIcon(item, index)) {
      return null;
    }

    if (this.isFirst(index)) {
      return item.icon || 'home';
    }

    return item.icon || null;
  }
}
