import { X } from '@tamagui/lucide-icons'
import { ReactNode } from 'react'
import {
    Button,
    Dialog,
    DialogDescriptionProps,
    DialogProps,
    DialogTitleProps,
    Unspaced,
} from 'tamagui'

type GuiDialogueProps = DialogProps & {
    status: boolean
    setStatus: (status: boolean) => void
    children: ReactNode
    minHeight?: number
}

export const GuiDialog = ({
    children,
    setStatus,
    status,
    minHeight = 350,
    ...props
}: GuiDialogueProps) => (
    <Dialog
        modal
        onOpenChange={(open) => {
            setStatus(open)
        }}
        open={status}
        {...props}
    >
        <Dialog.Portal>
            <Dialog.Overlay
                key="overlay"
                animation="bouncy"
                opacity={0.5}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                onPress={() => setStatus(false)}
            />
            <Dialog.Content
                bordered
                elevate
                maxWidth={500}
                minHeight={minHeight}
                width={'90%'}
                key="content"
                animateOnly={['transform', 'opacity']}
                animation={[
                    'quick',
                    {
                        opacity: {
                            overshootClamping: true,
                        },
                    },
                ]}
                enterStyle={{ x: 0, y: 200, opacity: 0 }}
                exitStyle={{ x: 0, y: 200, opacity: 0 }}
                gap="$4"
            >
                {children}
                <Unspaced>
                    <Dialog.Close asChild>
                        <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
                    </Dialog.Close>
                </Unspaced>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog>
)

type GuiDialogueTitleProps = DialogTitleProps & {
    children: ReactNode
}

export const GuiDialogTitle = ({ children }: GuiDialogueTitleProps) => (
    <Dialog.Title>{children}</Dialog.Title>
)

type GuiDialogueDescriptionProps = DialogDescriptionProps & {
    children: ReactNode
}

export const GuiDialogueDescription = ({ children }: GuiDialogueDescriptionProps) => (
    <Dialog.Description>{children}</Dialog.Description>
)
