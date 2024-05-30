import { Meta } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import React from 'react';

import { Button, ButtonProps } from '../src';

export default {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    fitContent: {
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<typeof Button>;

const defaultProps = {
  children: 'Button Test',
};

const StateTemplate = (args: ButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePress = () => {
    // eslint-disable-next-line no-console
    console.log('Pressed');
    setIsOpen((prev) => !prev);
  };

  return (
    <Button
      {...args}
      id="button"
      aria-label="Open"
      aria-pressed={isOpen}
      onClick={handlePress}
    >
      {isOpen ? 'Close' : 'Open'}
    </Button>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithState = {
  render: StateTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 👇 Simulate interactions with the component
    await userEvent.click(canvas.getByRole('button'));

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Close')).toBeInTheDocument();
  },
  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const IsLoading = {
  args: {
    ...defaultProps,
    isLoading: true,
  },
};
