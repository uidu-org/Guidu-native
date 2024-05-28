import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { Toggle } from './toggle';

export function RHFToggle({
  name,
  control,
  rules,
  ...rest
}: {
  name: string;
  control: Control;
  rules: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { name, onChange, ref, value = '', disabled, onBlur },
      }) => (
        <Toggle
          id={name}
          onPressedChange={onChange}
          ref={ref}
          value={value}
          disabled={disabled}
          onBlur={onBlur}
          {...rest}
        />
      )}
    />
  );
}
