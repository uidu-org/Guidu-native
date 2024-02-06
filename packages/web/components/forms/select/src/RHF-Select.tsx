import { FormDescription, FormField, FormItem, FormMessage } from "@uidu/form-ui";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";


export function RHFSelect({ name, control, rules, children, items, helperText, ...rest }: {
    name: string
    children?: React.ReactNode;
    control: Control;
    rules: Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >,
    items: { value: string, label: string }[]
    helperText?: string
}) {
    return (
        <FormField
            name={name}
            control={control}
            rules={rules}

            render={({ field: { name, onChange, ref, value, disabled, onBlur }, fieldState: { error } }) => (
                <FormItem>
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
                    <FormDescription >
                        {helperText}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}