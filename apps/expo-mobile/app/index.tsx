import { GuiButton, GuiText, GuiView, H3 } from '@uidu/native';
import { Link } from 'expo-router';
import { PixelRatio } from 'react-native';
import TextMeasure from 'rn-text-size';

const textHeight = async (text: string) => {
  const a = await TextMeasure.measure({ text: text, width: 200 });
  return a;
};

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

      <GuiButton
        onPress={async () => {
          const res = await textHeight(
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque quia amet aspernatur aliquid laboriosam eaque veniam earum voluptatibus numquam deserunt nulla, rerum saepe fuga illum dolorum odio quaerat fugiat ut omnis reiciendis ex. Possimus sint error sit, ratione soluta asperiores https://googlelalalalalalskjdhd22882264nsnsxnscbcbcbcdbcdbcd.com'
          );
          console.log(JSON.stringify(Math.ceil(res.height), null, 2));
        }}
      >
        Calculate
      </GuiButton>
    </GuiView>
  );
}
