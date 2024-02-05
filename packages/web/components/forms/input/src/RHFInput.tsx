import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@uidu/form-ui";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { Input, InputProps } from "./index";


export function RHFInput({ name, control, rules, label, helperText, error, ...rest }: InputProps & {
    name: string
    control: Control;
    rules: Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >,

}) {
    return (
        <FormField
            name={name}
            control={control}
            rules={rules}
            render={({ field: { name, onChange, ref, value = "", disabled, onBlur }, fieldState: { error } }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Input
                        id={name}
                        onChange={onChange}
                        ref={ref}
                        value={value}
                        disabled={disabled}
                        onBlur={onBlur}
                        // error={error}
                        {...rest}
                    />
                    <FormDescription>
                        {helperText}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
    )
}
