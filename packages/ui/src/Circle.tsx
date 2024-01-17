import { GetProps, YStack, styled } from 'tamagui' // or '@tamagui/core' if extending just that

type PinType = 'top' | 'bottom' | 'left'

type Variants = {
  pin: {
    [k in PinType]: {
      [key: string]: string | number | any
    }
  }
  centered: {
    true: {
      [key: string]: string | number | any
    }
  }
}
export const GuiCircle = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 100_000_000,
  overflow: 'hidden',

  variants: {
    pin: {
      top: {
        position: 'absolute',
        top: 0,
      },
    },

    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderColor: 'red',
      },
    },

    size: {
      '...size': (size, { tokens }) => {
        return {
          width: tokens.size[size] ?? size,
          height: tokens.size[size] ?? size,
        }
      },
    },
  } as const,
})

export type GuiCircleProps = GetProps<typeof GuiCircle>
