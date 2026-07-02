import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
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
  title = input.required<string>();
  subtitle = input<string | null>(null);

  showBack = input(false);
  backLabel = input('');
  backAriaLabel = input('');
  backIcon = input('/imgs/icons-actions/back.svg');

  showAction = input(false);
  actionLabel = input('');
  actionAriaLabel = input('');
  actionIcon = input('+');

  actionColor = input<
    'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  >('primary');

  backClick = output<void>();
  actionClick = output<void>();

  hasSubtitle = computed(() => !!this.subtitle()?.trim());

  hasAction = computed(
    () => this.showAction() && this.actionLabel().trim().length > 0,
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

    return this.actionLabel().trim();
  });
}
