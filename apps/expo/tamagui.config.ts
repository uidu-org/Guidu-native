import { config as configBase } from '@tamagui/config/v3';
import { createTamagui } from '@uidu/native';

export const tamaguiConfig = createTamagui(configBase);

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module '@uidu/native' {
  interface TamaguiCustomConfig extends Conf {}
}
