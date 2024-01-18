import { Button, GetProps, styled } from 'tamagui'

export const GuiButton = styled(Button, {
  name: 'GuiButton',
  alignSelf: 'flex-start',
  bg: '#d9e9cc85',
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
export type GuiButtonProps = GetProps<typeof GuiButton>
