import { GuiButton, GuiText, GuiView, H3 } from '@uidu/native';
import { Link } from 'expo-router';
import { PixelRatio } from 'react-native';

export default function Screen() {
  return (
    <GuiView centered gap="$5">
      <H3>Uidu UI docs for Native</H3>
      <GuiView>
        <Link asChild href={'/docs/gui-chat'}>
          <GuiButton>Go to docs</GuiButton>
        </Link>
        <GuiText>{PixelRatio.get()}</GuiText>
      </GuiView>
    </GuiView>
  );
}
