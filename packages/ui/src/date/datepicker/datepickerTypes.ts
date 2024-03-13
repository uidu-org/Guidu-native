import { OnDatesChangeProps, UseMonthProps } from '@datepicker-react/hooks'
import { LmPopoverProps } from '@tamagui-extras/core'
import { ButtonProps, InputProps, SizeTokens, ThemeableStackProps } from 'tamagui'
import { GuiFormContainerBaseTypes } from '../../form'

export type GuiDatepickerProps = GuiFormContainerBaseTypes & {
  startDate?: Date | null
  endDate?: Date | null
  value?: Date | null
  numberOfMonths?: number
  isRangePicker?: boolean
  onChange?: (data: OnDatesChangeProps) => void
  labelFunctions?: Pick<UseMonthProps, 'dayLabelFormat' | 'weekdayLabelFormat' | 'monthLabelFormat'>
  fullWidth?: boolean
  inputProps?: InputProps
  buttonProps?: ButtonProps
  containerProps?: ThemeableStackProps
  popoverProps?: Omit<LmPopoverProps, 'trigger'>
  size?: SizeTokens
}
