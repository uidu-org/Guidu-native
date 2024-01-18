import { config } from '@gui/config'

export type Conf = typeof config

declare module '@gui/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
