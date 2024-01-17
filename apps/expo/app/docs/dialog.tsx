import { GuiButton, GuiDialog, GuiDialogTitle, GuiDialogueDescription, GuiView } from '@my/ui'
import { useState } from 'react'

export default function DialogDocsPage() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <GuiView centered>
      <GuiView>
        <GuiButton onPress={() => setIsVisible((prev) => !prev)}>Press me!</GuiButton>
      </GuiView>
      <GuiDialog setStatus={setIsVisible} status={isVisible}>
        <GuiDialogTitle>Questo è un Dialog</GuiDialogTitle>
        <GuiDialogueDescription>
          E questa una breve description del contenuto, il dialog è un componente molto versatile
          con la propietà "minHeight" puoi faro sembrare anche un piccolo toast!
        </GuiDialogueDescription>
      </GuiDialog>
    </GuiView>
  )
}
