import { ReactNode } from 'react'
import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'

export type GuiFormRhfProviderProps<T extends FieldValues = FieldValues> = UseFormProps<T> & {
  children: ((context: UseFormReturn<T>) => ReactNode) | ReactNode
  forceFormProvider?: boolean
}

export function GFormRhfProvider<T extends FieldValues = FieldValues>({
  children,
  forceFormProvider,
  ...formProps
}: GuiFormRhfProviderProps<T>) {
  const methods = useForm<T>({
    ...formProps,
  })
  return typeof children === 'function' ? (
    forceFormProvider ? (
      <FormProvider {...methods}>{children(methods)}</FormProvider>
    ) : (
      <>{children(methods)}</>
    )
  ) : (
    <FormProvider {...methods}>{children}</FormProvider>
  )
}
