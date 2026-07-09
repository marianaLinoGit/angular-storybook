const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export function isImageFile(file: File): boolean {
  return (
    file.type.startsWith('image/') || IMAGE_MIME_TYPES.has(file.type)
  );
}

export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
}

export function getFileExtension(
  file: File,
  unknownLabel = '',
): string {
  const fromName = file.name.split('.').pop()?.toUpperCase();
  if (fromName) return fromName;

  if (file.type === 'image/jpeg') return 'JPG';
  if (file.type === 'image/png') return 'PNG';
  if (file.type === 'image/webp') return 'WEBP';
  if (file.type === 'application/pdf') return 'PDF';

  return unknownLabel;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function parseAcceptList(accept: string): string[] {
  return accept
    .split(',')
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

export function fileMatchesAccept(file: File, accept: string): boolean {
  const rules = parseAcceptList(accept);
  if (!rules.length) return true;

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  return rules.some((rule) => {
    if (rule.startsWith('.')) {
      return fileName.endsWith(rule);
    }

    if (rule.endsWith('/*')) {
      const prefix = rule.slice(0, -1);
      return fileType.startsWith(prefix);
    }

    return fileType === rule;
  });
}

export type UiFileValidationMessages = {
  invalidType?: string;
  tooLarge?: (maxSize: string) => string;
};

export function validateFile(
  file: File,
  accept: string,
  maxSizeBytes: number,
  messages: UiFileValidationMessages = {},
): string | null {
  if (!fileMatchesAccept(file, accept)) {
    return messages.invalidType ?? null;
  }

  if (file.size > maxSizeBytes) {
    const limit = formatFileSize(maxSizeBytes);
    return messages.tooLarge?.(limit) ?? null;
  }

  return null;
}

export function createFileId(): string {
  return `ui-file-${crypto.randomUUID()}`;
}
