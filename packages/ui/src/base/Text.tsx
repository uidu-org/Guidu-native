import { Text, styled } from 'tamagui'

export const GuiText = styled(Text, {
  // paddingTop: '10',
  variants: {
    variant: {
      button: {},
    },
  },
})

// helper to get props for any TamaguiComponent
// export type CircleProps = GetProps<typeof Circle>
