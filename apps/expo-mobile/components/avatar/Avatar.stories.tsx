import type { Meta, StoryObj } from '@storybook/react';
import { TamaguiProvider } from '@uidu/native';
import { config } from '@uidu/native-config';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AvatarIndex } from './index';

const meta = {
  title: 'Gui-Avatar',
  component: AvatarIndex,
  decorators: [
    (Story) => (
      <SafeAreaView>
        <TamaguiProvider config={config}>
          <View style={{ padding: 16 }}>
            <Story />
          </View>
        </TamaguiProvider>
      </SafeAreaView>
    ),
  ],
} satisfies Meta<typeof AvatarIndex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
