import type { Meta, StoryObj } from '@storybook/angular';
import { Component, Input, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UiToastComponent } from '../toast/ui-toast.component';
import { UiFileUploadComponent } from './ui-file-upload.component';
import type {
  UiFileUploadErrorEvent,
  UiFileUploadSuccessEvent,
} from './ui-file-upload.types';

@Component({
  selector: 'ui-file-upload-toast-demo',
  standalone: true,
  imports: [UiFileUploadComponent, UiToastComponent],
  template: `
  <div class="demo">
    @if (toast()) {
      <ui-toast
        presentationMode="inline"
        [color]="toast()!.color"
        [title]="toast()!.title"
        [text]="toast()!.text"
        (closed)="toast.set(null)"
      />
    }

    <ui-file-upload
      [label]="label"
      [preset]="preset"
      [multiple]="multiple"
      [enableCrop]="enableCrop"
      [simulateUpload]="simulateUpload"
      [existingPreviewUrl]="existingPreviewUrl"
      [placeholderPreviewUrl]="placeholderPreviewUrl"
      [maxSizeBytes]="maxSizeBytes"
      [accept]="accept"
      [uploadFn]="uploadFn"
      [disabled]="disabled"
      [showAuxiliaryText]="showAuxiliaryText"
      [auxiliaryText]="auxiliaryText"
      (uploadSuccess)="onUploadSuccess($event)"
      (fileError)="onFileError($event)"
    />
  </div>
  `,
  styles: [
    `
      .demo {
        display: grid;
        gap: var(--ui-space-4);
      }
    `,
  ],
})
class FileUploadToastDemoComponent {
  @Input() label = 'Anexar arquivo';
  @Input() preset: 'default' | 'pet-photo' | 'exam' | 'pdf-only' = 'default';
  @Input() multiple: boolean | null = null;
  @Input() enableCrop: boolean | null = null;
  @Input() simulateUpload = true;
  @Input() existingPreviewUrl: string | null = null;
  @Input() placeholderPreviewUrl: string | null = null;
  @Input() maxSizeBytes: number | null = null;
  @Input() accept: string | null = null;
  @Input() uploadFn: ((file: File) => Observable<number>) | null = null;
  @Input() disabled = false;
  @Input() showAuxiliaryText = false;
  @Input() auxiliaryText = '';

  readonly toast = signal<{
    color: 'success' | 'danger';
    title: string;
    text: string;
  } | null>(null);

  onUploadSuccess(event: UiFileUploadSuccessEvent): void {
    this.toast.set({
      color: 'success',
      title: 'Sucesso!',
      text: `${event.fileName} enviado com sucesso.`,
    });
  }

  onFileError(event: UiFileUploadErrorEvent): void {
    this.toast.set({
      color: 'danger',
      title: 'Erro!',
      text: event.message,
    });
  }
}

const playgroundDefaults = {
  label: 'Anexar arquivo',
  ariaLabel: null as string | null,
  hideLabel: false,
  hideError: false,
  id: 'fileUpload',
  name: 'fileUpload',
  preset: 'default' as const,
  accept: null as string | null,
  multiple: null as boolean | null,
  maxFiles: 10,
  maxSizeBytes: null as number | null,
  enableCrop: null as boolean | null,
  dropzoneText: 'Arraste e solte o arquivo aqui',
  dropActiveText: 'Solte o arquivo para enviar',
  browseText: 'ou clique para procurar',
  constraintsText: 'Formatos aceitos: JPG, PNG, WebP, PDF até 10MB',
  auxiliaryText: 'Você pode enviar imagens ou documentos',
  showAuxiliaryText: false,
  disabledText: 'Upload de arquivo desabilitado',
  addMoreText: '+ Adicionar mais arquivos',
  cropActionText: 'Editar imagem (recortar)',
  uploadingText: 'Enviando arquivo...',
  existingPreviewTitle: 'Foto atual',
  existingPreviewMetaText: 'Imagem existente',
  previewExpandAriaLabel: 'Ampliar imagem',
  previewCloseAriaLabel: 'Fechar visualização da imagem',
  removeExistingAriaLabel: 'Remover foto atual',
  cancelUploadAriaLabel: 'Cancelar envio',
  removeFileAriaLabel: 'Remover arquivo',
  invalidFileTypeMessage: 'Tipo de arquivo não permitido',
  fileTooLargeMessage: 'Arquivo excede o tamanho máximo ({{maxSize}})',
  uploadFailedMessage: 'Não foi possível enviar o arquivo',
  unknownFileExtensionLabel: 'ARQUIVO',
  pdfBadgeText: 'pdf',
  cropperTitle: 'Recortar imagem',
  cropperCancelLabel: 'Cancelar',
  cropperApplyLabel: 'Aplicar recorte',
  cropperZoomLabel: 'Zoom',
  cropperRatioLabel: 'Proporção',
  cropperRotateLeftAriaLabel: 'Girar para a esquerda',
  cropperRotateRightAriaLabel: 'Girar para a direita',
  cropperAspectFreeLabel: 'Livre',
  cropperAspectSquareLabel: 'Quadrado (1:1)',
  cropperAspectFourThreeLabel: '4:3',
  cropperAspectSixteenNineLabel: '16:9',
  simulateUpload: true,
  existingPreviewUrl: null as string | null,
  placeholderPreviewUrl: null as string | null,
  required: false,
  disabled: false,
  optionalText: 'Opcional',
  showOptionalText: true,
  errorMessage: '*Campo obrigatório',
  showError: false,
  customClass: '',
};

const defaultHostStyles = `
  :host {
    display: block;
    max-width: 560px;
    padding: var(--ui-space-4);
  }
`;

const cropperPreviewHostStyles = `
  :host {
    display: block;
    width: 100%;
    max-width: min(1120px, 100%);
    min-height: 720px;
    padding: var(--ui-space-4);
    box-sizing: border-box;
  }
`;

const cropperPreviewParameters = {
  cropperPreview: true,
  layout: 'fullscreen' as const,
  docs: {
    story: {
      height: '900px',
    },
  },
};

const meta: Meta<UiFileUploadComponent> = {
  title: 'Components/File Upload',
  component: UiFileUploadComponent,
  tags: ['autodocs'],
  includeStories:
    /^(PlaygroundCompleto|Default|WithAuxiliaryText|MultipleFiles|PetPhoto|ExamUpload|PdfOnly|Disabled|WithExistingPhoto|WithToastFeedback|ValidationError|UploadFailure|RequiredWithError)$/,
  decorators: [
    (story, context) => ({
      ...story(),
      styles: [
        context.parameters['cropperPreview']
          ? cropperPreviewHostStyles
          : defaultHostStyles,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de upload com estados vazio, hover, carregando e sucesso. ' +
          'Erros são emitidos via `fileError` para exibição em toast, mantendo o dropzone vazio. ' +
          'Sucesso emite `uploadSuccess` para toast de confirmação.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Conteúdo' } },
    preset: {
      control: 'select',
      options: ['default', 'pet-photo', 'exam', 'pdf-only'],
      table: { category: 'Conteúdo' },
    },
    multiple: { control: 'boolean', table: { category: 'Comportamento' } },
    enableCrop: { control: 'boolean', table: { category: 'Comportamento' } },
    simulateUpload: { control: 'boolean', table: { category: 'Comportamento' } },
    disabled: { control: 'boolean', table: { category: 'Estado' } },
    showAuxiliaryText: { control: 'boolean', table: { category: 'Conteúdo' } },
    showError: { control: 'boolean', table: { category: 'Estado' } },
  },
};

export default meta;
type Story = StoryObj<UiFileUploadComponent>;

export const PlaygroundCompleto: Story = {
  args: playgroundDefaults,
};

export const Default: Story = {
  args: {
    ...playgroundDefaults,
    label: 'Documento',
  },
};

export const WithAuxiliaryText: Story = {
  args: {
    ...playgroundDefaults,
    label: 'Anexos',
    showAuxiliaryText: true,
  },
};

export const MultipleFiles: Story = {
  args: {
    ...playgroundDefaults,
    label: 'Exames',
    preset: 'exam',
    multiple: true,
    maxFiles: 5,
  },
};

export const PetPhoto: Story = {
  parameters: {
    ...cropperPreviewParameters,
    docs: {
      ...cropperPreviewParameters.docs,
      description: {
        story:
          'Preset para foto de pet com recorte opcional. Clique na miniatura para ampliar a imagem em um modal.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Foto do pet',
    preset: 'pet-photo',
    enableCrop: true,
    simulateUpload: true,
    constraintsText: 'Formatos aceitos: JPG, PNG, WebP até 5MB',
    placeholderPreviewUrl:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=240&q=80',
  },
};

export const ExamUpload: Story = {
  args: {
    ...playgroundDefaults,
    label: 'Exame laboratorial',
    preset: 'exam',
    multiple: true,
    constraintsText: 'Imagens ou PDF até 20MB',
    showAuxiliaryText: true,
    auxiliaryText: 'Envie imagens ou PDFs do exame',
  },
};

export const PdfOnly: Story = {
  args: {
    ...playgroundDefaults,
    label: 'PDF do exame',
    preset: 'pdf-only',
    constraintsText: 'Apenas arquivos PDF até 20MB',
    dropzoneText: 'Arraste e solte o PDF aqui',
  },
};

export const Disabled: Story = {
  args: {
    ...playgroundDefaults,
    label: 'Upload desabilitado',
    disabled: true,
  },
};

export const WithExistingPhoto: Story = {
  parameters: {
    ...cropperPreviewParameters,
    docs: {
      ...cropperPreviewParameters.docs,
      description: {
        story:
          'Exibe foto existente com opção de remoção. Clique na miniatura para visualizar a imagem ampliada.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    label: 'Foto do pet',
    preset: 'pet-photo',
    existingPreviewUrl:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=240&q=80',
    enableCrop: true,
  },
};

export const WithToastFeedback: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [FileUploadToastDemoComponent],
    },
    template: `
      <ui-file-upload-toast-demo
        label="Foto do pet"
        preset="pet-photo"
        [enableCrop]="true"
      />
    `,
  }),
  parameters: {
    ...cropperPreviewParameters,
    docs: {
      ...cropperPreviewParameters.docs,
      description: {
        story:
          'Ao concluir o upload, exibe toast de sucesso. O card do arquivo mostra apenas miniatura, metadados e botão X para remover.',
      },
    },
  },
};

export const ValidationError: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [FileUploadToastDemoComponent],
    },
    template: `
      <ui-file-upload-toast-demo
        label="PDF do exame"
        preset="pdf-only"
        [maxSizeBytes]="1024"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Arquivos inválidos ou acima do limite disparam `fileError` com toast de erro. O dropzone permanece vazio para nova tentativa.',
      },
    },
  },
};

export const UploadFailure: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [FileUploadToastDemoComponent],
    },
    template: `
      <ui-file-upload-toast-demo
        label="Documento"
        preset="default"
        [simulateUpload]="false"
        [uploadFn]="uploadFn"
      />
    `,
    props: {
      uploadFn: () => throwError(() => new Error('upload failed')),
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Falha no envio remove o card, exibe toast de erro e mantém o dropzone disponível.',
      },
    },
  },
};

export const RequiredWithError: Story = {
  args: {
    ...playgroundDefaults,
    label: 'Arquivo obrigatório',
    required: true,
    showError: true,
    errorMessage: '*Selecione um arquivo',
  },
};
