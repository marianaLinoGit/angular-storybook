import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
export class UiTabsComponent {
  tabs = input<TabItem[]>([]);
  initialActiveId = input<string | null>(null);

  private selectedId = signal<string | null>(null);

  tabChange = output<TabItem>();

  activeTab = computed(() => {
    const tabs = this.tabs();
    const selectedId = this.selectedId();
    const initialActiveId = this.initialActiveId();

    return (
      tabs.find((tab) => tab.id === selectedId && !tab.disabled) ||
      tabs.find((tab) => tab.id === initialActiveId && !tab.disabled) ||
      tabs.find((tab) => !tab.disabled) ||
      null
    );
  });

  selectTab(tab: TabItem): void {
    if (tab.disabled) {
      return;
    }

    this.selectedId.set(tab.id);
    this.tabChange.emit(tab);
  }

  isActive(tab: TabItem): boolean {
    return this.activeTab()?.id === tab.id;
  }

  getTabId(tab: TabItem): string {
    return `ui-tab-${tab.id}`;
  }

  getPanelId(tab: TabItem): string {
    return `ui-tab-panel-${tab.id}`;
  }
}
