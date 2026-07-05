import { InjectionToken } from '@angular/core';

export interface UiFormFieldContext {
  hasError(): boolean;
  describedBy(): string | null;
  labelId(): string | null;
}

export const UI_FORM_FIELD = new InjectionToken<UiFormFieldContext>(
  'UI_FORM_FIELD',
);
