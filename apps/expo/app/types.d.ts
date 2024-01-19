import { config } from '@uidu/native-config'

export type Conf = typeof config

declare module '@uidu/native' {
  interface TamaguiCustomConfig extends Conf {}
}
