import { Card, GetProps, styled } from 'tamagui'

export const GuiCard = styled(Card, {
  name: 'GuiCard',

  variants: {
    example: {},
  } as const,
})
export type GuiCardProps = GetProps<typeof GuiCard>
