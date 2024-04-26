import { GetProps, Label as TguiLabel, styled } from 'tamagui';

export const GuiLabel = styled(TguiLabel, {
  bg: '$background',

  variants: {
    variant: {
      button: {},
    },
  } as const,
});
export type GuiLabelProps = GetProps<typeof GuiLabel>;
