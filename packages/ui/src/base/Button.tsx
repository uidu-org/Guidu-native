import { Button, GetProps, styled } from 'tamagui'

export const GuiButton = styled(Button, {
  name: 'GuiButton',
  alignSelf: 'flex-start',
  bg: '#79737387',
  variants: {
    variant: {
      solid: { bg: '#14B6A4' },
      outline: {
        bg: '#79737387',
        borderWidth: '$1',
        borderColor: 'red',
      },
    },
  } as const,
})
export type GuiButtonrops = GetProps<typeof GuiButton>
