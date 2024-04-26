import { GetProps, TextArea, styled } from 'tamagui';

export const GuiTextArea = styled(TextArea, {
  bg: '$background',

  variants: {
    variant: {
      button: {},
    },
  } as const,
});

export type GuiTextAreaProps = GetProps<typeof GuiTextArea>;
