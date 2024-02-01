import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { CheckboxBase, CheckboxBaseProps } from "./checkbox";


export function RHFCheckbox({ name, control, rules, ...rest }: CheckboxBaseProps & {
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
                <CheckboxBase
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