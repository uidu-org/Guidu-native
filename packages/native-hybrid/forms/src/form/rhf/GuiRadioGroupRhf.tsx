import { Controller, FieldValues } from 'react-hook-form';
import { GRadioGroup, GuiRadioGroupProps } from '../GuiRadioGroup';
import { GuiRhfProps } from './GuiRhfProps';

export type GuiRadioGroupRhfProps<T extends FieldValues> = GuiRadioGroupProps &
  GuiRhfProps<T> & {};

export function GRadioGroupRhf<T extends FieldValues>({
  name,
  control,
  rules = {},
  defaultValue,
  ...rest
}: GuiRadioGroupRhfProps<T>) {
  if (rest.required) {
    rules.required = 'This field is required';
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <GRadioGroup
          {...rest}
          name={name}
          value={value}
          onValueChange={onChange}
          error={!!error}
          helperText={error ? error.message : rest.helperText}
        />
      )}
    />
  );
}
