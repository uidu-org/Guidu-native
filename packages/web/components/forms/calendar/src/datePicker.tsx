
import { Input, InputProps } from "@uidu/input-ui";
import { cn } from "@uidu/lib";
import { useState } from "react";
import type { ReactDatePickerProps } from "react-datepicker";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "./icons/Calendar";
import ChevronDownIcon from "./icons/ChevronDown";

const calendarContainerStyles = {
    base: "[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md",
    monthContainer: {
        padding: "[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3",
    },
};

const prevNextButtonStyles = {
    base: "[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7",
    border:
        "[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-muted [&.react-datepicker>button]:rounded-md",
    size: "[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px]",
    children: {
        position: "[&.react-datepicker>button>span]:top-0",
        border:
            "[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-muted",
        size: "[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]",
    },
};

const timeOnlyStyles = {
    base: "[&.react-datepicker--time-only>div]:pr-0 [&.react-datepicker--time-only>div]:w-28",
};

export interface DatePickerProps<selectsRange extends boolean | undefined>
    extends Omit<ReactDatePickerProps, "selectsRange" | "onChange"> {
    onChange(
        date: selectsRange extends false | undefined
            ? Date | null
            : [Date | null, Date | null],
        event: React.SyntheticEvent<any> | undefined
    ): void;
    selectsRange?: selectsRange;
    inputProps?: InputProps;
}

const DatePicker = ({
    customInput,
    showPopperArrow = false,
    dateFormat = "yyyy",
    selectsRange = false,
    onCalendarOpen,
    onCalendarClose,
    inputProps,
    calendarClassName,
    ...props
}: DatePickerProps<boolean>) => {
    const [isCalenderOpen, setIsCalenderOpen] = useState(false);
    const handleCalenderOpen = () => setIsCalenderOpen(true);
    const handleCalenderClose = () => setIsCalenderOpen(false);
    return (
        <ReactDatePicker
            customInput={
                customInput || (
                    <Input
                        prefix={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                        suffix={
                            <ChevronDownIcon
                                className={cn(
                                    "h-4 w-4 text-gray-500 transition",
                                    isCalenderOpen && "rotate-180"
                                )}
                            />
                        }
                        {...inputProps}
                    />
                )
            }
            showPopperArrow={showPopperArrow}
            dateFormat={"yyyy"}
            selectsRange={selectsRange}
            onCalendarOpen={onCalendarOpen || handleCalenderOpen}
            onCalendarClose={onCalendarClose || handleCalenderClose}
            calendarClassName={cn(
                calendarContainerStyles.base,
                calendarContainerStyles.monthContainer.padding,
                prevNextButtonStyles.base,
                prevNextButtonStyles.border,
                prevNextButtonStyles.size,
                prevNextButtonStyles.children.position,
                prevNextButtonStyles.children.border,
                prevNextButtonStyles.children.size,
                timeOnlyStyles.base,
                calendarClassName
            )}
            {...props}
        />
    );
};

DatePicker.displayName = "DatePicker";
export default DatePicker;

