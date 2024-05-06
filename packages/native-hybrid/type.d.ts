// @ts-expect-error
import { config } from '@uidu/native-config/src/tamagui.config';

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
