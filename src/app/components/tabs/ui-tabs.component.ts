import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  content: string;
  count?: number;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'ui-tabs',
  standalone: true,
  templateUrl: './ui-tabs.component.html',
  styleUrl: './ui-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  tabs = input<TabItem[]>([]);
  activeId = signal<string | null>(null);

  tabChange = output<TabItem>();

  selectTab(tab: TabItem): void {
    if (tab.disabled) return;

    this.activeId.set(tab.id);
    this.tabChange.emit(tab);
  }

  isActive(tab: TabItem): boolean {
    return this.activeId()
      ? this.activeId() === tab.id
      : this.tabs()[0]?.id === tab.id;
  }
}
