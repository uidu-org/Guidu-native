import { LmSelect } from '@tamagui-extras/form'
import { useMemo } from 'react'
import { DaysForLocaleProps, InputSelectorProps } from './dateSelectionTypes'

export function GuiDaySelect(props: InputSelectorProps) {
  const options = useMemo(() => {
    return daysForLocale()
  }, [])
  return <LmSelect options={options} width={120} {...props} />
}

function daysForLocale(params?: Pick<DaysForLocaleProps, 'localeName'>) {
  const { localeName = 'en' } = params || {}
  const format = new Intl.DateTimeFormat(localeName, { day: '2-digit' }).format
  return Array.from(Array(31).keys()).map((day) => {
    return {
      value: format(new Date(Date.UTC(2021, 0, day + 1))),
      label: format(new Date(Date.UTC(2021, 0, day + 1))),
    }
  })
}
