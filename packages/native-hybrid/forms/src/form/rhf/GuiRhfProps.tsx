import { ControllerProps, FieldValues } from 'react-hook-form'

export type GuiRhfProps<TFieldValues extends FieldValues> = Pick<
  ControllerProps<TFieldValues>,
  'defaultValue' | 'control' | 'rules' | 'name'
>
