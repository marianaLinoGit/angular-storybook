export type UiFileUploadItemStatus = 'uploading' | 'success';

export type UiFileUploadItem = {
  id: string;
  file: File;
  previewUrl: string | null;
  status: UiFileUploadItemStatus;
  progress: number;
};

export type UiFileUploadChangeEvent = {
  files: File[];
  removeExisting: boolean;
};

export type UiFileUploadSuccessEvent = {
  file: File;
  fileName: string;
};

export type UiFileUploadErrorEvent = {
  fileName: string;
  message: string;
};

export type UiFileUploadPreset = 'default' | 'pet-photo' | 'exam' | 'pdf-only';

export type UiFileUploadPresetConfig = {
  accept: string;
  maxSizeBytes: number;
  multiple: boolean;
  enableCrop: boolean;
};

export const UI_FILE_UPLOAD_PRESETS: Record<
  UiFileUploadPreset,
  UiFileUploadPresetConfig
> = {
  default: {
    accept: 'image/jpeg,image/png,image/webp,application/pdf',
    maxSizeBytes: 10 * 1024 * 1024,
    multiple: false,
    enableCrop: false,
  },
  'pet-photo': {
    accept: 'image/jpeg,image/png,image/webp',
    maxSizeBytes: 5 * 1024 * 1024,
    multiple: false,
    enableCrop: true,
  },
  exam: {
    accept: 'image/jpeg,image/png,image/webp,application/pdf',
    maxSizeBytes: 20 * 1024 * 1024,
    multiple: true,
    enableCrop: false,
  },
  'pdf-only': {
    accept: 'application/pdf',
    maxSizeBytes: 20 * 1024 * 1024,
    multiple: false,
    enableCrop: false,
  },
};
