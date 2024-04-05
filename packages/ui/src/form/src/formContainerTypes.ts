import { LabelProps, ParagraphProps, ThemeableStackProps } from 'tamagui'

export type GuiFormContainerBaseTypes = {
  label?: string
  labelProps?: Omit<LabelProps, 'htmlFor' | 'ref'>
  labelInline?: boolean
  helperText?: string
  helperTextProps?: ParagraphProps
  required?: boolean
  error?: boolean
  containerProps?: ThemeableStackProps
}
