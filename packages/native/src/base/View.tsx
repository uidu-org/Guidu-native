import { GetProps, YStack, styled } from 'tamagui';

export const GuiView = styled(
  YStack,
  {
    name: 'GuiView',
    bg: '$background',
    variants: {
      centered: {
        true: {
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        },
      },
    } as const,
  },
  {}
);
export type GuiViewProps = GetProps<typeof GuiView>;
