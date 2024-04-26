import { GetProps, Text, styled } from 'tamagui';

export const GuiText = styled(Text, {
  bg: '$background',

  // paddingTop: '10',
  variants: {
    variant: {
      button: {},
    },
  } as const,
});

export type GuiTextProps = GetProps<typeof GuiText>;

// helper to get props for any TamaguiComponent
// export type CircleProps = GetProps<typeof Circle>
