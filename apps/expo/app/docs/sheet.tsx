import { GuiButton, GuiSheet, GuiText, GuiView } from '@uidu/native'
import { useState } from 'react'

export default function SheetDocsPage() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <GuiView centered>
      <GuiView>
        <GuiButton onPress={() => setIsVisible((prev) => !prev)}>Press me!</GuiButton>
      </GuiView>

      <GuiSheet setStatus={setIsVisible} status={isVisible} snapPoints={[50]}>
        <GuiView centered>
          <GuiText fontSize={'$8'}>Awesome! you opened a Sheet</GuiText>
          <GuiText fontSize={'$4'} px="$5">
            Remember you can pass all props of Tamagui Sheet, snapPoint too!{' '}
          </GuiText>

          <GuiView>
            <GuiButton mt="$5" onPress={() => setIsVisible((prev) => !prev)}>
              Close Sheet
            </GuiButton>
          </GuiView>
        </GuiView>
      </GuiSheet>
    </GuiView>
  )
}
