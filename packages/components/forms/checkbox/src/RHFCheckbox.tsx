import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@holo/form';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
import { CheckboxBase, CheckboxBaseProps } from './checkbox';

export function RHFCheckbox({
  name,
  control,
  rules,
  label,
  helperText,
  error,
  ...rest
}: CheckboxBaseProps & {
  name: string;
  control: Control;
  rules: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}) {
  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { name, onChange, ref, value, disabled, onBlur },
        fieldState: { error },
      }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <CheckboxBase
            id={name}
            onCheckedChange={onChange}
            ref={ref}
            value={value}
            disabled={disabled}
            onBlur={onBlur}
            // error={error}
            {...rest}
          />
          <FormDescription>{helperText}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
