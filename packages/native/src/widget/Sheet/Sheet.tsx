import { ReactNode, useMemo } from 'react'
import { Sheet, SheetProps } from 'tamagui'

type GuiSheetProps = SheetProps & {
  status: boolean
  setStatus: (status: boolean) => void
  children: ReactNode
  snapPoints: number[]
  showHandler?: boolean
  modal?: boolean
}

export function GuiSheet({
  status,
  setStatus,
  children,
  showHandler = true,
  snapPoints = [60],
  modal = true,
  ...props
}: GuiSheetProps) {
  const memoSnapPoints = useMemo(() => snapPoints, [snapPoints])

  return (
    <Sheet
      open={status}
      modal={modal}
      onOpenChange={() => setStatus(false)}
      dismissOnSnapToBottom
      snapPoints={memoSnapPoints}
      animationConfig={{
        type: 'spring',
        damping: 20,
        mass: 1.2,
        stiffness: 250,
      }}
      {...props}
    >
      {showHandler && <Sheet.Handle />}
      <Sheet.Frame>{children}</Sheet.Frame>
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
    </Sheet>
  )
}
