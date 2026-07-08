import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
} from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { UiFieldErrorComponent } from '../field-error/ui-field-error.component';
import { UiLabelComponent } from '../label/ui-label.component';
import {
  UI_FORM_FIELD,
  UiFormFieldContext,
} from './ui-form-field.context';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  imports: [UiFieldErrorComponent, UiLabelComponent],
  templateUrl: './ui-form-field.component.html',
  styleUrl: './ui-form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: UI_FORM_FIELD, useExisting: UiFormFieldComponent }],
})
export class UiFormFieldComponent implements UiFormFieldContext {
  private readonly ngControl = contentChild(NgControl, { descendants: true });

  label = input('');
  hint = input('');
  optionalText = input('Opcional');
  showOptionalText = input(true);
  controlId = input<string | null>(null);
  customClass = input('');
  required = input(false);
  errorMessage = input<string | null>(null);
  showError = input<boolean | null>(null);

  id = input(`ui-form-field-${crypto.randomUUID()}`);

  labelIdAttr = computed(() => `${this.id()}-label`);
  hintId = computed(() => `${this.id()}-hint`);
  errorId = computed(() => `${this.id()}-error`);

  classes = computed(() =>
    ['ui-form-field', this.customClass()].filter(Boolean).join(' '),
  );

  private readonly invalidControl = computed(() => {
    const control = this.ngControl()?.control;

    return Boolean(control?.invalid && (control.touched || control.dirty));
  });

  hasRequired = computed(() => {
    const control = this.ngControl()?.control;

    return Boolean(
      this.required() ||
        control?.hasValidator?.(Validators.required) ||
        control?.hasValidator?.(Validators.requiredTrue),
    );
  });

  hasErrorState = computed(() => {
    const forced = this.showError();

    if (forced === true) {
      return true;
    }

    if (forced === false) {
      return false;
    }

    return this.invalidControl();
  });

  describedByState = computed(() => {
    const ids = [
      this.hint() ? this.hintId() : null,
      this.hasErrorState() && this.errorMessage() ? this.errorId() : null,
    ].filter(Boolean);

    return ids.length ? ids.join(' ') : null;
  });

  hasError(): boolean {
    return this.hasErrorState();
  }

  describedBy(): string | null {
    return this.describedByState();
  }

  labelId(): string | null {
    return this.label() ? this.labelIdAttr() : null;
  }
}
