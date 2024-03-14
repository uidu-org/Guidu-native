import { GuiButton, GuiText, GuiView } from '@uidu/native';
import { useState } from 'react';

export default function ButtonDocsPage() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <GuiView centered>
      <GuiText>This is a Button</GuiText>
      <GuiView>
        <GuiButton onPress={() => setIsVisible((prev) => !prev)}>Press me</GuiButton>
      </GuiView>
      {isVisible ? <GuiText>Visible</GuiText> : <GuiText>NOT Visible</GuiText>}
    </GuiView>
  );
}
