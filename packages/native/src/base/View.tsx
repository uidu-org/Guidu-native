import { Stack, styled } from 'tamagui'

export const GuiView = styled(
  Stack,
  {
    name: 'GuiView',

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
)
