import { OnDatesChangeProps, START_DATE } from '@datepicker-react/hooks'
import { useEffect, useId, useState } from 'react'
import { Platform } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Button, Input, XGroup, XStack } from 'tamagui'
import { CalendarRegular } from '../../content/icons'
import { GFormFieldContainer } from '../../form'
import { getLocaleDate } from '../dateHelper'
import { GuiDatepickerProps } from './datepickerTypes'

export function GuiDatepicker({
  numberOfMonths,
  isRangePicker,
  onChange,
  labelFunctions,
  startDate = null,
  endDate = null,
  required,
  error,
  helperText,
  label,
  labelProps,
  labelInline,
  containerProps,
}: GuiDatepickerProps) {
  const id = useId()
  const [startOpen, startOpenChange] = useState(false)
  const [endOpen, endOpenChange] = useState(false)
  const [state, setState] = useState<OnDatesChangeProps>({
    startDate: startDate,
    endDate: endDate,
    focusedInput: START_DATE,
  })
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(state)
    }
  }, [state])
  return (
    <GFormFieldContainer
      id={id}
      error={error}
      required={required}
      labelProps={labelProps}
      label={label}
      labelInline={labelInline}
      helperText={helperText}
      {...containerProps}
    >
      <XStack space width={Platform.OS === 'web' ? 'fit-content' : undefined}>
        <XGroup>
          <XGroup.Item>
            <Input
              width={'$12'}
              value={state.startDate ? getLocaleDate({ date: state.startDate }) : ''}
            ></Input>
          </XGroup.Item>
          <XGroup.Item>
            <Button onPress={() => startOpenChange((state) => !state)} icon={<CalendarRegular />} />
          </XGroup.Item>
        </XGroup>
        {isRangePicker && (
          <XGroup>
            <XGroup.Item>
              <Input
                width={'$12'}
                value={state.endDate ? getLocaleDate({ date: state.endDate }) : ''}
              />
            </XGroup.Item>
            <XGroup.Item>
              <Button onPress={() => endOpenChange((state) => !state)} icon={<CalendarRegular />} />
            </XGroup.Item>
          </XGroup>
        )}
      </XStack>
      {startOpen && (
        <DateTimePickerModal
          date={state.startDate ?? undefined}
          isVisible={startOpen}
          mode={'date'}
          onConfirm={(date) => {
            setState((old) => ({
              ...old,
              startDate: date ?? null,
            }))
            startOpenChange(false)
          }}
          onCancel={() => startOpenChange(false)}
        />
      )}
      {endOpen && (
        <DateTimePickerModal
          date={state.endDate ?? undefined}
          isVisible={endOpen}
          mode={'date'}
          onConfirm={(date) => {
            setState((old) => ({
              ...old,
              endDate: date ?? null,
            }))
            startOpenChange(false)
          }}
          onCancel={() => endOpenChange(false)}
        />
      )}
    </GFormFieldContainer>
  )
}
