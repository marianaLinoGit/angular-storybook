import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

export type UiModalType = 'confirmation' | 'informative' | 'content';
export type UiModalSize = 'sm' | 'md' | 'lg';
export type UiModalPresentationMode = 'fixed' | 'inline';

@Component({
  selector: 'ui-modal',
  standalone: true,
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiModalComponent {
  open = input(true);
  type = input<UiModalType>('informative');
  title = input('Título do modal');
  description = input('Descrição do modal');
  icon = input<string | null>(null);
  confirmLabel = input('Confirmar');
  cancelLabel = input('Cancelar');
  closeLabel = input('Fechar');
  showCloseButton = input(true);
  size = input<UiModalSize>('md');
  presentationMode = input<UiModalPresentationMode>('fixed');
  customClass = input('');

  confirmed = output<void>();
  cancelled = output<void>();
  closed = output<void>();

  private internalClosed = signal(false);

  isVisible = computed(() => this.open() && !this.internalClosed());

  backdropClasses = computed(() =>
    ['ui-modal-backdrop', `ui-modal-backdrop--${this.presentationMode()}`]
      .filter(Boolean)
      .join(' '),
  );

  modalClasses = computed(() =>
    ['ui-modal', `ui-modal--${this.size()}`, this.customClass()]
      .filter(Boolean)
      .join(' '),
  );

  close(): void {
    this.internalClosed.set(true);
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
    this.close();
  }

  cancel(): void {
    this.cancelled.emit();
    this.close();
  }
}
