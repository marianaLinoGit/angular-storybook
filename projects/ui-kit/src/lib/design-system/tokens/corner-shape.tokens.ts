import type { UiCornerRadiusSize, UiCornerShape } from '../types/ui.types';

export const UI_CORNER_SHAPES = [
  'round',
  'squircle',
  'scoop',
  'bevel',
  'notch',
] as const;

export const UI_CORNER_RADIUS_SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export const UI_CORNER_SHAPE_TOKENS: Record<UiCornerShape, string> = {
  round: 'var(--ui-corner-shape-round)',
  squircle: 'var(--ui-corner-shape-squircle)',
  scoop: 'var(--ui-corner-shape-scoop)',
  bevel: 'var(--ui-corner-shape-bevel)',
  notch: 'var(--ui-corner-shape-notch)',
};

export const UI_CORNER_RADIUS_TOKENS: Record<UiCornerRadiusSize, string> = {
  sm: 'var(--ui-radius-sm)',
  md: 'var(--ui-radius-md)',
  lg: 'var(--ui-radius-lg)',
  xl: 'var(--ui-radius-xl)',
};

export const UI_CORNER_RADIUS_LABELS: Record<UiCornerRadiusSize, string> = {
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '24px',
};

export function uiCornerUtilityClass(
  shape: UiCornerShape,
  size: UiCornerRadiusSize,
): string {
  return `ui-corner-${shape}-${size}`;
}

export function uiCornerShapeClass(shape: UiCornerShape): string {
  return `ui-corner-shape-${shape}`;
}

export function uiCornerRadiusClass(size: UiCornerRadiusSize): string {
  return `ui-corner-radius-${size}`;
}
