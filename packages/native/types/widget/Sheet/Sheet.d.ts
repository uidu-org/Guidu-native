import { ReactNode } from 'react';
import { SheetProps } from 'tamagui';
type GuiSheetProps = SheetProps & {
    status: boolean;
    setStatus: (status: boolean) => void;
    children: ReactNode;
    snapPoints: number[];
    showHandler?: boolean;
    modal?: boolean;
};
export declare function GuiSheet({ status, setStatus, children, showHandler, snapPoints, modal, ...props }: GuiSheetProps): JSX.Element;
export {};
//# sourceMappingURL=Sheet.d.ts.map