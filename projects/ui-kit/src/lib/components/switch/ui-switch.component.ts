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
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'ui-switch',
  standalone: true,
  templateUrl: './ui-switch.component.html',
  styleUrl: './ui-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSwitchComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  id = input(`ui-switch-${crypto.randomUUID()}`);
  name = input<string | null>(null);
  label = input('');
  checkedLabel = input<string | null>(null);
  uncheckedLabel = input<string | null>(null);
  showSideLabels = input(false);
  checkedInput = input(false, { alias: 'checked' });
  disabled = input(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  customClass = input('');

  checkedChange = output<boolean>();

  checked = signal(false);
  disabledState = signal(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    effect(() => {
      this.checked.set(this.checkedInput());
    });
  }

  classes = computed(() =>
    [
      'ui-switch',
      `ui-switch--${this.size()}`,
      this.checked() ? 'ui-switch--checked' : '',
      this.disabled() || this.disabledState() ? 'ui-switch--disabled' : '',
      this.showSideLabels() ? 'ui-switch--side-labels' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  statusLabel = computed(() =>
    this.checked()
      ? this.checkedLabel() || 'Ativado'
      : this.uncheckedLabel() || 'Desativado',
  );

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  toggle(): void {
    if (this.disabled() || this.disabledState()) {
      return;
    }

    const next = !this.checked();

    this.checked.set(next);
    this.onChange(next);
    this.checkedChange.emit(next);
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
