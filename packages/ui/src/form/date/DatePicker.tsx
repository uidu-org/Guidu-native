import type { DPDay, DatePickerProviderProps } from '@rehookify/datepicker'
import {
  DatePickerProvider as _DatePickerProvider,
  useDatePickerContext,
} from '@rehookify/datepicker'
import { Calendar, ChevronLeft, ChevronRight, X } from '@tamagui/lucide-icons'
import { useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  H2,
  Input,
  SizableText,
  ThemeableStack,
  View,
  XStack,
  YStack,
  createStyledContext
} from 'tamagui'

const DatePickerProvider =
  _DatePickerProvider as React.ComponentType<DatePickerProviderProps>

/** rehookify internally return `onClick` and that's incompatible with native */
function swapOnClick<D>(d: D) {
  //@ts-ignore
  d.onPress = d.onClick
  return d
}

const { Provider: HeaderTypeProvider, useStyledContext: useHeaderType } =
  createStyledContext({ type: 'day', setHeader: (_: 'day' | 'month' | 'year') => { } })

function CalendarHeader() {
  const {
    data: { calendars, years },
    propGetters: { subtractOffset, previousYearsButton, nextYearsButton },
  } = useDatePickerContext()
  const { type: header, setHeader } = useHeaderType()
  const { year, month } = calendars[0]

  if (header === 'year') {
    return (
      <XStack w="100%" h={50} ai="center" jc="space-between">
        <Button size="$4" {...swapOnClick(previousYearsButton())}>
          <Button.Icon scaleIcon={1.5}>
            <ChevronLeft />
          </Button.Icon>
        </Button>
        <YStack ai="center">
          <SizableText size="$6">
            {`${years[0].year} - ${years[years.length - 1].year}`}
          </SizableText>
        </YStack>
        <Button size="$4" {...swapOnClick(nextYearsButton())}>
          <Button.Icon scaleIcon={1.5}>
            <ChevronRight />
          </Button.Icon>
        </Button>
      </XStack>
    )
  }

  if (header === 'month') {
    return (
      <SizableText
        w="100%"
        ta="center"
        selectable
        tabIndex={0}
        theme="alt1"
        size="$8"
        cur="pointer"
      >
        Select a month
      </SizableText>
    )
  }
  return (
    <XStack w="100%" h={50} ai="center" jc="space-between">
      <Button size="$4" {...swapOnClick(subtractOffset({ months: 1 }))}>
        <Button.Icon scaleIcon={1.5}>
          <ChevronLeft />
        </Button.Icon>
      </Button>
      <YStack h={50} ai="center">
        <SizableText
          onPress={() => setHeader('year')}
          selectable
          tabIndex={0}
          size="$4"
          cur="pointer"
        >
          {year}
        </SizableText>
        <SizableText
          onPress={() => setHeader('month')}
          selectable
          cur="pointer"
          tabIndex={0}
          size="$6"
        >
          {month}
        </SizableText>
      </YStack>
      <Button size="$4" {...swapOnClick(subtractOffset({ months: -1 }))}>
        <Button.Icon scaleIcon={1.5}>
          <ChevronRight />
        </Button.Icon>
      </Button>
    </XStack>
  )
}

function DayPicker() {
  const {
    data: { calendars, weekDays },
    propGetters: { dayButton },
  } = useDatePickerContext()

  const { days } = calendars[0]

  // divide days array into sub arrays that each has 7 days, for better stylings
  const subDays = useMemo(
    () =>
      days.reduce((acc, day, i) => {
        if (i % 7 === 0) {
          acc.push([])
        }
        acc[acc.length - 1].push(day)
        return acc
      }, [] as DPDay[][]),
    [days]
  )

  return (
    <ThemeableStack
      animation="medium"
      enterStyle={{
        o: 0,
      }}
    >
      <XStack gap="$1">
        {weekDays.map(day => day.split(',')[0]).map((day) => (
          <SizableText key={day} ta="center" w={45} size="$6">
            {day}
          </SizableText>
        ))}
      </XStack>
      <YStack gap="$1" fw="wrap">
        {subDays.map((days, index) => {
          return (
            <XStack key={`${days[0].$date.toString()}_${index}`} gap="$1">
              {days.map((d) => (
                <Button
                  key={d.$date.toString()}
                  chromeless
                  circular
                  p={0}
                  w={45}
                  {...swapOnClick(dayButton(d))}
                  bg={d.selected ? '$gray7Light' : 'transparent'}
                  disabled={!d.inCurrentMonth}
                >
                  <Button.Text
                    color={d.inCurrentMonth || d.selected ? '$gary8' : 'transparent'}
                  >
                    {d.day}
                  </Button.Text>
                </Button>
              ))}
            </XStack>
          )
        })}
      </YStack>
    </ThemeableStack>
  )
}

function MonthPicker() {
  const {
    data: { months },
    propGetters: { monthButton },
  } = useDatePickerContext()
  const { setHeader } = useHeaderType()
  return (
    <XStack
      fw="wrap"
      gap="$2"
      animation="100ms"
      enterStyle={{
        o: 0,
      }}
    >
      {months.map((month) => (
        <Button
          themeInverse={month.active}
          br="$true"
          fs={0}
          fb={100}
          bg={month.active ? '$background' : 'transparent'}
          key={month.$date.toString()}
          chromeless
          p={0}
          {...swapOnClick(
            monthButton(month, {
              onClick: () => {
                setHeader('day')
              },
            })
          )}
        >
          <Button.Text>{month.month}</Button.Text>
        </Button>
      ))}
    </XStack>
  )
}

function YearPicker() {
  const {
    data: { years, calendars },
    propGetters: { yearButton },
  } = useDatePickerContext()
  const selectedYear = calendars[0].year
  const { setHeader } = useHeaderType()
  return (
    <XStack
      fw="wrap"
      gap="$2"
      animation="100ms"
      enterStyle={{
        o: 0,
      }}
    >
      {years.map((year) => (
        <Button
          themeInverse={year.year === Number(selectedYear)}
          br="$true"
          fs={0}
          fb={100}
          bg={year.year === Number(selectedYear) ? '$background' : 'transparent'}
          key={year.$date.toString()}
          chromeless
          p={0}
          {...swapOnClick(
            yearButton(year, {
              onClick: () => {
                setHeader('day')
              },
            })
          )}
        >
          <Button.Text>{year.year}</Button.Text>
        </Button>
      ))}
    </XStack>
  )
}

function DatePickerBody() {
  const [header, setHeader] = useState<'day' | 'month' | 'year'>('day')

  const CalenderBody = {
    day: DayPicker,
    month: MonthPicker,
    year: YearPicker,
  }[header]

  return (
    <HeaderTypeProvider type={header} setHeader={setHeader}>
      <YStack ai="center" gap="$4" w={325}>
        <CalendarHeader />
        <CalenderBody />
      </YStack>
    </HeaderTypeProvider>
  )
}

/** ------ EXAMPLE ------ */
export function GuiDatePicker({ onChange, defaultDates, titleDialog }) {
  const [selectedDates, onDatesChange] = useState<Date[]>(defaultDates ?? [])
  const [open, setOpen] = useState(false)
  console.log(defaultDates);


  return (
    <>
      <XStack bw={1} br={10} ai={"center"} pr={"$3"} >
        <Input
          value={selectedDates[0]?.toDateString() || ''}
          placeholder="Select a date"
          pr="$6"
          bw={0}
          bg={"transparent"}
        />
        <Calendar ml={"auto"} onPress={() => setOpen(true)} />
      </XStack>
      <Dialog open={open} onOpenChange={setOpen} >
        <Dialog.Portal>
          <Dialog.Overlay />

          <Dialog.Content
            bw={1}
            bc="$borderColor"
            enterStyle={{ y: -10, o: 0 }}
            exitStyle={{ y: -10, o: 0 }}
            elevate
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
          >
            <DatePickerProvider
              config={{
                selectedDates,
                onDatesChange: (date) => {
                  onDatesChange(date)
                  if (typeof onChange === "function") {
                    onChange?.(date[0])
                  }
                },
                calendar: {
                  startDay: 1,
                },
              }}
            >
              <View fd={"row"} ai={"center"} jc={"space-around"} mb={"$3"} >
                <H2>{titleDialog ?? "Calendar"}</H2>
                <X onPress={() => setOpen(false)} />
              </View>
              <DatePickerBody />
            </DatePickerProvider>

          </Dialog.Content>

        </Dialog.Portal>
      </Dialog>
    </>

  )
}

GuiDatePicker.fileName = 'GuiDatePicker'
