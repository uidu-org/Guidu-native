import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import { YStack } from 'tamagui'
import { GuiLabel } from '../base'
import { GuiTextArea } from '../base/Textarea'

type GuiControlTextareaProps = {
  label: string
  control: Control
  name: string
  rules: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  placeholder?: string
  secureTextEntry?: boolean
}

export function GuiControlTextarea({
  label,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
}: GuiControlTextareaProps) {
  return (
    <YStack>
      <GuiLabel fontWeight="bold" fontSize="$5">
        {' '}
        {label}{' '}
      </GuiLabel>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur, disabled } }) => (
          <GuiTextArea
            style={{
              minHeight: 60,
              borderColor: 'gray',
              borderWidth: 1,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 5,
              fontSize: 16,
            }}
            value={value as string}
            onChangeText={onChange}
            onBlur={onBlur}
            disabled={disabled}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
          />
        )}
      />
    </YStack>
  )
}
