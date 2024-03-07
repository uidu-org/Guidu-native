/// <reference types="react" />
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
type GuiControlTextareaProps = {
    label: string;
    control: Control;
    name: string;
    rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    placeholder?: string;
    secureTextEntry?: boolean;
};
export declare function GuiControlTextarea({ label, control, name, rules, placeholder, secureTextEntry, }: GuiControlTextareaProps): JSX.Element;
export {};
//# sourceMappingURL=TextAreaControl.d.ts.map