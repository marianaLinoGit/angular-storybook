import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  output,
} from '@angular/core';
import { UiIconComponent } from '../icon/ui-icon.component';
import { UiTabComponent } from './ui-tab.component';

export type UiTabsVariant = 'underline' | 'card';

export type UiTabChangeEvent = {
  id: string;
  label: string;
};

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [NgTemplateOutlet, UiIconComponent],
  templateUrl: './ui-tabs.component.html',
  styleUrl: './ui-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTabsComponent {
  tabItems = contentChildren(UiTabComponent);

  initialActiveId = input<string | null>(null);
  activeId = model<string | null>(null);
  ariaLabel = input('Abas');
  variant = input<UiTabsVariant>('underline');

  tabChange = output<UiTabChangeEvent>();

  tabsClasses = computed(() =>
    ['ui-tabs', `ui-tabs--${this.variant()}`].join(' '),
  );

  activeTab = computed(() => {
    const items = this.tabItems();
    const activeId = this.activeId();
    const initialActiveId = this.initialActiveId();

    if (activeId !== null) {
      const selected = items.find(
        (tab) => tab.id() === activeId && !tab.disabled(),
      );
      if (selected) {
        return selected;
      }
    }

    if (initialActiveId !== null) {
      const initial = items.find(
        (tab) => tab.id() === initialActiveId && !tab.disabled(),
      );
      if (initial) {
        return initial;
      }
    }

    return items.find((tab) => !tab.disabled()) ?? null;
  });

  selectTab(tab: UiTabComponent): void {
    if (tab.disabled()) {
      return;
    }

    this.activeId.set(tab.id());
    this.tabChange.emit({ id: tab.id(), label: tab.label() });
  }

  isActive(tab: UiTabComponent): boolean {
    return this.activeTab()?.id() === tab.id();
  }

  getTabId(tab: UiTabComponent): string {
    return `ui-tab-${tab.id()}`;
  }

  getPanelId(tab: UiTabComponent): string {
    return `ui-tab-panel-${tab.id()}`;
  }
}
