import { useMemo } from 'react'
import { GSelect, GuiSelectProps } from '../form'
import { getMonthOptions } from './dateHelper'

export type GuiMonthsPickerProps = Omit<GuiSelectProps, 'options'>

export function GuiMonthsPicker(selectProps: GuiMonthsPickerProps) {
  const names = useMemo(() => {
    return getMonthOptions()
  }, [])
  return <GSelect options={names} {...selectProps} />
}
