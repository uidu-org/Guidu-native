import { Controller, FieldValues } from 'react-hook-form'
import { GSlider, GuiSliderProps } from '../GuiSlider'
import { GuiRhfProps } from './GuiRhfProps'

export type GuiSliderRhfProps<T extends FieldValues> = GuiSliderProps & GuiRhfProps<T> & {}

export function GSliderRhf<T extends FieldValues>({
  name,
  control,
  rules = {},
  defaultValue,
  ...sliderProps
}: GuiSliderRhfProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState, formState }) => {
        const preparedValue = Array.isArray(value) ? value : [value]
        return (
          <GSlider
            {...sliderProps}
            defaultValue={preparedValue}
            onValueChange={(v) => {
              if (v.length === 1) {
                onChange(v[0])
              } else {
                onChange(v)
              }
              if (typeof sliderProps.onValueChange === 'function') {
                sliderProps.onValueChange(v)
              }
            }}
          />
        )
      }}
    />
  )
}
