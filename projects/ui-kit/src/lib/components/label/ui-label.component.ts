import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'ui-label',
  standalone: true,
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

  classes = computed(() =>
    ['ui-label', this.customClass()].filter(Boolean).join(' '),
  );
}
