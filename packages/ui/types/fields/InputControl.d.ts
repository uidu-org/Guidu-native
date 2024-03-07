/// <reference types="react" />
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
import { InputProps } from 'tamagui';
type GuiControlInputProps = {
    label?: string;
    control: Control;
    name: string;
    rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    placeholder?: string;
    secureTextEntry?: boolean;
    defaultValue?: string;
} & InputProps;
export declare function GuiControlInput({ label, control, name, rules, placeholder, secureTextEntry, defaultValue, ...rest }: GuiControlInputProps): JSX.Element;
export {};
//# sourceMappingURL=InputControl.d.ts.map