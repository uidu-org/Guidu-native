import { GuiButton, GuiInput, GuiText, GuiView } from '@my/ui'
import { Link, Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <GuiButton>GuiButton User Page</GuiButton>
      <GuiInput></GuiInput>
      <GuiView flex={1}>
        <GuiText>Ciao</GuiText>
        <Link href={'/docs'}>Go to docs</Link>
      </GuiView>
    </>
  )
}
