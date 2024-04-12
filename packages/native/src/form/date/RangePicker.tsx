import type { DPDay } from "@rehookify/datepicker";
import {
  DatePickerProvider as _DatePickerProvider,
  useDatePickerContext
} from "@rehookify/datepicker";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import { useMemo, useState } from "react";
import type { GetProps } from "tamagui";
import {
  Button,
  Dialog,
  SizableText,
  Stack,
  View,
  XStack,
  YStack,
  createStyledContext
} from "tamagui";

const DatePickerProvider = _DatePickerProvider as any;

/** rehookify internally return `onClick` and that's incompatible with native */
function swapOnClick<D>(d: D) {
  //@ts-ignore
  d.onPress = d.onClick;
  return d;
}

const { Provider: HeaderTypeProvider, useStyledContext: useHeaderType } =
  createStyledContext({
    type: "day",
    setHeader: (_: "calendar" | "year") => { }
  });

const RANGE_STYLE: { [key: string]: GetProps<typeof Stack> } = {
  "in-range": {
    bg: "$background",
    bw: 1,
    borderStyle: "dashed",
    blw: 0,
    brw: 0,
    br: 0
  },
  "range-start": {
    bc: "$gray8",
    bw: 1,
    borderStyle: "solid",
    blw: 1,
    brw: 0,
    btrr: 0,
    bbrr: 0
  },
  "range-end": {
    bc: "$gray8",
    bw: 1,
    borderStyle: "solid",
    blw: 0,
    brw: 1,
    btlr: 0,
    bblr: 0
  },
  "range-start range-end": {
    bw: 1,
    borderStyle: "solid"
  },
  "will-be-in-range": {
    bc: "$gray8",
    bw: 1,
    borderStyle: "dashed",
    blw: 0,
    brw: 0,
    br: 0
  },
  "will-be-range-start": {
    bc: "$gray8",
    bw: 1,
    borderStyle: "solid",
    blw: 1,
    brw: 0,
    btrr: 0,
    bbrr: 0
  },
  "will-be-range-end": {
    bc: "$gray8",
    bw: 1,
    borderStyle: "solid",
    blw: 0,
    brw: 1,
    btlr: 0,
    bblr: 0
  },
  "": {}
};

function Calendar({ calenderIndex = 0 }: { calenderIndex?: number }) {
  const { setHeader } = useHeaderType();
  const {
    data: { calendars, weekDays },
    propGetters: { dayButton, subtractOffset }
  } = useDatePickerContext();

  const { days, year, month } = calendars[calenderIndex];

  // divide days array into sub arrays that each has 7 days, for better stylings
  const subDays = useMemo(
    () =>
      days.reduce((acc, day, i) => {
        if (i % 7 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(day);
        return acc;
      }, [] as DPDay[][]),
    [days]
  );

  return (
    <YStack>
      <XStack
        w="100%"
        h={50}
        ai="center"
        jc="space-between"
      >
        <Button
          size="$4"
          {...swapOnClick(subtractOffset({ months: 1 }))}
        >
          <Button.Icon scaleIcon={1.5}>
            <ChevronLeft />
          </Button.Icon>
        </Button>

        <YStack
          h={50}
          ai="center"
        >
          <SizableText
            onPress={() => setHeader("year")}
            selectable
            tabIndex={0}
            size="$4"
            cur="pointer"
          >
            {year}
          </SizableText>
          <SizableText
            selectable
            cur="pointer"
            tabIndex={0}
            size="$6"
          >
            {month}
          </SizableText>
        </YStack>
        <Button
          size="$4"
          {...swapOnClick(subtractOffset({ months: -1 }))}
        >
          <Button.Icon scaleIcon={1.5}>
            <ChevronRight />
          </Button.Icon>
        </Button>
      </XStack>
      <View mt={"$4"}>
        <XStack gap="$1">
          {weekDays.map((day) => (
            <SizableText
              key={day}
              ta="center"
              w={45}
              size="$6"
            >
              {day}
            </SizableText>
          ))}
        </XStack>
        <YStack gap="$1">
          {subDays.map((days) => {
            return (
              <XStack
                key={days[0].$date.toString()}
                gap="$1"
              >
                {days.map((d) => (
                  <Button
                    key={d.$date.toString()}
                    chromeless
                    circular
                    p={0}
                    w={45}
                    {...swapOnClick(dayButton(d))}
                    bg={d.selected ? "$background" : "transparent"}
                    themeInverse={d.selected}
                    opacity={d.inCurrentMonth ? 1 : 0}
                    {...RANGE_STYLE[d.range]}
                    data-range={d.range}
                  >
                    <Button.Text
                      color={
                        d.inCurrentMonth || d.selected
                          ? "$gary8Dark"
                          : "$gray10Dark"
                      }
                    >
                      {d.day}
                    </Button.Text>
                  </Button>
                ))}
              </XStack>
            );
          })}
        </YStack>
      </View>
    </YStack>
  );
}

function YearPicker() {
  const {
    data: { years, calendars },
    propGetters: { yearButton, previousYearsButton, nextYearsButton }
  } = useDatePickerContext();
  const selectedYear = calendars[0].year;
  const { setHeader } = useHeaderType();
  return (
    <YStack
      gap="$2"
      jc="center"
      ai="center"
    >
      <XStack
        w="100%"
        h={50}
        ai="center"
        jc="space-between"
      >
        <Button
          size="$4"
          {...swapOnClick(previousYearsButton())}
        >
          <Button.Icon scaleIcon={1.5}>
            <ChevronLeft />
          </Button.Icon>
        </Button>
        <YStack ai="center">
          <SizableText size="$6">
            {`${years[0].year} - ${years[years.length - 1].year}`}
          </SizableText>
        </YStack>
        <Button
          size="$4"
          {...swapOnClick(nextYearsButton())}
        >
          <Button.Icon scaleIcon={1.5}>
            <ChevronRight />
          </Button.Icon>
        </Button>
      </XStack>
      <XStack
        jc="center"
        ai="center"
        fw="wrap"
        gap="$2"
        animation="quick"
        enterStyle={{
          o: 0
        }}
      >
        {years.map((year) => (
          <Button
            themeInverse={year.year === Number(selectedYear)}
            br="$true"
            fs={0}
            fb={100}
            bg={
              year.year === Number(selectedYear) ? "$background" : "transparent"
            }
            key={year.$date.toString()}
            chromeless
            p={0}
            {...swapOnClick(
              yearButton(year, {
                onClick: () => {
                  setHeader("calendar");
                }
              })
            )}
          >
            <Button.Text>{year.year}</Button.Text>
          </Button>
        ))}
      </XStack>
    </YStack>
  );
}

function DatePickerBody({ onChange }) {
  const now = new Date();
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const [offsetDate, onOffsetChange] = useState<Date>(now);
  const [header, setHeader] = useState<"calendar" | "year">("calendar");

  return (
    <DatePickerProvider
      config={{
        selectedDates,
        onDatesChange: (date) => {
          console.log(date);
          onDatesChange(date)
          onChange(date)
        },
        offsetDate,
        onOffsetChange,
        dates: {
          mode: "range"
          // limit years to 2 years before and after current year
          //   minDate: new Date(Y, M - 2, 1),
          //   maxDate: new Date(Y, M + 2, 0),
        },
        calendar: {
          offsets: [-1, 1]
        }
      }}
    >
      <HeaderTypeProvider
        type={header}
        setHeader={setHeader}
      >
        <XStack gap="$3">
          {header === "calendar" && (
            <>
              <Calendar calenderIndex={1} />
            </>
          )}
          {header === "year" && <YearPicker />}
        </XStack>
      </HeaderTypeProvider>
    </DatePickerProvider>
  );
}


interface GuiRangePickerProps {
  startDate?: Date | null;
  endDate?: Date | null;
  value?: Date | null;
  onChange: any;
  selectedDate?: Date[];
}

/** ------ EXAMPLE ------ */
export function GuiRangePicker({ onChange, selectedDate }: GuiRangePickerProps) {
  const [open, setOpen] = useState(false);

  // uncomment this to limit the range of dates
  //   const M = now.getMonth()
  //   const Y = now.getFullYear()
  //   const D = now.getDate()

  return (
    <>
      <View
        f={1}
        fd="row"
        jc="center"
        ai="center"
      >
        <Button onPress={() => setOpen(true)}>Open</Button>
      </View>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={["transform", "opacity"]}
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true
                }
              }
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          >
            <Button onPress={() => setOpen(false)}>close</Button>
            <Dialog.Title>Calendar range</Dialog.Title>
            <DatePickerBody onChange={onChange} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}

GuiRangePicker.fileName = "RangePicker";
