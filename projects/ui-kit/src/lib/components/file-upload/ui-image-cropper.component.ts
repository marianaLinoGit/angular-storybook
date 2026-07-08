import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UiButtonComponent } from '../button/ui-button.component';
import { UiIconComponent } from '../icon/ui-icon.component';

export type UiImageCropAspectRatio = 'free' | '1:1' | '4:3' | '16:9';

@Component({
  selector: 'ui-image-cropper',
  standalone: true,
  imports: [DecimalPipe, UiButtonComponent, UiIconComponent],
  templateUrl: './ui-image-cropper.component.html',
  styleUrl: './ui-image-cropper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiImageCropperComponent {
  private readonly imageRef = viewChild<ElementRef<HTMLImageElement>>('sourceImage');

  imageUrl = input.required<string>();
  fileName = input('imagem.jpg');
  title = input('Recortar imagem');
  cancelLabel = input('Cancelar');
  applyLabel = input('Aplicar recorte');
  zoomLabel = input('Zoom');
  ratioLabel = input('Proporção');
  rotateAriaLabel = input('Girar imagem');

  cancelled = output<void>();
  applied = output<File>();

  readonly zoom = signal(1);
  readonly rotation = signal(0);
  readonly aspectRatio = signal<UiImageCropAspectRatio>('free');
  readonly cropOffsetX = signal(0);
  readonly cropOffsetY = signal(0);

  private dragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragOriginX = 0;
  private dragOriginY = 0;

  readonly aspectOptions: { id: UiImageCropAspectRatio; label: string }[] = [
    { id: 'free', label: 'Livre' },
    { id: '1:1', label: 'Quadrado (1:1)' },
    { id: '4:3', label: '4:3' },
    { id: '16:9', label: '16:9' },
  ];

  readonly cropBoxStyle = computed(() => {
    const ratio = this.aspectRatio();
    let width = 72;
    let height = 72;

    if (ratio === '1:1') {
      width = 70;
      height = 70;
    } else if (ratio === '4:3') {
      width = 78;
      height = 58;
    } else if (ratio === '16:9') {
      width = 82;
      height = 46;
    }

    return {
      width: `${width}%`,
      height: `${height}%`,
      transform: `translate(calc(-50% + ${this.cropOffsetX()}px), calc(-50% + ${this.cropOffsetY()}px))`,
    };
  });

  readonly imageStyle = computed(() => ({
    transform: `scale(${this.zoom()}) rotate(${this.rotation()}deg)`,
  }));

  constructor() {
    effect(() => {
      this.aspectRatio();
      this.cropOffsetX.set(0);
      this.cropOffsetY.set(0);
    });
  }

  zoomIn(): void {
    this.zoom.update((value) => Math.min(2, Number((value + 0.1).toFixed(2))));
  }

  zoomOut(): void {
    this.zoom.update((value) => Math.max(0.5, Number((value - 0.1).toFixed(2))));
  }

  rotate(): void {
    this.rotation.update((value) => (value + 90) % 360);
  }

  selectAspectRatio(value: UiImageCropAspectRatio): void {
    this.aspectRatio.set(value);
  }

  onPointerDown(event: PointerEvent): void {
    if ((event.target as HTMLElement).closest('.ui-image-cropper__crop-box')) {
      this.dragging = true;
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      this.dragOriginX = this.cropOffsetX();
      this.dragOriginY = this.cropOffsetY();
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    }
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;

    this.cropOffsetX.set(this.dragOriginX + (event.clientX - this.dragStartX));
    this.cropOffsetY.set(this.dragOriginY + (event.clientY - this.dragStartY));
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) return;
    this.dragging = false;
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
  }

  cancel(): void {
    this.cancelled.emit();
  }

  async apply(): Promise<void> {
    const imageEl = this.imageRef()?.nativeElement;
    if (!imageEl) return;

    await this.waitForImage(imageEl);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    const viewport = imageEl.parentElement;
    if (!viewport) return;

    const viewportRect = viewport.getBoundingClientRect();
    const imageRect = imageEl.getBoundingClientRect();

    const ratio = this.aspectRatio();
    let cropWidthRatio = 0.72;
    let cropHeightRatio = 0.72;

    if (ratio === '1:1') {
      cropWidthRatio = 0.7;
      cropHeightRatio = 0.7;
    } else if (ratio === '4:3') {
      cropWidthRatio = 0.78;
      cropHeightRatio = 0.58;
    } else if (ratio === '16:9') {
      cropWidthRatio = 0.82;
      cropHeightRatio = 0.46;
    }

    const cropWidth = viewportRect.width * cropWidthRatio;
    const cropHeight = viewportRect.height * cropHeightRatio;
    const cropCenterX = viewportRect.left + viewportRect.width / 2 + this.cropOffsetX();
    const cropCenterY = viewportRect.top + viewportRect.height / 2 + this.cropOffsetY();

    const scaleX = imageEl.naturalWidth / imageRect.width;
    const scaleY = imageEl.naturalHeight / imageRect.height;

    const sx = Math.max(0, (cropCenterX - cropWidth / 2 - imageRect.left) * scaleX);
    const sy = Math.max(0, (cropCenterY - cropHeight / 2 - imageRect.top) * scaleY);
    const sw = Math.min(imageEl.naturalWidth - sx, cropWidth * scaleX);
    const sh = Math.min(imageEl.naturalHeight - sy, cropHeight * scaleY);

    canvas.width = Math.max(1, Math.round(sw));
    canvas.height = Math.max(1, Math.round(sh));

    if (this.rotation() % 360 !== 0) {
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((this.rotation() * Math.PI) / 180);
      context.drawImage(
        imageEl,
        sx,
        sy,
        sw,
        sh,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height,
      );
    } else {
      context.drawImage(imageEl, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.92),
    );

    if (!blob) return;

    const baseName = this.fileName().replace(/\.[^.]+$/, '') || 'imagem';
    const croppedFile = new File([blob], `${baseName}.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });

    this.applied.emit(croppedFile);
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
