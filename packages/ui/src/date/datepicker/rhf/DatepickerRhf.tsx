import { LmRhfProps } from '@tamagui-extras/form'
import { formatISO } from 'date-fns'
import { FieldValues, useController } from 'react-hook-form'
import { GuiDatepicker } from '../Datepicker'
import { GuiDatepickerProps } from '../datepickerTypes'

export type GuiDatepickerRhf<T extends FieldValues> = LmRhfProps<T> & GuiDatepickerProps

export function GuiDatepickerRhf<T extends FieldValues>({
  name,
  defaultValue,
  control,
  rules = {},
  required,
  ...datepickerProps
}: GuiDatepickerRhf<T>) {
  if (required) {
    rules.required = rules.required ?? 'This field is required'
  }
  const startController = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  let hasError = !!startController.fieldState.error
  const convertToDate = (date: Date | string | null) =>
    !date ? null : typeof date === 'string' ? new Date(date) : date
  return (
    <GuiDatepicker
      {...datepickerProps}
      startDate={startController.field.value ? convertToDate(startController.field.value) : null}
      isRangePicker={false}
      required={!!rules?.required}
      onChange={(data) => {
        const startValue = data.startDate
          ? formatISO(data.startDate, { representation: 'date' })
          : ''
        startController.field.onChange(startValue)
      }}
      helperText={hasError ? startController.fieldState.error?.message : datepickerProps.helperText}
      error={hasError}
    />
  )
}
