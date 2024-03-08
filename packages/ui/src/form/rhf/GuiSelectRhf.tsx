import { Controller, FieldValues } from 'react-hook-form'
import { GSelect, GuiSelectProps } from '../GuiSelect'
import { GuiRhfProps } from './GuiRhfProps'

export type GuiSelectRhfProps<T extends FieldValues> = GuiSelectProps & GuiRhfProps<T> & {}

export function LmSelectRhf<T extends FieldValues>({
  name,
  control,
  rules = {},
  defaultValue,
  ...inputProps
}: GuiSelectRhfProps<T>) {
  if (inputProps.required) {
    rules.required = 'This field is required'
  }
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref }, fieldState: { error, invalid } }) => (
        <GSelect
          {...inputProps}
          value={value ?? ''}
          error={invalid}
          onValueChange={onChange}
          helperText={error ? error.message : inputProps.helperText}
        />
      )}
    />
  )
}
