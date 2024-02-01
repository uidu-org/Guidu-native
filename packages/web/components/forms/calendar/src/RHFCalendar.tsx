import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import DatePicker from "./datePicker";


export function RHFCalendar({ name, control, rules, ...rest }: {
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
            render={({ field: { name, onChange, ref, value, disabled, onBlur } }) => (
                <DatePicker
                    id={name}
                    startDate={new Date()}
                    value={value}
                    placeholderText="Select Date"
                    onChange={onChange}
                    {...rest}
                />
            )} />
    )
}