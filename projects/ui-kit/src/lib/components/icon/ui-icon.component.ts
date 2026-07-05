import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export const UI_ICON_NAMES = [
  'activate',
  'add-note',
  'admin',
  'alert',
  'alert-filled',
  'back',
  'calendar',
  'check',
  'check-circle',
  'chevron-down',
  'chevron-up',
  'clear',
  'clinical-conditions',
  'close',
  'config',
  'consultation',
  'copy',
  'delete',
  'download',
  'duplicate',
  'edit',
  'email',
  'exam',
  'exam-comparison',
  'eye',
  'eye-off',
  'filter',
  'finish',
  'flag-en',
  'flag-es',
  'flag-fr',
  'flag-pt',
  'folder',
  'glucose',
  'glucose-comparison',
  'home',
  'info',
  'link',
  'list',
  'lock-blocked',
  'lock-unblocked',
  'logo',
  'logout',
  'menu-close',
  'menu-open',
  'moon',
  'overview',
  'package',
  'paw',
  'pause',
  'pet-adoption',
  'pet-birth',
  'phone',
  'plus',
  'plus-circle',
  'preventive',
  'reactive',
  'search',
  'search-bigger',
  'sun',
  'time-clock',
  'treatment',
  'upload',
  'user',
  'user-block',
  'user-delete',
  'user-disable',
  'user-enable',
  'user-restore',
  'user-unblock',
  'user-filled',
  'users',
  'vaccine',
  'vet',
  'vet-briefcase',
  'warning',
  'weight',
] as const;

export type UiIconName = (typeof UI_ICON_NAMES)[number];

export const UI_ICON_SIZES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
] as const;

export type UiIconSize = (typeof UI_ICON_SIZES)[number];

@Component({
  selector: 'ui-icon',
  standalone: true,
  templateUrl: './ui-icon.component.html',
  styleUrl: './ui-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent {
  name = input.required<UiIconName>();
  size = input<UiIconSize>('md');
  label = input<string | null>(null);
  customClass = input('');

  isDecorative = computed(() => !this.label());

  classes = computed(() =>
    ['ui-icon', `ui-icon--${this.size()}`, this.customClass()]
      .filter(Boolean)
      .join(' '),
  );
}
