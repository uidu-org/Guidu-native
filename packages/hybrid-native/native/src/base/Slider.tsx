import { GetProps, Slider, styled } from 'tamagui';

export const GuiSlider = styled(Slider, {
  name: 'GuiSlider',
  bg: '$background',

  variants: {
    example: {},
  } as const,
});
export type GuiSliderProps = GetProps<typeof GuiSlider>;
