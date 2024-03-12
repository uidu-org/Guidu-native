import { Controller, FieldValues } from 'react-hook-form'
import { GAutocomplete, GuiAutocompleteProps } from '../GuiAutocomplete'
import { GuiRhfProps } from './GuiRhfProps'

export type GuiAutocompleteRhfProps<T extends FieldValues> = GuiRhfProps<T> &
  GuiAutocompleteProps & {
    matchId?: boolean
  }

export function GAutocompleteRhf<T extends FieldValues = FieldValues>({
  name,
  rules,
  control,
  defaultValue,
  matchId,
  options,
  multiple,
  ...inputProps
}: GuiAutocompleteRhfProps<T>) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        let currentValue = multiple ? value || [] : value || null
        if (matchId) {
          // @ts-ignore
          currentValue = multiple
            ? (value || []).map((i: any) => options.find((j) => (j.value || j) === i))
            : options.find((i) => (i.value || i) === value) || null
        }

        return (
          <GAutocomplete
            {...inputProps}
            value={currentValue}
            multiple={multiple}
            options={options}
            error={!!error}
            onChange={(v) => {
              let changedVal = v
              if (matchId) {
                // @ts-ignore
                changedVal = Array.isArray(v) ? v.map((i: any) => i?.value || i) : v?.value || v
              }
              onChange(changedVal)
              if (typeof inputProps.onChange === 'function') {
                inputProps.onChange(v)
              }
            }}
            helperText={error ? error.message : inputProps.helperText}
          />
        )
      }}
    />
  )
}