import { Card, GetProps, styled } from 'tamagui';

export const GuiCard = styled(Card, {
  name: 'GuiCard',
  bg: '$background',

  variants: {
    example: {},
  } as const,
});
export type GuiCardProps = GetProps<typeof GuiCard>;
