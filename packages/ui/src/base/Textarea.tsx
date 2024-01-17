import { TextArea, styled } from 'tamagui'

export const GuiTextArea = styled(TextArea, {
  bg: '$background',
  variants: {
    variant: {
      button: {},
    },
  },
})
