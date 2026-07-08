import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import {
  UI_CORNER_RADIUS_LABELS,
  UI_CORNER_RADIUS_SIZES,
  UI_CORNER_SHAPES,
  uiCornerUtilityClass,
} from './corner-shape.tokens';
import type { UiCornerRadiusSize, UiCornerShape } from '../types/ui.types';

export type CornerShapeShowcaseView =
  | 'matrix'
  | 'by-size'
  | 'shape'
  | 'size'
  | 'cards'
  | 'tokens';

const shapeLabels: Record<UiCornerShape, string> = {
  round: 'Round',
  squircle: 'Squircle',
  scoop: 'Scoop',
  bevel: 'Bevel',
  notch: 'Notch',
};

const shapeDescriptions: Record<UiCornerShape, string> = {
  round: 'Cantos circulares clássicos (padrão do CSS).',
  squircle: 'Curva contínua entre reta e arco, estilo iOS.',
  scoop: 'Recorte côncavo nas quinas.',
  bevel: 'Chanfro plano nas quinas.',
  notch: 'Entalhe interno nas quinas.',
};

@Component({
  selector: 'ui-corner-shape-showcase',
  standalone: true,
  imports: [UpperCasePipe],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './corner-shape-showcase.component.html',
  styleUrl: './corner-shape-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CornerShapeShowcaseComponent {
  view = input<CornerShapeShowcaseView>('matrix');
  focusShape = input<UiCornerShape>('round');
  focusSize = input<UiCornerRadiusSize>('md');

  readonly shapes = UI_CORNER_SHAPES;
  readonly sizes = UI_CORNER_RADIUS_SIZES;

  readonly shapeSections = computed(() => {
    if (this.view() === 'shape') {
      return [this.focusShape()];
    }

    return [...this.shapes];
  });

  readonly sizeSections = computed(() => {
    if (this.view() === 'size') {
      return [this.focusSize()];
    }

    return [...this.sizes];
  });

  shapeLabel(shape: UiCornerShape): string {
    return shapeLabels[shape];
  }

  shapeDescription(shape: UiCornerShape): string {
    return shapeDescriptions[shape];
  }

  utilityClass(shape: UiCornerShape, size: UiCornerRadiusSize): string {
    return uiCornerUtilityClass(shape, size);
  }

  radiusLabel(size: UiCornerRadiusSize): string {
    return UI_CORNER_RADIUS_LABELS[size];
  }

  radiusValue(size: UiCornerRadiusSize): string {
    return `var(--ui-radius-${size})`;
  }
}
