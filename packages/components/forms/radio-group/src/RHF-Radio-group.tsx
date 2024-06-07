import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@holo/form';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from './radio-group';

export function RHFRadioGroup({
  name,
  control,
  rules,
  defaultValue,
  values,
  label,
  helperText,
  ...rest
}: {
  name: string;
  control: Control;
  rules: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  defaultValue?: string;
  values: string[];
  label?: string;
  helperText?: string;
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
          <RadioGroup
            defaultValue={defaultValue ?? ''}
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
          <FormDescription>{helperText}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
