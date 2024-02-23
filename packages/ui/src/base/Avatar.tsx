import { Avatar, GetProps, styled } from 'tamagui'

export const GuiAvatar = styled(Avatar, {
  name: 'GuiAvatar',

  variants: {
    example: {},
  } as const,
})

export type GuiAvatarProps = GetProps<typeof GuiAvatar>
