import { MonthType } from '@datepicker-react/hooks'
import { LmPopover, LmPopoverProps } from "@tamagui-extras/core"
import { Button, ButtonProps, XStack } from 'tamagui'
import { CalendarRegular } from '../../content/icons'
import { GuiMonth, GuiMonthProps } from './Month'
import { GuiDatepickerProps } from './datepickerTypes'

type GuiDatepickerPopoverProps = Omit<LmPopoverProps, 'trigger'> & {
  activeMonths: MonthType[]
  monthsCount: number
  firstDayOfWeek: GuiMonthProps['firstDayOfWeek']
  labelFunctions: GuiDatepickerProps['labelFunctions']
  buttonProps?: ButtonProps
}

export function GuiDatepickerPopover({
  activeMonths,
  monthsCount,
  firstDayOfWeek,
  labelFunctions,
  buttonProps,
  size,
  ...popoverProps
}: GuiDatepickerPopoverProps) {
  return (
    <LmPopover
      isBouncy={true}
      {...popoverProps}
      contentProps={{
        padding: '$4',
        elevation: '$5',
        ...popoverProps?.contentProps,
      }}
      trigger={
        <Button
          icon={<CalendarRegular />}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          size={size}
          {...buttonProps}
        />
      }
    >
      <XStack space alignItems={'flex-start'}>
        {activeMonths.map((month, index) => (
          <GuiMonth
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            monthsCount={monthsCount}
            firstDayOfWeek={firstDayOfWeek}
            isFirst={monthsCount === 0 || index === 0}
            isLast={monthsCount === 0 || index === monthsCount - 1}
            {...labelFunctions}
          />
        ))}
      </XStack>
    </LmPopover>
  )
}
