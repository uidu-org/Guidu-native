import { GuiInput, GuiText, GuiView } from '@my/ui'

export default function InputDocsPage() {
  return (
    <GuiView gap="$5" centered>
      <GuiText>This is a Basic Input Field</GuiText>

      <GuiInput w={'$10'} />
    </GuiView>
  )
}
