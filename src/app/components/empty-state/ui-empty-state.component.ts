import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  templateUrl: './ui-empty-state.component.html',
  styleUrl: './ui-empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  icon = input('📭');
  title = input('Nenhum resultado encontrado');
  description = input('Tente ajustar os filtros ou criar um novo item.');
  buttonLabel = input<string | null>('Criar novo');
  buttonClick = output<void>();
}
