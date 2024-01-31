import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Input, InputProps } from "./index";


export function RHFInput({ name, control, rules, ...rest }: InputProps & {
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
                <Input
                    id={name}
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    disabled={disabled}
                    onBlur={onBlur}
                    {...rest}
                />
            )} />
    )
}
