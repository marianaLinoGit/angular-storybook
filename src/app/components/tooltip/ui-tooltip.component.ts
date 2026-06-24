import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  templateUrl: './ui-tooltip.component.html',
  styleUrl: './ui-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  text = input('Passe o mouse');
  html = input<string | null>(null);
  position = input<'top' | 'right' | 'bottom' | 'left'>('top');
}
