import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
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
  description = input<string | null>('Descrição do modal');
  icon = input<string | null>(null);

  confirmLabel = input('Confirmar');
  cancelLabel = input('Cancelar');
  closeLabel = input('Fechar');
  closeAriaLabel = input('Fechar modal');

  showCloseButton = input(true);
  closeOnBackdrop = input(true);
  closeOnEscape = input(true);

  size = input<UiModalSize>('md');
  presentationMode = input<UiModalPresentationMode>('fixed');
  customClass = input('');

  confirmed = output<void>();
  cancelled = output<void>();
  closed = output<void>();

  private internalClosed = signal(false);

  titleId = `ui-modal-title-${crypto.randomUUID()}`;
  descriptionId = `ui-modal-description-${crypto.randomUUID()}`;

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

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (!this.isVisible() || !this.closeOnEscape()) {
      return;
    }

    this.close();
  }

  handleBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) {
      return;
    }

    if (event.target === event.currentTarget) {
      this.close();
    }
  }

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
