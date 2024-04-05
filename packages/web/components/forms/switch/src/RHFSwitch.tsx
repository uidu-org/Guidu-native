import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Switch, SwitchProps } from "./switch";


export function RHFSwitch({ name, control, rules, ...rest }: SwitchProps & {
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
                <Switch
                    id={name}
                    onCheckedChange={onChange}
                    ref={ref}
                    value={value}
                    disabled={disabled}
                    onBlur={onBlur}
                    {...rest}
                />
            )} />
    )
}
