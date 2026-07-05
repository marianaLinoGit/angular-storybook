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
import { UiIconComponent } from '../icon/ui-icon.component';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [UiIconComponent],
  templateUrl: './ui-checkbox.component.html',
  styleUrl: './ui-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCheckboxComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });
  private readonly formField = inject(UI_FORM_FIELD, { optional: true });

  id = input(`ui-checkbox-${crypto.randomUUID()}`);
  name = input<string | null>(null);
  label = input('');
  ariaLabel = input<string | null>(null);
  hideError = input(false);

  linkLabel = input<string | null>(null);
  linkUrl = input<string | null>(null);
  linkTarget = input<'_self' | '_blank'>('_blank');

  required = input(false);
  disabled = input(false);
  showError = input(false);
  errorMessage = input('*Campo obrigatório');
  customClass = input('');

  checkedChange = output<boolean>();

  checked = signal(false);
  disabledState = signal(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  isDisabled = computed(() => this.disabled() || this.disabledState());

  errorId = computed(() => `${this.id()}-error`);

  describedBy = computed(() => {
    if (this.formField) {
      return this.formField.describedBy();
    }

    return this.hasError() ? this.errorId() : null;
  });

  linkRel = computed(() =>
    this.linkTarget() === '_blank' ? 'noopener noreferrer' : null,
  );

  classes = computed(() =>
    [
      'ui-checkbox',
      this.hasError() ? 'ui-checkbox--error' : '',
      this.isDisabled() ? 'ui-checkbox--disabled' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  hasRequired(): boolean {
    const control = this.ngControl?.control;

    return Boolean(
      this.required() ||
      control?.hasValidator?.(Validators.required) ||
      control?.hasValidator?.(Validators.requiredTrue),
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

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  handleChange(event: Event): void {
    if (this.isDisabled()) {
      return;
    }

    const checked = (event.target as HTMLInputElement).checked;

    this.checked.set(checked);
    this.onChange(checked);
    this.checkedChange.emit(checked);
  }

  handleLinkClick(event: Event): void {
    event.stopPropagation();
  }

  handleBlur(): void {
    this.onTouched();
  }

  writeValue(value: boolean | null): void {
    this.checked.set(Boolean(value));
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }
}
