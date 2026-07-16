import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { UI_FORM_FIELD } from '../form-field/ui-form-field.context';
import { UiFieldErrorComponent } from '../field-error/ui-field-error.component';
import { UiLabelComponent } from '../label/ui-label.component';

export interface UiRadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type UiRadioOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  imports: [UiFieldErrorComponent, UiLabelComponent],
  templateUrl: './ui-radio-group.component.html',
  styleUrl: './ui-radio-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRadioGroupComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });
  private readonly formField = inject(UI_FORM_FIELD, { optional: true });

  id = input(`ui-radio-group-${crypto.randomUUID()}`);
  name = input<string | null>(null);
  label = input('');
  ariaLabel = input<string | null>(null);
  hideLabel = input(false);
  hideError = input(false);

  options = input<UiRadioOption[]>([]);
  orientation = input<UiRadioOrientation>('horizontal');
  allowClear = input(false);

  required = input(false);
  disabled = input(false);
  showError = input(false);
  errorMessage = input('');
  customClass = input('');
  valueInput = input<string | null>(null, { alias: 'value' });

  valueChange = output<string | null>();

  value = signal<string | null>(null);
  disabledState = signal(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    effect(() => {
      if (!this.ngControl) {
        this.value.set(this.valueInput());
      }
    });
  }

  isDisabled = computed(() => this.disabled() || this.disabledState());

  groupName = computed(() => this.name() || this.id());

  errorId = computed(() => `${this.id()}-error`);

  labelId = computed(() => `${this.id()}-label`);

  describedBy = computed(() => {
    if (this.formField) {
      return this.formField.describedBy();
    }

    return this.hasError() ? this.errorId() : null;
  });

  classes = computed(() =>
    [
      'ui-radio-group',
      `ui-radio-group--${this.orientation()}`,
      this.hasError() ? 'ui-radio-group--error' : '',
      this.isDisabled() ? 'ui-radio-group--disabled' : '',
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

  optionId(option: UiRadioOption, index: number): string {
    return `${this.id()}-option-${index}-${option.value}`;
  }

  isOptionDisabled(option: UiRadioOption): boolean {
    return this.isDisabled() || Boolean(option.disabled);
  }

  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  handleClick(event: Event, option: UiRadioOption): void {
    if (this.isOptionDisabled(option)) {
      event.preventDefault();
      return;
    }

    if (this.allowClear() && this.value() === option.value) {
      event.preventDefault();
      this.value.set(null);
      this.onChange(null);
      this.valueChange.emit(null);
    }
  }

  handleChange(option: UiRadioOption): void {
    if (this.isOptionDisabled(option)) {
      return;
    }

    this.value.set(option.value);
    this.onChange(option.value);
    this.valueChange.emit(option.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }
}
