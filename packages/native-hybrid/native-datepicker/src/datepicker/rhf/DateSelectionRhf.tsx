import { Controller, FieldValues } from 'react-hook-form';
import { GuiRhfProps } from '../../../../native-forms/src/form';
import {
  GuiDateSelection,
  GuiDateSelectionProps,
} from '../dateSelection/DateSelection';

export type GuiDateSelectionRhfProps<T extends FieldValues> = GuiRhfProps<T> &
  GuiDateSelectionProps;

export function GuiDateSelectionRhf<T extends FieldValues>({
  name,
  defaultValue,
  control,
  rules = {},
  ...rest
}: GuiDateSelectionRhfProps<T>) {
  if (rest.required) {
    rules.required = 'This field is required';
  }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => {
        return (
          <GuiDateSelection
            {...rest}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : rest.helperText}
          />
        );
      }}
    />
  );
}
