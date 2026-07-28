import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { UI_FORM_FIELD } from '../form-field/ui-form-field.context';
import { UiFieldErrorComponent } from '../field-error/ui-field-error.component';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';
import { UiLabelComponent } from '../label/ui-label.component';

export interface UiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  iconName?: UiIconName;
  iconLabel?: string | null;
}

export type UiSelectValue = string | string[] | null;

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [UiFieldErrorComponent, UiLabelComponent, UiIconComponent],
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelectComponent implements ControlValueAccessor {
  private readonly host = inject(ElementRef<HTMLElement>);

  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });
  private readonly formField = inject(UI_FORM_FIELD, { optional: true });

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  label = input('');
  ariaLabel = input<string | null>(null);
  hideLabel = input(false);
  hideError = input(false);

  id = input(`ui-select-${crypto.randomUUID()}`);
  name = input<string | null>(null);
  placeholder = input('');
  searchPlaceholder = input('');
  searchAriaLabel = input('');
  emptyText = input('');
  options = input<UiSelectOption[]>([]);

  required = input(false);
  disabled = input(false);

  optionalText = input('');
  showOptionalText = input(false);
  labelTooltip = input('');

  errorMessage = input('');
  showError = input(false);
  customClass = input('');

  size = input<'sm' | 'md'>('md');

  searchable = input(false);
  serverSearch = input(false);
  allowClear = input(false);
  clearAriaLabel = input('');
  multiple = input(false);
  removeChipAriaLabel = input('Remover');

  valueChange = output<string | string[]>();
  searchChange = output<string>();

  /** Valor controlado externamente (one-way). */
  selectedValue = input<string | number | string[] | null>(null, {
    alias: 'value',
  });

  value = signal('');
  values = signal<string[]>([]);
  searchTerm = signal('');
  opened = signal(false);
  disabledState = signal(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    effect(() => {
      const external = this.selectedValue();
      if (external == null) return;

      if (this.multiple()) {
        const next = Array.isArray(external)
          ? external.map(String)
          : [String(external)];
        if (!this.sameStringArrays(next, this.values())) {
          this.values.set(next);
        }
        return;
      }

      const next = String(external);
      if (next !== this.value()) {
        this.value.set(next);
      }
    });
  }

  isDisabled = computed(() => this.disabled() || this.disabledState());

  errorId = computed(() => `${this.id()}-error`);
  labelId = computed(() => `${this.id()}-label`);
  labelTooltipId = computed(() =>
    this.labelTooltip().trim() ? `${this.labelId()}-tooltip` : null,
  );
  listboxId = computed(() => `${this.id()}-listbox`);

  chevronIcon = computed<UiIconName>(() =>
    this.opened() ? 'chevron-up' : 'chevron-down',
  );

  selectAriaLabel = computed(() => {
    if ((this.label() && !this.hideLabel()) || this.formField?.labelId()) {
      return null;
    }

    return this.ariaLabel();
  });

  selectAriaLabelledBy = computed(() => {
    if (this.label() && !this.hideLabel()) {
      return this.labelId();
    }

    return this.formField?.labelId() ?? null;
  });

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

  selectedOption = computed(
    () =>
      this.options().find((option) => option.value === this.value()) ?? null,
  );

  selectedLabel = computed(() => this.selectedOption()?.label ?? '');

  selectedOptions = computed(() => {
    const selected = new Set(this.values());
    return this.options().filter((option) => selected.has(option.value));
  });

  hasSelection = computed(() =>
    this.multiple() ? this.values().length > 0 : Boolean(this.value()),
  );

  visibleOptions = computed(() => {
    if (this.serverSearch()) return this.options();

    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.options();

    return this.options().filter((option) =>
      option.label.toLowerCase().includes(term),
    );
  });

  classes = computed(() =>
    [
      'ui-select',
      `ui-select--${this.size()}`,
      this.multiple() ? 'ui-select--multiple' : '',
      this.hasSelection() ? '' : 'ui-select--placeholder',
      this.allowClear() && this.hasSelection() ? 'ui-select--clearable' : '',
      this.hasError() ? 'ui-select--error' : '',
      this.isDisabled() ? 'ui-select--disabled' : '',
      this.opened() ? 'ui-select--open' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  hasRequired(): boolean {
    return (
      this.required() ||
      !!this.ngControl?.control?.hasValidator(Validators.required)
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

  isOptionSelected(option: UiSelectOption): boolean {
    if (this.multiple()) {
      return this.values().includes(option.value);
    }

    return option.value === this.value();
  }

  onChange: (value: string | string[]) => void = () => {};
  onTouched: () => void = () => {};

  toggle(): void {
    if (this.isDisabled()) return;

    const next = !this.opened();
    this.opened.set(next);

    if (next) {
      if (this.searchable()) {
        queueMicrotask(() => this.searchInput()?.nativeElement.focus());
      }
    } else {
      this.searchTerm.set('');
    }
  }

  close(): void {
    this.opened.set(false);
    this.searchTerm.set('');
  }

  selectOption(option: UiSelectOption): void {
    if (this.isDisabled() || option.disabled) return;

    if (this.multiple()) {
      const current = this.values();
      const next = current.includes(option.value)
        ? current.filter((value) => value !== option.value)
        : [...current, option.value];

      this.values.set(next);
      this.onChange(next);
      this.valueChange.emit(next);
      return;
    }

    this.value.set(option.value);
    this.onChange(option.value);
    this.valueChange.emit(option.value);
    this.close();
  }

  removeChip(option: UiSelectOption, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isDisabled() || !this.multiple()) return;

    const next = this.values().filter((value) => value !== option.value);
    this.values.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
  }

  clearValue(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isDisabled()) return;

    if (this.multiple()) {
      this.values.set([]);
      this.onChange([]);
      this.valueChange.emit([]);
    } else {
      this.value.set('');
      this.onChange('');
      this.valueChange.emit('');
    }

    this.searchTerm.set('');
    this.close();
  }

  handleSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.searchTerm.set(value);
    this.searchChange.emit(value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  writeValue(value: UiSelectValue): void {
    if (this.multiple()) {
      if (Array.isArray(value)) {
        this.values.set(value.map(String));
        return;
      }

      if (value == null || value === '') {
        this.values.set([]);
        return;
      }

      this.values.set([String(value)]);
      return;
    }

    this.value.set(value == null ? '' : String(value));
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (!target) return;

    if (!this.host.nativeElement.contains(target)) {
      this.close();
    }
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.close();
  }

  private sameStringArrays(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((value, index) => value === b[index]);
  }
}
