import { config } from '@uidu/native-config'

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export interface Route {
  key: string
  title: string
  keywords: string
  defaultOpen: boolean
  path: string
  icon?: React.ReactNode
  subRoutes?: Route[]
}
