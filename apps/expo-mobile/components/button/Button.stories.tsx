import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { ButtonIndex } from './index';

const meta = {
  title: 'GuiButton',
  component: ButtonIndex,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ButtonIndex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
