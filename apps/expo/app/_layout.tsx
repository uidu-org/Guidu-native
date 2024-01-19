import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { config } from '@uidu/native-config'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'

export default function HomeLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })
  const scheme = useColorScheme()

  if (!loaded) {
    return null
  }
  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config}>
        <Slot />
      </TamaguiProvider>
    </ThemeProvider>
  )
}
