import { GuiButton, GuiView, H3 } from '@gui/ui'
import { Link } from 'expo-router'

export default function Screen() {
  return (
    <GuiView centered gap="$5">
      <H3>Uidu UI docs for Native</H3>
      <GuiView>
        <Link asChild href={'/docs'}>
          <GuiButton>Go to docs</GuiButton>
        </Link>
      </GuiView>
    </GuiView>
  )
}
