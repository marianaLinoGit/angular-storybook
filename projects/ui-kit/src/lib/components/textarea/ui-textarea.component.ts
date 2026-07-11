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

export type UiTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [UiFieldErrorComponent, UiLabelComponent],
  templateUrl: './ui-textarea.component.html',
  styleUrl: './ui-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextareaComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });
  private readonly formField = inject(UI_FORM_FIELD, { optional: true });

  label = input('');
  ariaLabel = input<string | null>(null);
  hideLabel = input(false);
  hideError = input(false);

  id = input(`ui-textarea-${crypto.randomUUID()}`);
  name = input<string | null>(null);
  placeholder = input('');
  autocomplete = input<string | null>(null);
  rows = input(3);
  cols = input<number | null>(null);
  maxlength = input<number | null>(null);
  resize = input<UiTextareaResize>('vertical');

  required = input(false);
  readonly = input(false);
  disabled = input(false);

  optionalText = input('');
  showOptionalText = input(false);
  labelTooltip = input('');

  errorMessage = input('');
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
  labelTooltipId = computed(() =>
    this.labelTooltip().trim() ? `${this.id()}-tooltip` : null,
  );

  textareaAriaLabel = computed(() => {
    if ((this.label() && !this.hideLabel()) || this.formField?.labelId()) {
      return null;
    }

    return this.ariaLabel();
  });

  textareaAriaLabelledBy = computed(
    () => this.formField?.labelId() ?? null,
  );

  describedBy = computed(() => {
    if (this.formField) {
      return this.formField.describedBy();
    }

    const ids = [
      this.labelTooltip().trim() && this.label() && !this.hideLabel()
        ? this.labelTooltipId()
        : null,
      this.hasError() ? this.errorId() : null,
    ].filter(Boolean);

    return ids.length ? ids.join(' ') : null;
  });

  classes = computed(() =>
    [
      'ui-textarea',
      `ui-textarea--resize-${this.resize()}`,
      this.hasError() ? 'ui-textarea--error' : '',
      this.isDisabled() ? 'ui-textarea--disabled' : '',
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

    const value = (event.target as HTMLTextAreaElement).value;

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
