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
import { UiLabelComponent } from '../label/ui-label.component';

export interface UiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [UiLabelComponent],
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelectComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  label = input('');
  id = input(`ui-select-${crypto.randomUUID()}`);
  name = input<string | null>(null);
  placeholder = input('Selecione');
  options = input<UiSelectOption[]>([]);
  required = input(false);
  disabled = input(false);
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

  classes = computed(() =>
    [
      'ui-select',
      this.hasError() ? 'ui-select--error' : '',
      this.disabled() || this.disabledState() ? 'ui-select--disabled' : '',
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
    const control = this.ngControl?.control;

    return Boolean(
      this.showError() ||
      (control?.hasError('required') && (control.touched || control.dirty)),
    );
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  handleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

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
