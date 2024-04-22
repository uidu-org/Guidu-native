import type { Meta, StoryObj } from '@storybook/react';
import { TamaguiProvider } from '@uidu/native';
import { config } from '@uidu/native-config';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SheetIndex } from './index';

const meta = {
  title: 'Gui-sheet',
  component: SheetIndex,
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
} satisfies Meta<typeof SheetIndex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
