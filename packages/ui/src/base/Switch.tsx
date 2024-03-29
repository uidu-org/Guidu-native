import { GetProps, Switch, styled } from 'tamagui'

export const GuiSwitch = styled(Switch, {
  name: 'GuiSwitch',

  variants: {
    example: {},
  } as const,
})
export type GuiSwitchProps = GetProps<typeof GuiSwitch>
