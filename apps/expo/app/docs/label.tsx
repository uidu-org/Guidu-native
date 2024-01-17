import { Fieldset, GuiInput, GuiLabel, GuiText, GuiView } from '@my/ui'

export default function LabelDocumentsPage() {
  return (
    <GuiView gap="$5" centered>
      <GuiText>This is a Label with an Input Field</GuiText>
      <Fieldset flexDirection="row" w={'auto'} gap="$3">
        <GuiLabel>Input Field</GuiLabel>
        <GuiInput w={'$10'} />
      </Fieldset>
    </GuiView>
  )
}
