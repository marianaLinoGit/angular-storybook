import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UiTooltipComponent } from '../tooltip/ui-tooltip.component';

@Component({
  selector: 'ui-label',
  standalone: true,
  imports: [UiTooltipComponent],
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLabelComponent {
  label = input('');
  forId = input<string | null>(null);
  required = input(false);
  optionalText = input('');
  showOptionalText = input(true);
  customClass = input('');
  labelId = input<string | null>(null);
  labelTooltip = input('');
  labelTooltipId = input<string | null>(null);

  classes = computed(() =>
    ['ui-label', this.customClass()].filter(Boolean).join(' '),
  );

  resolvedLabelTooltipId = computed(() => {
    if (!this.labelTooltip().trim()) {
      return null;
    }

    const explicit = this.labelTooltipId()?.trim();
    if (explicit) {
      return explicit;
    }

    const base = this.labelId() || this.forId() || 'ui-label';
    return `${base}-tooltip`;
  });
}
