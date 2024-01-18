import { GuiText, GuiView } from '@gui/ui'

export default function ViewDocsPage() {
  return (
    <GuiView centered>
      <GuiText>View is used on React-Native but is like a div on HTML</GuiText>
      <GuiText>This Square below is an Example</GuiText>

      <GuiView mt={'$5'} p={'$5'} bg={'$green9Light'} w={'$15'} h={'$15'}>
        <GuiView p={'$5'} bg={'$blue9Light'} w={'100%'} h={'100%'}>
          <GuiView bg={'$red6Light'} w={'100%'} h={'100%'} />
        </GuiView>
      </GuiView>
    </GuiView>
  )
}
