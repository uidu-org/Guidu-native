import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import { InputProps, YStack } from 'tamagui'
import { GuiInput } from '../base/Input'
import { GuiLabel } from '../base/Label'

type GuiControlInputProps = {
  label?: string
  control: Control
  name: string
  rules: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  placeholder?: string
  secureTextEntry?: boolean
  defaultValue?: string
} & InputProps

export function GuiControlInput({
  label,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
  defaultValue,
  ...rest
}: GuiControlInputProps) {
  return (
    <YStack minHeight={30}>
      {label && (
        <GuiLabel fontWeight="bold" fontSize="$5">
          {' '}
          {label}{' '}
        </GuiLabel>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, onBlur, disabled } }) => (
          <GuiInput
            style={{
              minHeight: 40,
              borderColor: 'gray',
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 5,
              fontSize: 16,
              padding: 5,
            }}
            value={value as string}
            onChangeText={onChange}
            onBlur={onBlur}
            defaultValue={defaultValue}
            disabled={!!disabled}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            // multiline
            {...rest}
          />
        )}
      />
    </YStack>
  )
}
