import { ReactNode } from 'react';
import { DialogDescriptionProps, DialogProps, DialogTitleProps } from 'tamagui';
type GuiDialogueProps = DialogProps & {
    status: boolean;
    setStatus: (status: boolean) => void;
    children: ReactNode;
    minHeight?: number;
};
export declare const GuiDialog: ({ children, setStatus, status, minHeight, ...props }: GuiDialogueProps) => JSX.Element;
type GuiDialogueTitleProps = DialogTitleProps & {
    children: ReactNode;
};
export declare const GuiDialogTitle: ({ children }: GuiDialogueTitleProps) => JSX.Element;
type GuiDialogueDescriptionProps = DialogDescriptionProps & {
    children: ReactNode;
};
export declare const GuiDialogueDescription: ({ children }: GuiDialogueDescriptionProps) => JSX.Element;
export {};
//# sourceMappingURL=Dialog.d.ts.map