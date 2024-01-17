import { ReactNode } from 'react'
import {
  SafeAreaView as NativeSafeAreaView,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { SafeAreaViewProps } from 'react-native-safe-area-context'

interface GuiSafeAreaView extends SafeAreaViewProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export function GuiSafeAreaView({ children, style: styleFromProps, ...props }: GuiSafeAreaView) {
  return (
    <NativeSafeAreaView style={[AndroidFix.AndroidSafeArea, styleFromProps]} {...props}>
      {children}
    </NativeSafeAreaView>
  )
}

const AndroidFix = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
