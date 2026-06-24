import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-accordion',
  standalone: true,
  templateUrl: './ui-accordion.component.html',
  styleUrl: './ui-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  items = input<AccordionItem[]>([]);
  multiple = input(false);

  openedIds = signal<string[]>([]);

  toggle(id: string, disabled?: boolean): void {
    if (disabled) return;

    const current = this.openedIds();
    const isOpen = current.includes(id);

    if (this.multiple()) {
      this.openedIds.set(
        isOpen ? current.filter((item) => item !== id) : [...current, id],
      );
      return;
    }

    this.openedIds.set(isOpen ? [] : [id]);
  }

  isOpen(id: string): boolean {
    return this.openedIds().includes(id);
  }
}
