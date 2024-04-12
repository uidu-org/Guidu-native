import { Controller, FieldValues } from 'react-hook-form'
import { GSwitch, GuiSwitchProps } from '../GuiSwitch'
import { GuiRhfProps } from './GuiRhfProps'

export type LmSwitchRhfProps<T extends FieldValues> = GuiSwitchProps & GuiRhfProps<T> & {}

export function LmSwitchRhf<T extends FieldValues>({
  name,
  control,
  rules = {},
  defaultValue,
  ...inputProps
}: LmSwitchRhfProps<T>) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <GSwitch {...inputProps} onCheckedChange={onChange} value={value} checked={!!value} />
      )}
    />
  )
}
