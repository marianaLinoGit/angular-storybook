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
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';

@Component({
  selector: 'ui-switch',
  standalone: true,
  imports: [UiIconComponent],
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
  ariaLabel = input<string | null>(null);

  checkedLabel = input<string | null>(null);
  uncheckedLabel = input<string | null>(null);
  checkedIcon = input<UiIconName | null>(null);
  uncheckedIcon = input<UiIconName | null>(null);
  showOnlyCurrentSide = input(false);

  activeText = input('Ativado');
  inactiveText = input('Desativado');

  showSideLabels = input(false);
  showStatus = input(true);
  checkedValue = input(false, { alias: 'checked' });

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
      if (!this.ngControl) {
        this.checked.set(this.checkedValue());
      }
    });
  }

  isDisabled = computed(() => this.disabled() || this.disabledState());

  hasIcon = computed(() => !!this.checkedIcon() || !!this.uncheckedIcon());

  isIconOnly = computed(
    () =>
      this.hasIcon() &&
      !this.checkedLabel() &&
      !this.uncheckedLabel() &&
      !this.label(),
  );

  switchAriaLabel = computed(() => {
    if (this.label()) return null;

    return this.ariaLabel() || this.statusLabel();
  });

  classes = computed(() =>
    [
      'ui-switch',
      `ui-switch--${this.size()}`,
      this.checked() ? 'ui-switch--checked' : '',
      this.isDisabled() ? 'ui-switch--disabled' : '',
      this.showSideLabels() ? 'ui-switch--side-labels' : '',
      this.isIconOnly() ? 'ui-switch--icon-only' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  statusLabel = computed(() =>
    this.checked()
      ? this.checkedLabel() || this.activeText()
      : this.uncheckedLabel() || this.inactiveText(),
  );

  shouldShowStatus = computed(
    () => !this.showSideLabels() && this.showStatus() && !this.isIconOnly(),
  );

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  toggle(): void {
    if (this.isDisabled()) return;

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
