import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  templateUrl: './ui-breadcrumb.component.html',
  styleUrl: './ui-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  items = input<BreadcrumbItem[]>([]);
  separator = input('/');

  itemClick = output<BreadcrumbItem>();
}
