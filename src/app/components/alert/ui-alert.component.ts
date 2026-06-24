import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type AlertColor = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './ui-alert.component.html',
  styleUrl: './ui-alert.component.scss',
})
export class UiAlertComponent {
  @Input() message = 'Mensagem do alerta';
  @Input() color: AlertColor = 'info';
  @Input() icon?: string;
  @Input() closable = true;
  @Input() fixed = true;
  @Input() visible = true;

  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.visible = false;
    this.closed.emit();
  }
}
