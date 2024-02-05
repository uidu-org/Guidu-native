import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./radio-group";


export function RHFRadioGroupItem({ name, control, rules, defaultValue, values, ...rest }: {
    name: string
    control: Control;
    rules: Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >,
    defaultValue?: string
    values: string[]
}) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { name, onChange, ref, value = defaultValue, disabled, onBlur } }) => (
                <RadioGroup
                    defaultValue={defaultValue ?? ""}
                    id={name}
                    onValueChange={onChange}
                    ref={ref}
                    value={value}
                    disabled={disabled}
                    onBlur={onBlur}
                    {...rest}
                >
                    {values.map((value, idx) => (
                        <RadioGroupItem key={`${value}-${idx}`} value={value} />
                    ))}
                </RadioGroup>
            )} />
    )
}
