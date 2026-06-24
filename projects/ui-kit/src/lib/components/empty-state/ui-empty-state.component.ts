import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type UiEmptyStateSize = 'sm' | 'md' | 'lg';
export type UiEmptyStateAlign = 'left' | 'center' | 'right';
export type UiEmptyStateVariant = 'default' | 'dashed' | 'plain';
export type UiEmptyStateButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  templateUrl: './ui-empty-state.component.html',
  styleUrl: './ui-empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiEmptyStateComponent {
  icon = input('📭');
  title = input('Nenhum resultado encontrado');
  description = input('Tente ajustar os filtros ou criar um novo item.');
  buttonLabel = input<string | null>('Criar novo');

  size = input<UiEmptyStateSize>('md');
  align = input<UiEmptyStateAlign>('center');
  variant = input<UiEmptyStateVariant>('dashed');
  buttonVariant = input<UiEmptyStateButtonVariant>('primary');
  buttonDisabled = input(false);
  customClass = input('');

  buttonClick = output<void>();

  titleId = `ui-empty-state-title-${crypto.randomUUID()}`;
  descriptionId = `ui-empty-state-description-${crypto.randomUUID()}`;

  classes = computed(() =>
    [
      'ui-empty-state',
      `ui-empty-state--${this.size()}`,
      `ui-empty-state--align-${this.align()}`,
      `ui-empty-state--${this.variant()}`,
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  buttonClasses = computed(() =>
    [
      'ui-empty-state__button',
      `ui-empty-state__button--${this.buttonVariant()}`,
    ].join(' '),
  );

  handleButtonClick(): void {
    if (!this.buttonDisabled()) {
      this.buttonClick.emit();
    }
  }
}
