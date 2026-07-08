import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { UiIconName } from '../icon/ui-icon.component';

@Component({
  selector: 'ui-tab',
  standalone: true,
  template: `
    <ng-template #panelTpl>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTabComponent {
  id = input.required<string>();
  label = input.required<string>();
  icon = input<UiIconName | null>(null);
  disabled = input(false);
  count = input<number | undefined>(undefined);

  readonly panelTemplate = viewChild.required<TemplateRef<unknown>>('panelTpl');
}
