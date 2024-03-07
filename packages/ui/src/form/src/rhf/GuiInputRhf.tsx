import { Controller, FieldValues } from 'react-hook-form'
import { GInput, GuiInputProps } from '../GuiInput'
import { LmRhfProps } from './GuiRhfProps'

export type GuiInputRhfProps<T extends FieldValues = FieldValues> = GuiInputProps & LmRhfProps<T>

export function LmInputRhf<T extends FieldValues = FieldValues>({
  name,
  control,
  rules = {},
  defaultValue,
  ...inputProps
}: GuiInputRhfProps<T>) {
  if (inputProps.required) {
    rules.required = 'This field is required'
  }
  return (
    <Controller<T>
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
        <GInput
          {...inputProps}
          ref={ref}
          value={value ?? ''}
          onBlur={onBlur}
          error={!!error}
          onChangeText={onChange}
          helperText={error ? error.message : inputProps.helperText}
        />
      )}
    />
  )
}
