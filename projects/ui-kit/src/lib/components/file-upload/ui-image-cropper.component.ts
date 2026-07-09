import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Renderer2,
  afterNextRender,
  afterEveryRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiIconComponent } from '../icon/ui-icon.component';
import { BodyScrollLock } from '../../utils/body-scroll-lock';
import {
  bringOverlayRootToFront,
  getUiOverlayRoot,
} from '../../utils/overlay-root';

export type UiImageCropAspectRatio = 'free' | '1:1' | '4:3' | '16:9';

type CropRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se';

type InteractionState =
  | { mode: 'idle' }
  | { mode: 'move'; startX: number; startY: number; origin: CropRect }
  | {
      mode: 'resize';
      handle: ResizeHandle;
      startX: number;
      startY: number;
      origin: CropRect;
    };

const MIN_CROP_SIZE = 56;
const CORNER_HANDLES: ResizeHandle[] = ['nw', 'ne', 'sw', 'se'];

@Component({
  selector: 'ui-image-cropper',
  standalone: true,
  imports: [DecimalPipe, UiButtonComponent, UiIconComponent],
  templateUrl: './ui-image-cropper.component.html',
  styleUrl: './ui-image-cropper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-image-cropper-host--portaled]': 'isPortaled()',
  },
})
export class UiImageCropperComponent {
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  private readonly imageRef = viewChild<ElementRef<HTMLImageElement>>('sourceImage');
  private readonly viewportRef =
    viewChild<ElementRef<HTMLDivElement>>('viewport');

  private originalParent: HTMLElement | null = null;
  private originalNextSibling: ChildNode | null = null;

  private interaction: InteractionState = { mode: 'idle' };

  readonly isPortaled = signal(false);
  readonly cornerHandles = CORNER_HANDLES;

  imageUrl = input.required<string>();
  fileName = input('');
  title = input('');
  cancelLabel = input('');
  applyLabel = input('');
  zoomLabel = input('');
  ratioLabel = input('');
  rotateLeftAriaLabel = input('');
  rotateRightAriaLabel = input('');
  aspectRatioFreeLabel = input('');
  aspectRatioSquareLabel = input('');
  aspectRatioFourThreeLabel = input('');
  aspectRatioSixteenNineLabel = input('');

  cancelled = output<void>();
  applied = output<File>();

  readonly zoom = signal(1);
  readonly rotation = signal(0);
  readonly aspectRatio = signal<UiImageCropAspectRatio>('free');
  readonly cropRect = signal<CropRect>({
    left: 0,
    top: 0,
    width: MIN_CROP_SIZE,
    height: MIN_CROP_SIZE,
  });

  readonly aspectOptions = computed(() => [
    { id: 'free' as const, label: this.aspectRatioFreeLabel() },
    { id: '1:1' as const, label: this.aspectRatioSquareLabel() },
    { id: '4:3' as const, label: this.aspectRatioFourThreeLabel() },
    { id: '16:9' as const, label: this.aspectRatioSixteenNineLabel() },
  ]);

  readonly cropBoxStyle = computed(() => {
    const rect = this.cropRect();

    return {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    };
  });

  readonly imageStyle = computed(() => ({
    transform: `scale(${this.zoom()}) rotate(${this.rotation()}deg)`,
  }));

  constructor() {
    effect(() => {
      this.aspectRatio();
      queueMicrotask(() => this.initCropRect());
    });

    afterNextRender(() => {
      this.initCropRect();
    });

    this.portalToOverlay();

    afterEveryRender(() => {
      this.ensurePortalPosition();
    });

    this.destroyRef.onDestroy(() => {
      this.restoreFromOverlay();
    });
  }

  zoomIn(): void {
    this.zoom.update((value) => Math.min(2, Number((value + 0.1).toFixed(2))));
  }

  zoomOut(): void {
    this.zoom.update((value) => Math.max(0.5, Number((value - 0.1).toFixed(2))));
  }

  rotateLeft(): void {
    this.rotation.update((value) => (value - 90 + 360) % 360);
  }

  rotateRight(): void {
    this.rotation.update((value) => (value + 90) % 360);
  }

  selectAspectRatio(value: UiImageCropAspectRatio): void {
    this.aspectRatio.set(value);
  }

  onImageLoad(): void {
    this.initCropRect();
  }

  onCropBoxPointerDown(event: PointerEvent): void {
    if ((event.target as HTMLElement).closest('.ui-image-cropper__handle')) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.interaction = {
      mode: 'move',
      startX: event.clientX,
      startY: event.clientY,
      origin: this.cropRect(),
    };

    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  onHandlePointerDown(event: PointerEvent, handle: ResizeHandle): void {
    event.preventDefault();
    event.stopPropagation();

    this.interaction = {
      mode: 'resize',
      handle,
      startX: event.clientX,
      startY: event.clientY,
      origin: this.cropRect(),
    };

    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    const viewport = this.getViewportSize();
    if (!viewport) return;

    if (this.interaction.mode === 'move') {
      const dx = event.clientX - this.interaction.startX;
      const dy = event.clientY - this.interaction.startY;
      const origin = this.interaction.origin;

      this.cropRect.set(
        this.clampRect(
          {
            ...origin,
            left: origin.left + dx,
            top: origin.top + dy,
          },
          viewport.width,
          viewport.height,
        ),
      );
      return;
    }

    if (this.interaction.mode === 'resize') {
      const dx = event.clientX - this.interaction.startX;
      const dy = event.clientY - this.interaction.startY;

      this.cropRect.set(
        this.resizeRect(
          this.interaction.handle,
          dx,
          dy,
          this.interaction.origin,
          viewport.width,
          viewport.height,
        ),
      );
    }
  }

  onPointerUp(event: PointerEvent): void {
    if (this.interaction.mode === 'idle') return;

    this.interaction = { mode: 'idle' };

    if (event.currentTarget instanceof HTMLElement) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // ignore if capture was already released
      }
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }

  async apply(): Promise<void> {
    const imageEl = this.imageRef()?.nativeElement;
    const viewport = this.viewportRef()?.nativeElement;
    if (!imageEl || !viewport) return;

    await this.waitForImage(imageEl);

    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    if (vw <= 0 || vh <= 0) return;

    const crop = this.cropRect();
    const cropWidth = Math.max(1, Math.round(crop.width));
    const cropHeight = Math.max(1, Math.round(crop.height));

    const viewportCanvas = document.createElement('canvas');
    viewportCanvas.width = vw;
    viewportCanvas.height = vh;

    const viewportContext = viewportCanvas.getContext('2d');
    if (!viewportContext) return;

    this.renderViewport(
      viewportContext,
      imageEl,
      vw,
      vh,
      this.zoom(),
      this.rotation(),
    );

    const canvas = document.createElement('canvas');
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(
      viewportCanvas,
      crop.left,
      crop.top,
      crop.width,
      crop.height,
      0,
      0,
      cropWidth,
      cropHeight,
    );

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.92),
    );

    if (!blob) return;

    const baseName = this.fileName().replace(/\.[^.]+$/, '') || 'image';
    const croppedFile = new File([blob], `${baseName}.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });

    this.applied.emit(croppedFile);
  }

  /** Renderiza a imagem no canvas exatamente como aparece no viewport (contain + zoom + rotação). */
  private renderViewport(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    viewportW: number,
    viewportH: number,
    zoom: number,
    rotationDeg: number,
  ): void {
    const naturalW = image.naturalWidth;
    const naturalH = image.naturalHeight;
    if (naturalW <= 0 || naturalH <= 0) return;

    const fitScale = Math.min(viewportW / naturalW, viewportH / naturalH);
    const drawW = naturalW * fitScale;
    const drawH = naturalH * fitScale;

    context.clearRect(0, 0, viewportW, viewportH);
    context.save();
    context.beginPath();
    context.rect(0, 0, viewportW, viewportH);
    context.clip();

    // CSS: transform scale(z) rotate(r) → rotate primeiro, depois scale (origem no centro).
    context.translate(viewportW / 2, viewportH / 2);
    context.scale(zoom, zoom);
    context.rotate((rotationDeg * Math.PI) / 180);
    context.translate(-viewportW / 2, -viewportH / 2);
    context.drawImage(
      image,
      (viewportW - drawW) / 2,
      (viewportH - drawH) / 2,
      drawW,
      drawH,
    );
    context.restore();
  }

  private initCropRect(): void {
    const viewport = this.getViewportSize();
    if (!viewport) return;

    const { width: vw, height: vh } = viewport;
    const ratio = this.aspectRatio();
    let width = vw * 0.72;
    let height = vh * 0.65;

    if (ratio === '1:1') {
      const size = Math.min(vw, vh) * 0.72;
      width = size;
      height = size;
    } else if (ratio === '4:3') {
      width = vw * 0.76;
      height = width * (3 / 4);
      if (height > vh * 0.82) {
        height = vh * 0.82;
        width = height * (4 / 3);
      }
    } else if (ratio === '16:9') {
      width = vw * 0.86;
      height = width * (9 / 16);
      if (height > vh * 0.82) {
        height = vh * 0.82;
        width = height * (16 / 9);
      }
    }

    this.cropRect.set(
      this.clampRect(
        {
          left: (vw - width) / 2,
          top: (vh - height) / 2,
          width,
          height,
        },
        vw,
        vh,
      ),
    );
  }

  private getAspectLock(): number | null {
    const ratio = this.aspectRatio();

    if (ratio === '1:1') return 1;
    if (ratio === '4:3') return 4 / 3;
    if (ratio === '16:9') return 16 / 9;
    return null;
  }

  private resizeRect(
    handle: ResizeHandle,
    dx: number,
    dy: number,
    start: CropRect,
    viewportW: number,
    viewportH: number,
  ): CropRect {
    const aspectLock = this.getAspectLock();
    let left = start.left;
    let top = start.top;
    let width = start.width;
    let height = start.height;

    if (handle === 'se') {
      width = Math.max(MIN_CROP_SIZE, start.width + dx);
      height = aspectLock
        ? width / aspectLock
        : Math.max(MIN_CROP_SIZE, start.height + dy);
      if (aspectLock) {
        width = height * aspectLock;
      }
    } else if (handle === 'sw') {
      width = Math.max(MIN_CROP_SIZE, start.width - dx);
      height = aspectLock
        ? width / aspectLock
        : Math.max(MIN_CROP_SIZE, start.height + dy);
      if (aspectLock) {
        width = height * aspectLock;
      }
      left = start.left + (start.width - width);
    } else if (handle === 'ne') {
      width = Math.max(MIN_CROP_SIZE, start.width + dx);
      height = aspectLock
        ? width / aspectLock
        : Math.max(MIN_CROP_SIZE, start.height - dy);
      if (aspectLock) {
        width = height * aspectLock;
      }
      top = start.top + (start.height - height);
    } else if (handle === 'nw') {
      width = Math.max(MIN_CROP_SIZE, start.width - dx);
      height = aspectLock
        ? width / aspectLock
        : Math.max(MIN_CROP_SIZE, start.height - dy);
      if (aspectLock) {
        width = height * aspectLock;
      }
      left = start.left + (start.width - width);
      top = start.top + (start.height - height);
    }

    return this.clampRect({ left, top, width, height }, viewportW, viewportH);
  }

  private clampRect(
    rect: CropRect,
    viewportW: number,
    viewportH: number,
  ): CropRect {
    const aspectLock = this.getAspectLock();
    let { left, top, width, height } = rect;

    width = Math.max(MIN_CROP_SIZE, Math.min(width, viewportW));
    height = Math.max(MIN_CROP_SIZE, Math.min(height, viewportH));

    if (aspectLock) {
      if (width / height > aspectLock) {
        width = height * aspectLock;
      } else {
        height = width / aspectLock;
      }

      const maxWidth = Math.min(viewportW, viewportH * aspectLock);
      const maxHeight = Math.min(viewportH, viewportW / aspectLock);
      width = Math.min(width, maxWidth);
      height = Math.min(height, maxHeight);

      if (width / height > aspectLock) {
        width = height * aspectLock;
      } else {
        height = width / aspectLock;
      }
    }

    left = Math.max(0, Math.min(left, viewportW - width));
    top = Math.max(0, Math.min(top, viewportH - height));

    return { left, top, width, height };
  }

  private getViewportSize(): { width: number; height: number } | null {
    const viewport = this.viewportRef()?.nativeElement;
    if (!viewport) return null;

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (width <= 0 || height <= 0) return null;

    return { width, height };
  }

  private portalToOverlay(): void {
    this.ensurePortalPosition();
    this.lockBodyScroll();
  }

  private ensurePortalPosition(): void {
    const host = this.elementRef.nativeElement;
    const overlayRoot = getUiOverlayRoot(this.document);
    bringOverlayRootToFront(this.document);

    if (host.parentElement !== overlayRoot) {
      if (
        !this.originalParent &&
        host.parentElement &&
        host.parentElement !== overlayRoot
      ) {
        this.originalParent = host.parentElement;
        this.originalNextSibling = host.nextSibling;
      }

      overlayRoot.appendChild(host);
    }

    this.isPortaled.set(true);
    this.applyPortalStyles(host);
  }

  private applyPortalStyles(host: HTMLElement): void {
    this.renderer.addClass(host, 'ui-image-cropper-host--portaled');
    this.renderer.setStyle(host, 'position', 'fixed');
    this.renderer.setStyle(host, 'inset', '0');
    this.renderer.setStyle(host, 'display', 'block');
    this.renderer.setStyle(host, 'pointer-events', 'auto');
  }

  private clearPortalStyles(host: HTMLElement): void {
    this.renderer.removeClass(host, 'ui-image-cropper-host--portaled');
    this.renderer.removeStyle(host, 'position');
    this.renderer.removeStyle(host, 'inset');
    this.renderer.removeStyle(host, 'display');
    this.renderer.removeStyle(host, 'pointer-events');
  }

  private restoreFromOverlay(): void {
    const host = this.elementRef.nativeElement;
    const overlayRoot = getUiOverlayRoot(this.document);

    if (host.parentElement !== overlayRoot || !this.originalParent) {
      this.clearPortalStyles(host);
      this.unlockBodyScroll();
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
    this.clearPortalStyles(host);
    this.unlockBodyScroll();
  }

  private lockBodyScroll(): void {
    BodyScrollLock.lock(this.document, this.renderer);
  }

  private unlockBodyScroll(): void {
    BodyScrollLock.unlock(this.document, this.renderer);
  }

  private waitForImage(image: HTMLImageElement): Promise<void> {
    if (image.complete && image.naturalWidth > 0) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      image.onload = () => resolve();
      image.onerror = () => resolve();
    });
  }
}
