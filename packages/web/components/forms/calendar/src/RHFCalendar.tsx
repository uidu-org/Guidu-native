import type { ReactDatePickerProps } from "react-datepicker";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import DatePicker from "./datePicker";

interface DatePickerProps
    extends Omit<ReactDatePickerProps, "selectsRange" | "onChange"> {
}

export function RHFCalendar({ name, control, rules, dateFormat = "d MMMM yyyy", ...rest }: DatePickerProps & {
    name: string
    control: Control;
    rules: Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
}) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { name, onChange, ref, value = "", disabled, onBlur } }) => (
                <DatePicker
                    id={name}
                    startDate={new Date()}
                    value={value}
                    placeholderText="Select Date_"
                    onChange={onChange}
                    dateFormat={"d MMMM yyyy, h:mm aa"}
                    {...rest}
                />
            )} />
    )
}