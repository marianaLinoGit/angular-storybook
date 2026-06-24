import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ModalType = 'confirmation' | 'informative' | 'content';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.scss',
})
export class UiModalComponent {
  @Input() open = true;
  @Input() type: ModalType = 'informative';
  @Input() title = 'Título do modal';
  @Input() description = 'Descrição do modal';
  @Input() confirmLabel = 'Confirmar';
  @Input() cancelLabel = 'Cancelar';
  @Input() closeLabel = 'Fechar';
  @Input() showCloseButton = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.open = false;
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
