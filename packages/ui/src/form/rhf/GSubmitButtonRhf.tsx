import { FieldValues, UseFormReturn, useFormContext } from 'react-hook-form'
import { ButtonProps } from 'tamagui'
import { GuiButton } from '../../base'

export type GuiButtonRhfProps<T extends FieldValues> = ButtonProps & {
  onSubmit: (data: T, context: UseFormReturn<T, any>) => void | Promise<void>
}

export function GSubmitButtonRhf<TFieldValues extends FieldValues = FieldValues>({
  onSubmit,
  ...props
}: GuiButtonRhfProps<TFieldValues>) {
  const formContext = useFormContext<TFieldValues>()
  const { handleSubmit, formState } = formContext
  return (
    <GuiButton
      {...(props as any)}
      onPress={handleSubmit((data) => {
        onSubmit(data, formContext)
      })}
      loading={formState.isValidating || props.loading}
    />
  )
}
