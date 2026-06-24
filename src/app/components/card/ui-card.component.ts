import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UiSize } from '@design-system/types/ui.types';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [NgClass, NgIf, NgTemplateOutlet],
  templateUrl: './ui-card.component.html',
  styleUrl: './ui-card.component.scss',
})
export class UiCardComponent {
  @Input() title = 'Título do card';
  @Input() subtitle?: string;
  @Input() description = 'Descrição do card';
  @Input() imageUrl?: string;
  @Input() size: UiSize = 'md';
  @Input() shadow = true;
  @Input() bordered = false;
  @Input() clickable = false;
  @Input() highlighted = false;
  @Input() align: 'left' | 'center' = 'left';
  @Input() footer?: string;
}
