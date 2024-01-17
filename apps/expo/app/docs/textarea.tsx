import { GuiText, GuiTextArea, GuiView } from '@my/ui'

export default function TextareaDocsPage() {
  return (
    <GuiView gap="$5" centered>
      <GuiText>This is a Basic Textarea Field</GuiText>

      <GuiTextArea w={'$20'} />
    </GuiView>
  )
}
