import type { Meta, StoryObj } from '@storybook/angular';
import { UiImageCropperComponent } from '../file-upload/ui-image-cropper.component';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=960&q=80';

const playgroundDefaults = {
  imageUrl: PLACEHOLDER_IMAGE,
  fileName: 'pet-photo.jpg',
  title: 'Recortar imagem',
  cancelLabel: 'Cancelar',
  applyLabel: 'Aplicar recorte',
  zoomLabel: 'Zoom',
  ratioLabel: 'Proporção',
  rotateLeftAriaLabel: 'Girar para a esquerda',
  rotateRightAriaLabel: 'Girar para a direita',
  aspectRatioFreeLabel: 'Livre',
  aspectRatioSquareLabel: 'Quadrado (1:1)',
  aspectRatioFourThreeLabel: '4:3',
  aspectRatioSixteenNineLabel: '16:9',
};

const meta: Meta<UiImageCropperComponent> = {
  title: 'Components/ImageCropper',
  component: UiImageCropperComponent,
  tags: ['autodocs'],
  includeStories: /^(PlaygroundCompleto|Standalone)$/,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '900px',
      },
      description: {
        component:
          'Editor modal de recorte de imagem com zoom, proporções (livre, 1:1, 4:3, 16:9), rotação e ações aplicar/cancelar.\n\n' +
          '**Uso:** passe `imageUrl` e escute `applied` (File) / `cancelled`. Labels são configuráveis para i18n.\n\n' +
          'Usado internamente pelo `ui-file-upload` quando `enableCrop` está ativo.',
      },
    },
  },
  argTypes: {
    imageUrl: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'URL da imagem a ser recortada.',
    },
    fileName: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Nome base do arquivo gerado ao aplicar o recorte.',
    },
    title: {
      control: 'text',
      table: { category: 'Conteúdo' },
      description: 'Título do diálogo de recorte.',
    },
    cancelLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    applyLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    zoomLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    ratioLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    rotateLeftAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
    },
    rotateRightAriaLabel: {
      control: 'text',
      table: { category: 'Acessibilidade' },
    },
    aspectRatioFreeLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    aspectRatioSquareLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    aspectRatioFourThreeLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    aspectRatioSixteenNineLabel: {
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    cancelled: {
      action: 'cancelled',
      table: { category: 'Events' },
      description: 'Disparado ao cancelar o recorte.',
    },
    applied: {
      action: 'applied',
      table: { category: 'Events' },
      description: 'Disparado ao aplicar o recorte, com o `File` JPEG resultante.',
    },
  },
  args: { ...playgroundDefaults },
  render: (args) => ({
    props: args,
    template: `
      <ui-image-cropper
        [imageUrl]="imageUrl"
        [fileName]="fileName"
        [title]="title"
        [cancelLabel]="cancelLabel"
        [applyLabel]="applyLabel"
        [zoomLabel]="zoomLabel"
        [ratioLabel]="ratioLabel"
        [rotateLeftAriaLabel]="rotateLeftAriaLabel"
        [rotateRightAriaLabel]="rotateRightAriaLabel"
        [aspectRatioFreeLabel]="aspectRatioFreeLabel"
        [aspectRatioSquareLabel]="aspectRatioSquareLabel"
        [aspectRatioFourThreeLabel]="aspectRatioFourThreeLabel"
        [aspectRatioSixteenNineLabel]="aspectRatioSixteenNineLabel"
        (cancelled)="cancelled()"
        (applied)="applied($event)"
      />
    `,
  }),
};

export default meta;

type Story = StoryObj<UiImageCropperComponent>;

export const PlaygroundCompleto: Story = {
  name: 'Playground completo',
  parameters: {
    docs: {
      description: {
        story:
          'Modelo interativo com zoom, proporções, rotação e ações aplicar/cancelar. Ajuste labels e URL nos controles.',
      },
    },
  },
  args: { ...playgroundDefaults },
};

export const Standalone: Story = {
  name: 'Standalone',
  parameters: {
    docs: {
      description: {
        story:
          'Uso standalone do cropper (fora do file-upload). Explore zoom, ratios, rotate e apply/cancel.',
      },
    },
  },
  args: {
    ...playgroundDefaults,
    title: 'Ajustar foto do pet',
    applyLabel: 'Salvar recorte',
  },
};
