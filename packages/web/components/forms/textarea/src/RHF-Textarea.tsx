import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Textarea, TextareaProps } from "./textarea";


export function RHFTextarea({ name, control, rules, ...rest }: TextareaProps & {
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
                <Textarea
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
