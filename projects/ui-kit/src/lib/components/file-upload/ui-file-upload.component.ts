import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { Observable, Subscription, finalize, timer } from 'rxjs';
import { UI_FORM_FIELD } from '../form-field/ui-form-field.context';
import { UiFieldErrorComponent } from '../field-error/ui-field-error.component';
import { UiIconComponent } from '../icon/ui-icon.component';
import { UiLabelComponent } from '../label/ui-label.component';
import { UiModalComponent } from '../modal/ui-modal.component';
import { UiImageCropperComponent } from './ui-image-cropper.component';
import {
  UI_FILE_UPLOAD_PRESETS,
  UiFileUploadChangeEvent,
  UiFileUploadErrorEvent,
  UiFileUploadItem,
  UiFileUploadPreset,
  UiFileUploadSuccessEvent,
} from './ui-file-upload.types';
import {
  createFileId,
  formatFileSize,
  getFileExtension,
  isImageFile,
  isPdfFile,
  validateFile,
} from './ui-file-upload.utils';

@Component({
  selector: 'ui-file-upload',
  standalone: true,
  imports: [
    UiFieldErrorComponent,
    UiIconComponent,
    UiImageCropperComponent,
    UiLabelComponent,
    UiModalComponent,
  ],
  templateUrl: './ui-file-upload.component.html',
  styleUrl: './ui-file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFileUploadComponent implements ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });
  private readonly formField = inject(UI_FORM_FIELD, { optional: true });

  private readonly fileInputRef =
    viewChild<ElementRef<HTMLInputElement>>('fileInput');

  private uploadSubscriptions = new Map<string, Subscription>();

  label = input('');
  ariaLabel = input<string | null>(null);
  hideLabel = input(false);
  hideError = input(false);

  id = input(`ui-file-upload-${crypto.randomUUID()}`);
  name = input<string | null>(null);

  preset = input<UiFileUploadPreset>('default');
  accept = input<string | null>(null);
  multiple = input<boolean | null>(null);
  maxFiles = input(10);
  maxSizeBytes = input<number | null>(null);
  enableCrop = input<boolean | null>(null);

  dropzoneText = input('');
  dropActiveText = input('');
  browseText = input('');
  constraintsText = input('');
  auxiliaryText = input('');
  showAuxiliaryText = input(false);
  disabledText = input('');
  addMoreText = input('');
  cropActionText = input('');
  uploadingText = input('');
  simulateUpload = input(true);

  existingPreviewUrl = input<string | null>(null);
  placeholderPreviewUrl = input<string | null>(null);
  existingPreviewTitle = input('');
  existingPreviewMetaText = input('');
  previewExpandAriaLabel = input('');
  previewCloseAriaLabel = input('');
  removeExistingAriaLabel = input('');
  cancelUploadAriaLabel = input('');
  removeFileAriaLabel = input('');
  invalidFileTypeMessage = input('');
  fileTooLargeMessage = input('');
  uploadFailedMessage = input('');
  unknownFileExtensionLabel = input('');
  pdfBadgeText = input('');
  enableImagePreview = input(true);

  cropperTitle = input('');
  cropperCancelLabel = input('');
  cropperApplyLabel = input('');
  cropperZoomLabel = input('');
  cropperRatioLabel = input('');
  cropperRotateLeftAriaLabel = input('');
  cropperRotateRightAriaLabel = input('');
  cropperAspectFreeLabel = input('');
  cropperAspectSquareLabel = input('');
  cropperAspectFourThreeLabel = input('');
  cropperAspectSixteenNineLabel = input('');

  required = input(false);
  disabled = input(false);

  optionalText = input('');
  showOptionalText = input(true);

  errorMessage = input('');
  showError = input(false);
  customClass = input('');

  uploadFn = input<((file: File) => Observable<number>) | null>(null);

  valueChange = output<UiFileUploadChangeEvent>();
  filesChange = output<File[]>();
  uploadSuccess = output<UiFileUploadSuccessEvent>();
  fileError = output<UiFileUploadErrorEvent>();

  readonly items = signal<UiFileUploadItem[]>([]);
  readonly isDragOver = signal(false);
  readonly removeExisting = signal(false);
  readonly cropTargetId = signal<string | null>(null);
  readonly disabledState = signal(false);
  readonly imagePreviewOpen = signal(false);
  readonly imagePreviewUrl = signal<string | null>(null);
  readonly imagePreviewTitle = signal('');

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.destroyRef.onDestroy(() => {
      this.revokeAllPreviewUrls();
      this.uploadSubscriptions.forEach((subscription) => subscription.unsubscribe());
      this.uploadSubscriptions.clear();
    });

    effect(() => {
      if (this.existingPreviewUrl()) {
        this.removeExisting.set(false);
      }
    });
  }

  readonly resolvedAccept = computed(() => {
    const custom = this.accept();
    if (custom) return custom;
    return UI_FILE_UPLOAD_PRESETS[this.preset()].accept;
  });

  readonly resolvedMaxSizeBytes = computed(() => {
    const custom = this.maxSizeBytes();
    if (custom != null) return custom;
    return UI_FILE_UPLOAD_PRESETS[this.preset()].maxSizeBytes;
  });

  readonly resolvedMultiple = computed(() => {
    const custom = this.multiple();
    if (custom != null) return custom;
    return UI_FILE_UPLOAD_PRESETS[this.preset()].multiple;
  });

  readonly resolvedEnableCrop = computed(() => {
    const custom = this.enableCrop();
    if (custom != null) return custom;
    return UI_FILE_UPLOAD_PRESETS[this.preset()].enableCrop;
  });

  readonly resolvedConstraintsText = computed(() => this.constraintsText().trim());

  readonly isDisabled = computed(() => this.disabled() || this.disabledState());

  readonly errorId = computed(() => `${this.id()}-error`);

  readonly describedBy = computed(() => {
    if (this.formField) {
      return this.formField.describedBy();
    }

    return this.hasError() ? this.errorId() : null;
  });

  readonly showExistingPreview = computed(
    () =>
      Boolean(this.existingPreviewUrl()) &&
      !this.removeExisting() &&
      this.items().length === 0,
  );

  readonly canAddMore = computed(() => {
    if (this.isDisabled()) return false;
    if (!this.resolvedMultiple()) return this.items().length === 0 && !this.showExistingPreview();
    return this.items().length < this.maxFiles();
  });

  readonly showDropzone = computed(
    () => !this.isDisabled() && this.canAddMore(),
  );

  readonly cropTargetItem = computed(() => {
    const targetId = this.cropTargetId();
    if (!targetId) return null;
    return this.items().find((item) => item.id === targetId) ?? null;
  });

  readonly classes = computed(() =>
    [
      'ui-file-upload',
      this.isDragOver() ? 'ui-file-upload--dragover' : '',
      this.isDisabled() ? 'ui-file-upload--disabled' : '',
      this.hasError() ? 'ui-file-upload--error' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  hasRequired(): boolean {
    const control = this.ngControl?.control;

    return Boolean(
      this.required() || control?.hasValidator?.(Validators.required),
    );
  }

  hasError(): boolean {
    if (this.formField) {
      return this.formField.hasError();
    }

    const control = this.ngControl?.control;

    return Boolean(
      this.showError() ||
        (control?.invalid && (control.touched || control.dirty)),
    );
  }

  isImage(file: File): boolean {
    return isImageFile(file);
  }

  isPdf(file: File): boolean {
    return isPdfFile(file);
  }

  formatSize(bytes: number): string {
    return formatFileSize(bytes);
  }

  getExtension(file: File): string {
    return getFileExtension(file, this.unknownFileExtensionLabel());
  }

  removeItemAriaLabel(status: UiFileUploadItem['status']): string {
    return status === 'uploading'
      ? this.cancelUploadAriaLabel()
      : this.removeFileAriaLabel();
  }

  existingPreviewSrc(): string {
    return this.existingPreviewUrl() ?? this.placeholderPreviewUrl() ?? '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.isDisabled()) return;
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    if (this.isDisabled()) return;

    const files = event.dataTransfer?.files;
    if (!files?.length) return;

    this.handleFileList(files);
  }

  openFilePicker(): void {
    if (this.isDisabled()) return;
    this.fileInputRef()?.nativeElement.click();
  }

  onNativeFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) return;

    this.handleFileList(files);
    input.value = '';
  }

  removeItem(itemId: string): void {
    this.cancelUploadSubscription(itemId);

    const item = this.items().find((entry) => entry.id === itemId);
    if (item?.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }

    this.items.update((current) => current.filter((entry) => entry.id !== itemId));
    this.emitValue();
  }

  removeExistingPreview(): void {
    this.removeExisting.set(true);
    this.emitValue();
  }

  cancelUpload(itemId: string): void {
    this.removeItem(itemId);
  }

  openCropper(itemId: string): void {
    this.cropTargetId.set(itemId);
  }

  closeCropper(): void {
    this.cropTargetId.set(null);
  }

  canPreviewImage(url: string | null | undefined): boolean {
    return this.enableImagePreview() && Boolean(url);
  }

  openImagePreview(url: string, title: string): void {
    if (!this.canPreviewImage(url)) return;

    this.imagePreviewUrl.set(url);
    this.imagePreviewTitle.set(title);
    this.imagePreviewOpen.set(true);
  }

  closeImagePreview(): void {
    this.imagePreviewOpen.set(false);
    this.imagePreviewUrl.set(null);
    this.imagePreviewTitle.set('');
  }

  onCropApplied(file: File): void {
    const targetId = this.cropTargetId();
    if (!targetId) return;

    const current = this.items().find((item) => item.id === targetId);
    if (current?.previewUrl) {
      URL.revokeObjectURL(current.previewUrl);
    }

    const previewUrl = URL.createObjectURL(file);

    this.items.update((items) =>
      items.map((item) =>
        item.id === targetId
          ? {
              ...item,
              file,
              previewUrl,
              status: 'success',
              progress: 100,
            }
          : item,
      ),
    );

    this.cropTargetId.set(null);
    this.uploadSuccess.emit({ file, fileName: file.name });
    this.emitValue();
  }

  onChange: (value: File | File[] | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: File | File[] | null): void {
    this.revokeAllPreviewUrls();
    this.items.set([]);

    if (!value) return;

    const files = Array.isArray(value) ? value : [value];
    files.forEach((file) => this.addValidatedFile(file, { skipUpload: true }));
  }

  registerOnChange(fn: (value: File | File[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  private handleFileList(fileList: FileList): void {
    const files = Array.from(fileList);
    const slots = this.resolvedMultiple()
      ? Math.max(0, this.maxFiles() - this.items().length)
      : 1;

    files.slice(0, slots).forEach((file) => this.addValidatedFile(file));
  }

  private addValidatedFile(
    file: File,
    options: { skipUpload?: boolean; emitSuccess?: boolean } = {},
  ): void {
    const skipUpload = options.skipUpload ?? false;
    const emitSuccess = options.emitSuccess ?? !skipUpload;

    const validationError = validateFile(
      file,
      this.resolvedAccept(),
      this.resolvedMaxSizeBytes(),
      {
        invalidType: this.invalidFileTypeMessage(),
        tooLarge: (maxSize) => this.formatFileTooLargeMessage(maxSize),
      },
    );

    if (validationError) {
      this.fileError.emit({ fileName: file.name, message: validationError });
      return;
    }

    const previewUrl = isImageFile(file) ? URL.createObjectURL(file) : null;
    const item: UiFileUploadItem = {
      id: createFileId(),
      file,
      previewUrl,
      status: skipUpload ? 'success' : 'uploading',
      progress: skipUpload ? 100 : 0,
    };

    if (!this.resolvedMultiple()) {
      this.revokeAllPreviewUrls();
      this.items.set([item]);
    } else {
      this.items.update((current) => [...current, item]);
    }

    if (!skipUpload) {
      this.startUpload(item.id, file);
    } else if (emitSuccess) {
      this.uploadSuccess.emit({ file, fileName: file.name });
    }

    this.removeExisting.set(false);
    this.emitValue();
    this.onTouched();
  }

  private startUpload(itemId: string, file: File): void {
    const uploadFn = this.uploadFn();

    if (uploadFn) {
      const subscription = uploadFn(file)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.uploadSubscriptions.delete(itemId)),
        )
        .subscribe({
          next: (progress) => {
            this.items.update((current) =>
              current.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      progress: Math.max(0, Math.min(100, progress)),
                    }
                  : item,
              ),
            );
          },
          complete: () => {
            this.items.update((current) =>
              current.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      status: 'success',
                      progress: 100,
                    }
                  : item,
              ),
            );
            this.uploadSuccess.emit({ file, fileName: file.name });
            this.emitValue();
          },
          error: () => {
            this.rejectUpload(
              itemId,
              file.name,
              this.uploadFailedMessage(),
            );
          },
        });

      this.uploadSubscriptions.set(itemId, subscription);
      return;
    }

    if (!this.simulateUpload()) {
      this.items.update((current) =>
        current.map((item) =>
          item.id === itemId
            ? { ...item, status: 'success', progress: 100 }
            : item,
        ),
      );
      this.uploadSuccess.emit({ file, fileName: file.name });
      this.emitValue();
      return;
    }

    const subscription = timer(0, 120)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tick) => {
          const progress = Math.min(100, tick * 18);
          this.items.update((current) =>
            current.map((item) =>
              item.id === itemId ? { ...item, progress } : item,
            ),
          );

          if (progress >= 100) {
            subscription.unsubscribe();
            this.uploadSubscriptions.delete(itemId);
            this.items.update((current) =>
              current.map((item) =>
                item.id === itemId
                  ? { ...item, status: 'success', progress: 100 }
                  : item,
              ),
            );
            this.uploadSuccess.emit({ file, fileName: file.name });
            this.emitValue();
          }
        },
      });

    this.uploadSubscriptions.set(itemId, subscription);
  }

  private formatFileTooLargeMessage(maxSize: string): string {
    return this.fileTooLargeMessage().replace(/\{\{?maxSize\}?\}|__MAX_SIZE__/g, maxSize);
  }

  private rejectUpload(itemId: string, fileName: string, message: string): void {
    this.cancelUploadSubscription(itemId);
    this.removeItem(itemId);
    this.fileError.emit({ fileName, message });
  }

  private cancelUploadSubscription(itemId: string): void {
    const subscription = this.uploadSubscriptions.get(itemId);
    subscription?.unsubscribe();
    this.uploadSubscriptions.delete(itemId);
  }

  private emitValue(): void {
    const files = this.items()
      .filter((item) => item.status === 'success')
      .map((item) => item.file);

    const payload: UiFileUploadChangeEvent = {
      files,
      removeExisting: this.removeExisting(),
    };

    this.valueChange.emit(payload);
    this.filesChange.emit(files);
    this.onChange(
      this.resolvedMultiple() ? files : (files[0] ?? null),
    );
  }

  private revokeAllPreviewUrls(): void {
    this.items().forEach((item) => {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
  }
}
