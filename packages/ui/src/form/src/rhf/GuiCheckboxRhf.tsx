import { Controller, FieldValues } from 'react-hook-form'
import { GCheckbox, GuiCheckboxProps } from '../GuiCheckbox'
import { LmRhfProps } from './GuiRhfProps'

type GuiCheckboxRhfProps<T extends FieldValues> = GuiCheckboxProps & LmRhfProps<T>

export function GCheckboxRhf<T extends FieldValues>({
  name,
  rules = {},
  control,
  defaultValue,
  ...inputProps
}: GuiCheckboxRhfProps<T>) {
  if (inputProps.required) {
    rules.required = 'This field is required'
  }
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <GCheckbox
          {...inputProps}
          value={value ?? false}
          error={!!error}
          onChange={onChange}
          helperText={error ? error.message : inputProps.helperText}
        />
      )}
    />
  )
}
