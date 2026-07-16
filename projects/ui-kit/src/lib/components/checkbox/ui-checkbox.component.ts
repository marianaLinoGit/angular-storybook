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
import { UiIconComponent } from '../icon/ui-icon.component';
import { UiTooltipComponent } from '../tooltip/ui-tooltip.component';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [UiFieldErrorComponent, UiIconComponent, UiTooltipComponent],
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
  labelTooltip = input('');
  ariaLabel = input<string | null>(null);
  hideError = input(false);

  linkLabel = input<string | null>(null);
  linkUrl = input<string | null>(null);
  linkTarget = input<'_self' | '_blank'>('_blank');

  required = input(false);
  disabled = input(false);
  showError = input(false);
  errorMessage = input('');
  customClass = input('');
  checkedInput = input(false, { alias: 'checked' });

  checkedChange = output<boolean>();

  checked = signal(false);
  disabledState = signal(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    effect(() => {
      if (!this.ngControl) {
        this.checked.set(this.checkedInput());
      }
    });
  }

  isDisabled = computed(() => this.disabled() || this.disabledState());

  errorId = computed(() => `${this.id()}-error`);

  labelTooltipId = computed(() =>
    this.labelTooltip().trim() ? `${this.id()}-label-tooltip` : null,
  );

  describedBy = computed(() => {
    if (this.formField) {
      return this.formField.describedBy();
    }

    const ids = [
      this.labelTooltipId(),
      this.hasError() ? this.errorId() : null,
    ].filter(Boolean);

    return ids.length ? ids.join(' ') : null;
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
