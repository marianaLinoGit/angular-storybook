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

  title = input.required<string>();
  subtitle = input<string | null>(null);

  showBack = input(false);
  backLabel = input('');
  backAriaLabel = input('');
  backIcon = input('/imgs/icons-actions/back.svg');

  showAction = input(false);

  actionLabel = input('');
  actionName = input('');
  actionAriaLabel = input('');
  actionIcon = input('+');
  actionRoute = input<string | unknown[] | null>('new');

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

    return 'Voltar';
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

    this.router.navigate([route]);
  }
}
