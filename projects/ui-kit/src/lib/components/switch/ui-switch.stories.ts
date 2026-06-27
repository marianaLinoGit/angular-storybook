import type { Meta, StoryObj } from '@storybook/angular';
import { UiSwitchComponent } from './ui-switch.component';

const meta: Meta<UiSwitchComponent> = {
  title: 'Components/Switch',
  component: UiSwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    checkedLabel: { control: 'text' },
    uncheckedLabel: { control: 'text' },
    showSideLabels: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    customClass: { control: 'text' },
    checkedChange: {
      action: 'checkedChange',
      table: { category: 'Events' },
    },
  },
};

export default meta;

type Story = StoryObj<UiSwitchComponent>;

export const Default: Story = {
  args: {
    id: 'themeSwitch',
    name: 'themeSwitch',
    label: 'Tema',
    checkedLabel: 'Dark',
    uncheckedLabel: 'Light',
    showSideLabels: true,
    disabled: false,
    size: 'md',
    customClass: '',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const ThemeSwitcher: Story = {
  args: {
    showSideLabels: true,
    uncheckedLabel: '☀️ Light',
    checkedLabel: '🌙 Dark',
    size: 'md',
  },
};

export const WithoutLabel: Story = {
  args: {
    ...Default.args,
    label: '',
    checkedLabel: 'Ativo',
    uncheckedLabel: 'Inativo',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
