import { ReactNode } from 'react';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
type GuiControlSelectProps = {
    label: string;
    control: Control;
    name: string;
    rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    children: ReactNode;
    defaultValue?: string;
    placeholder: string;
    isBox?: boolean;
};
export declare function GuiControlSelect({ label, control, name, rules, children, placeholder, isBox, defaultValue, }: GuiControlSelectProps): JSX.Element;
export {};
//# sourceMappingURL=SelectControl.d.ts.map