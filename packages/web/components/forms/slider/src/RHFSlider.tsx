import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Slider, SliderProps } from "./slider";


export function RHFSlider({ name, control, rules, ...rest }: SliderProps & {
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
                <Slider
                    id={name}
                    onValueChange={onChange}
                    ref={ref}
                    value={value}
                    disabled={disabled}
                    onBlur={onBlur}
                    {...rest}
                />
            )} />
    )
}
