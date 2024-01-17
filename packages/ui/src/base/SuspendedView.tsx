import { ReactNode, Suspense } from 'react'
import { Spinner } from 'tamagui'
import { GuiView } from './View'

export function GuiSuspendedView({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <GuiView flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$green10" />
        </GuiView>
      }
    >
      {children}
    </Suspense>
  )
}
