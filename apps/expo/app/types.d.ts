import { config } from '@gui-native/config'

export type Conf = typeof config

declare module '@gui-native/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
