import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiIconComponent, UiIconName } from '../icon/ui-icon.component';

export type UiModalType = 'confirmation' | 'informative' | 'content' | 'delete';
export type UiModalSize = 'sm' | 'md' | 'lg';
export type UiModalPresentationMode = 'fixed' | 'inline';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [UiButtonComponent, UiIconComponent],
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-modal-host--portaled]': 'isPortaled()',
  },
})
export class UiModalComponent {
  private static openFixedCount = 0;

  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  open = input(true);
  type = input<UiModalType>('informative');

  title = input('Título do modal');
  description = input<string | null>('Descrição do modal');
  icon = input<UiIconName | null>(null);

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
  private originalParent: HTMLElement | null = null;
  private originalNextSibling: ChildNode | null = null;

  readonly isPortaled = signal(false);

  titleId = `ui-modal-title-${crypto.randomUUID()}`;
  descriptionId = `ui-modal-description-${crypto.randomUUID()}`;

  isVisible = computed(() => this.open() && !this.internalClosed());

  resolvedIcon = computed<UiIconName | null>(() => {
    if (this.type() === 'delete') return 'delete';
    return this.icon();
  });

  showFooter = computed(() => this.type() !== 'content');

  showCancelButton = computed(
    () => this.type() === 'confirmation' || this.type() === 'delete',
  );

  isConfirmAction = computed(
    () => this.type() === 'confirmation' || this.type() === 'delete',
  );

  primaryActionColor = computed(() =>
    this.type() === 'delete' ? 'danger' : 'primary',
  );

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

  constructor() {
    effect(() => {
      if (this.open()) {
        this.internalClosed.set(false);
      }
    });

    effect(() => {
      const shouldPortal =
        this.presentationMode() === 'fixed' && this.isVisible();

      if (shouldPortal) {
        this.portalToBody();
        return;
      }

      this.restoreFromBody();
    });

    this.destroyRef.onDestroy(() => {
      this.restoreFromBody();
    });
  }

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

  private portalToBody(): void {
    const host = this.elementRef.nativeElement;

    if (host.parentElement === this.document.body) {
      return;
    }

    this.originalParent = host.parentElement;
    this.originalNextSibling = host.nextSibling;
    this.document.body.appendChild(host);
    this.isPortaled.set(true);
    this.lockBodyScroll();
  }

  private restoreFromBody(): void {
    const host = this.elementRef.nativeElement;

    if (host.parentElement !== this.document.body || !this.originalParent) {
      return;
    }

    if (this.originalNextSibling) {
      this.originalParent.insertBefore(host, this.originalNextSibling);
    } else {
      this.originalParent.appendChild(host);
    }

    this.originalParent = null;
    this.originalNextSibling = null;
    this.isPortaled.set(false);
    this.unlockBodyScroll();
  }

  private lockBodyScroll(): void {
    if (this.presentationMode() !== 'fixed') {
      return;
    }

    UiModalComponent.openFixedCount += 1;

    if (UiModalComponent.openFixedCount === 1) {
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    }
  }

  private unlockBodyScroll(): void {
    if (this.presentationMode() !== 'fixed') {
      return;
    }

    UiModalComponent.openFixedCount = Math.max(
      0,
      UiModalComponent.openFixedCount - 1,
    );

    if (UiModalComponent.openFixedCount === 0) {
      this.renderer.removeStyle(this.document.body, 'overflow');
    }
  }
}
