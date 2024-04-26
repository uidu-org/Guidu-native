import { GetProps, Input, styled } from 'tamagui';

export const GuiInput = styled(Input, {
  bg: '$background',

  variants: {
    variant: {
      button: {},
    },
  } as const,
});
export type GuiInputProps = GetProps<typeof GuiInput>;
