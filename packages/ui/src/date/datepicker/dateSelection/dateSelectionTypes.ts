import { LmSelectProps } from '@tamagui-extras/form'

export type InputSelectorProps = Omit<LmSelectProps, 'options'>
export type DaysForLocaleProps = {
  localeName?: string
  month?: 'short' | 'long' | 'narrow' | 'numeric' | '2-digit'
}
