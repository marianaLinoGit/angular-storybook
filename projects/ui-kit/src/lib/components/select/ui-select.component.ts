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
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';
import { UiLabelComponent } from '../label/ui-label.component';

export interface UiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  iconName?: UiIconName;
  iconLabel?: string | null;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [UiLabelComponent, UiIconComponent],
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

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  label = input('');
  ariaLabel = input<string | null>(null);

  id = input(`ui-select-${crypto.randomUUID()}`);
  name = input<string | null>(null);
  placeholder = input('Selecione');
  searchPlaceholder = input('Buscar...');
  searchAriaLabel = input('Buscar opção');
  emptyText = input('Nenhuma opção encontrada');
  options = input<UiSelectOption[]>([]);

  required = input(false);
  disabled = input(false);

  optionalText = input('Opcional');
  showOptionalText = input(true);

  errorMessage = input('*Campo obrigatório');
  showError = input(false);
  customClass = input('');

  size = input<'sm' | 'md'>('md');

  searchable = input(false);
  serverSearch = input(false);
  allowClear = input(false);
  clearAriaLabel = input('Limpar seleção');

  valueChange = output<string>();
  searchChange = output<string>();

  /** Valor controlado externamente (one-way). */
  selectedValue = input<string | number | null>(null, { alias: 'value' });

  value = signal('');
  searchTerm = signal('');
  opened = signal(false);
  disabledState = signal(false);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    effect(
      () => {
        const external = this.selectedValue();
        if (external == null) return;

        const next = String(external);
        if (next !== this.value()) {
          this.value.set(next);
        }
      },
      { allowSignalWrites: true },
    );
  }

  isDisabled = computed(() => this.disabled() || this.disabledState());

  errorId = computed(() => `${this.id()}-error`);
  labelId = computed(() => `${this.id()}-label`);
  listboxId = computed(() => `${this.id()}-listbox`);

  chevronIcon = computed<UiIconName>(() =>
    this.opened() ? 'chevron-up' : 'chevron-down',
  );

  selectAriaLabel = computed(() => {
    if (this.label()) return null;
    return this.ariaLabel();
  });

  selectedOption = computed(
    () =>
      this.options().find((option) => option.value === this.value()) ?? null,
  );

  selectedLabel = computed(() => this.selectedOption()?.label ?? '');

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
      this.hasError() ? 'ui-select--error' : '',
      this.isDisabled() ? 'ui-select--disabled' : '',
      this.opened() ? 'ui-select--open' : '',
      !this.value() ? 'ui-select--placeholder' : '',
      this.allowClear() && this.value() ? 'ui-select--clearable' : '',
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
      (control?.invalid && (control.touched || control.dirty)),
    );
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  toggle(): void {
    if (this.isDisabled()) return;

    this.opened.update((value) => !value);

    if (this.opened() && this.searchable()) {
      queueMicrotask(() => this.searchInput()?.nativeElement.focus());
    }
  }

  close(): void {
    this.opened.set(false);
    this.searchTerm.set('');
  }

  selectOption(option: UiSelectOption): void {
    if (this.isDisabled() || option.disabled) return;

    this.value.set(option.value);
    this.onChange(option.value);
    this.valueChange.emit(option.value);
    this.close();
  }

  clearValue(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isDisabled()) return;

    this.value.set('');
    this.onChange('');
    this.valueChange.emit('');
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
}
