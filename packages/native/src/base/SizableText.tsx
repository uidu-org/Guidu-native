import { GetProps, SizableText, styled } from 'tamagui';

export const GuiSizableText = styled(SizableText, {
  name: 'GuiSizableText',
  bg: '$background',

  variants: {
    example: {},
  } as const,
});
export type GuiSizableTextProps = GetProps<typeof GuiSizableText>;
