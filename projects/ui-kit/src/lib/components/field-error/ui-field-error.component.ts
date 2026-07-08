import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ui-field-error',
  standalone: true,
  templateUrl: './ui-field-error.component.html',
  styleUrl: './ui-field-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFieldErrorComponent {
  id = input.required<string>();
  message = input.required<string>();

  /** Sem margem superior — use dentro de `ui-form-field`, que já aplica gap. */
  flush = input(false);

  classes = computed(() =>
    ['ui-field-error', this.flush() ? 'ui-field-error--flush' : '']
      .filter(Boolean)
      .join(' '),
  );
}
