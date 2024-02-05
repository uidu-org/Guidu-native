import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";


export function RHFSelect({ name, control, rules, children, items, ...rest }: {
    name: string
    children?: React.ReactNode;
    control: Control;
    rules: Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >,
    items: { value: string, label: string }[]
}) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { name, onChange, ref, value, disabled, onBlur } }) => (
                <Select
                    name={name}
                    required={!!rules.required}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                    {...rest}
                >
                    <SelectTrigger asChild={!!children && true} >
                        {children ?? <SelectValue placeholder="Theme" />}
                    </SelectTrigger>
                    <SelectContent >
                        {items.map((item, idx) => (
                            <SelectItem ref={ref} onBlur={onBlur} key={`${item.value}-${idx}`} value={item.value} >{item.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )} />
    )
}