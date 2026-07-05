import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { UiBadgeComponent, UiBadgeType } from '../badge/ui-badge.component';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';

@Component({
  selector: 'ui-accordion-panel',
  standalone: true,
  templateUrl: './ui-accordion-panel.component.html',
  styleUrl: './ui-accordion-panel.component.scss',
  imports: [UiBadgeComponent, UiIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAccordionPanelComponent {
  id = input.required<string>();
  title = input.required<string>();
  icon = input<UiIconName | null>(null);
  badge = input<string | number | null>(null);
  badgeType = input<UiBadgeType>('default');
  disabled = input(false);
  open = model(false);
  allowOverflow = input(false);

  openedChange = output<boolean>();

  triggerId = computed(() => `ui-accordion-trigger-${this.id()}`);
  panelId = computed(() => `ui-accordion-panel-${this.id()}`);

  panelClasses = computed(() =>
    [
      'ui-accordion-panel',
      this.open() ? 'ui-accordion-panel--open' : '',
      this.disabled() ? 'ui-accordion-panel--disabled' : '',
      this.allowOverflow() ? 'ui-accordion-panel--overflow-visible' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  toggle(): void {
    if (this.disabled()) return;

    const next = !this.open();
    this.open.set(next);
    this.openedChange.emit(next);
  }
}
