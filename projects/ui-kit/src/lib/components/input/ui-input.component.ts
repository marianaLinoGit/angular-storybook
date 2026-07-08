import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { UI_FORM_FIELD } from '../form-field/ui-form-field.context';
import { UiFieldErrorComponent } from '../field-error/ui-field-error.component';
import { UiLabelComponent } from '../label/ui-label.component';

export type UiInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'time';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [UiFieldErrorComponent, UiLabelComponent],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });
  private readonly formField = inject(UI_FORM_FIELD, { optional: true });

  label = input('');
  ariaLabel = input<string | null>(null);
  hideLabel = input(false);
  hideError = input(false);

  id = input(`ui-input-${crypto.randomUUID()}`);
  name = input<string | null>(null);
  type = input<UiInputType>('text');
  placeholder = input('');
  autocomplete = input<string | null>(null);
  inputMode = input<string | null>(null);
  min = input<string | number | null>(null);
  max = input<string | number | null>(null);
  step = input<string | number | null>(null);

  required = input(false);
  readonly = input(false);
  disabled = input(false);

  optionalText = input('Opcional');
  showOptionalText = input(true);

  errorMessage = input('*Campo obrigatório');
  showError = input(false);
  customClass = input('');

  valueChange = output<string>();

  value = signal('');
  disabledState = signal(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  isDisabled = computed(() => this.disabled() || this.disabledState());

  errorId = computed(() => `${this.id()}-error`);

  inputAriaLabel = computed(() => {
    if ((this.label() && !this.hideLabel()) || this.formField?.labelId()) {
      return null;
    }

    return this.ariaLabel();
  });

  inputAriaLabelledBy = computed(
    () => this.formField?.labelId() ?? null,
  );

  describedBy = computed(() => {
    if (this.formField) {
      return this.formField.describedBy();
    }

    return this.hasError() ? this.errorId() : null;
  });

  classes = computed(() =>
    [
      'ui-input',
      this.hasError() ? 'ui-input--error' : '',
      this.isDisabled() ? 'ui-input--disabled' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  hasRequired(): boolean {
    const control = this.ngControl?.control;

    return Boolean(
      this.required() || control?.hasValidator?.(Validators.required),
    );
  }

  hasError(): boolean {
    if (this.formField) {
      return this.formField.hasError();
    }

    const control = this.ngControl?.control;

    return Boolean(
      this.showError() ||
      (control?.invalid && (control.touched || control.dirty)),
    );
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  handleInput(event: Event): void {
    if (this.isDisabled()) {
      return;
    }

    const value = (event.target as HTMLInputElement).value;

    this.value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }
}
