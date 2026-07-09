import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiIconName } from '../icon/ui-icon.component';

@Component({
  selector: 'ui-page-title',
  standalone: true,
  templateUrl: './ui-page-title.component.html',
  styleUrl: './ui-page-title.component.scss',
  imports: [UiButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPageTitleComponent {
  private router = inject(Router);
  private location = inject(Location);

  title = input.required<string>();
  subtitle = input<string | null>(null);

  showBack = input(false);
  backLabel = input('');
  backAriaLabel = input('');

  showAction = input(false);

  actionLabel = input('');
  actionName = input('');
  actionAriaLabel = input('');
  actionIcon = input<UiIconName | null>('plus');

  actionRoute = input<string | unknown[] | null>('new');
  actionRouteMode = input<'append' | 'absolute'>('append');

  actionColor = input<
    'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  >('primary');

  backClick = output<void>();
  actionClick = output<void>();

  hasSubtitle = computed(() => !!this.subtitle()?.trim());

  resolvedActionLabel = computed(() => {
    const label = this.actionLabel().trim();
    if (label) return label;

    return this.actionName().trim();
  });

  hasAction = computed(
    () => this.showAction() && this.resolvedActionLabel().length > 0,
  );

  computedBackAriaLabel = computed(() => {
    const aria = this.backAriaLabel().trim();
    if (aria) return aria;

    const label = this.backLabel().trim();
    if (label) return label;

    return '';
  });

  computedActionAriaLabel = computed(() => {
    const aria = this.actionAriaLabel().trim();
    if (aria) return aria;

    return this.resolvedActionLabel();
  });

  onActionClick(): void {
    this.actionClick.emit();

    const route = this.actionRoute();
    if (!route) return;

    if (Array.isArray(route)) {
      this.router.navigate(route as any[]);
      return;
    }

    const routeText = String(route).trim();
    if (!routeText) return;

    if (routeText.startsWith('/')) {
      this.router.navigateByUrl(routeText);
      return;
    }

    if (this.actionRouteMode() === 'absolute') {
      this.router.navigate([routeText]);
      return;
    }

    const currentPath = this.location.path().split('?')[0].split('#')[0];
    const base = currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    this.router.navigateByUrl(`${base}/${routeText}`);
  }
}
