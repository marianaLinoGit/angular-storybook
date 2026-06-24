import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
  disabled?: boolean;
}

export type UiAccordionSize = 'sm' | 'md' | 'lg';
export type UiAccordionVariant = 'default' | 'bordered' | 'flush';

export interface AccordionToggleEvent {
  item: AccordionItem;
  opened: boolean;
  openedIds: string[];
}

@Component({
  selector: 'ui-accordion',
  standalone: true,
  templateUrl: './ui-accordion.component.html',
  styleUrl: './ui-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAccordionComponent {
  items = input<AccordionItem[]>([]);
  multiple = input(false);
  showNumbers = input(false);
  showIcons = input(true);
  initialOpenedIds = input<string[]>([]);
  size = input<UiAccordionSize>('md');
  variant = input<UiAccordionVariant>('default');
  customClass = input('');

  itemToggle = output<AccordionToggleEvent>();

  private openedIdsState = signal<string[]>([]);

  openedIds = computed(() => {
    const current = this.openedIdsState();

    if (current.length) {
      return current;
    }

    return this.initialOpenedIds();
  });

  accordionClasses = computed(() =>
    [
      'ui-accordion',
      `ui-accordion--${this.size()}`,
      `ui-accordion--${this.variant()}`,
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  toggle(item: AccordionItem): void {
    if (item.disabled) {
      return;
    }

    const current = this.openedIds();
    const isOpen = current.includes(item.id);

    const next = this.multiple()
      ? isOpen
        ? current.filter((id) => id !== item.id)
        : [...current, item.id]
      : isOpen
        ? []
        : [item.id];

    this.openedIdsState.set(next);

    this.itemToggle.emit({
      item,
      opened: !isOpen,
      openedIds: next,
    });
  }

  isOpen(id: string): boolean {
    return this.openedIds().includes(id);
  }

  getTriggerId(id: string): string {
    return `ui-accordion-trigger-${id}`;
  }

  getPanelId(id: string): string {
    return `ui-accordion-panel-${id}`;
  }
}
