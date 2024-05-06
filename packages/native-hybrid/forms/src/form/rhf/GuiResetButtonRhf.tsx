import { ButtonProps, GuiButton } from '@uidu/native';
import { useFormContext } from 'react-hook-form';

export function GuiResetButtonRhf(props: ButtonProps) {
  const { reset } = useFormContext();
  return (
    <GuiButton
      {...(props as any)}
      onPress={(e) => {
        reset();
        if (typeof props.onPress === 'function') {
          props.onPress(e);
        }
      }}
    />
  );
}
