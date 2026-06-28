import type { Meta, StoryObj } from '@storybook/angular';
import { UiLabelComponent } from './ui-label.component';

const meta: Meta<UiLabelComponent> = {
  title: 'Components/Label',
  component: UiLabelComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto visível do label.',
    },
    forId: {
      control: 'text',
      description: 'ID do campo associado ao label.',
    },
    required: {
      control: 'boolean',
      description: 'Exibe indicador visual de campo obrigatório.',
    },
    optionalText: {
      control: 'text',
      description: 'Texto exibido quando o campo é opcional.',
    },
    showOptionalText: {
      control: 'boolean',
      description: 'Controla a exibição do texto opcional.',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS customizada.',
    },
  },
};

export default meta;

type Story = StoryObj<UiLabelComponent>;

export const Required: Story = {
  args: {
    label: 'E-mail',
    forId: 'email',
    required: true,
    optionalText: 'Opcional',
    showOptionalText: true,
    customClass: '',
  },
};

export const Optional: Story = {
  args: {
    label: 'Nome preferido',
    forId: 'preferredName',
    required: false,
    optionalText: 'Opcional',
    showOptionalText: true,
    customClass: '',
  },
};

export const OptionalEnglish: Story = {
  args: {
    label: 'Preferred name',
    forId: 'preferredName',
    required: false,
    optionalText: 'Optional',
    showOptionalText: true,
    customClass: '',
  },
};
