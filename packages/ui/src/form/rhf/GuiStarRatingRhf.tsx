import { Controller, FieldValues } from 'react-hook-form'
import { GStarRating, GuiStarRatingProps } from '../GuiStarRating'
import { GuiRhfProps } from './GuiRhfProps'

export type LmStarRatingRhfProps<T extends FieldValues> = GuiStarRatingProps & GuiRhfProps<T> & {}

export function GuiStarRatingRhf<T extends FieldValues>({
  name,
  control,
  rules = {},
  defaultValue,
  ...inputProps
}: LmStarRatingRhfProps<T>) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <GStarRating {...inputProps} onChange={onChange} value={value ?? null} />
      )}
    />
  )
}
