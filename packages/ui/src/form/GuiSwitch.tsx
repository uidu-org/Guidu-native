import { useId } from 'react';
import { Label, StackProps, Switch, SwitchProps, XStack } from 'tamagui';

export type GuiSwitchProps = SwitchProps & {
  labelLeft?: string;
  labelRight?: string;
  thumbProps?: StackProps;
};

export function GSwitch({
  labelLeft,
  labelRight,
  space,
  size = '$2',
  thumbProps,
  ...rest
}: GuiSwitchProps) {
  const id = useId();
  return (
    <XStack alignItems={'center'} space={'$4'}>
      {labelLeft && (
        <Label htmlFor={id} size={size}>
          {labelLeft}
        </Label>
      )}
      <Switch id={id} {...rest} size={size}>
        <Switch.Thumb animation={'bouncy'} {...thumbProps} />
      </Switch>
      {labelRight && (
        <Label htmlFor={id} size={size}>
          {labelRight}
        </Label>
      )}
    </XStack>
  );
}
