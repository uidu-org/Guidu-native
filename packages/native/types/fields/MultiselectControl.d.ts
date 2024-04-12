/// <reference types="react" />
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
type GuiMultiselectProps = {
    label: string;
    items: object[];
    control: Control;
    initialItems: object[];
    onClick: (item: any) => void;
    name: string;
    rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};
export declare function GuiControlMultiselect({ items: itemsFromProps, onClick: onItemClick, label, initialItems, control, name, rules, }: GuiMultiselectProps): JSX.Element;
export {};
//# sourceMappingURL=MultiselectControl.d.ts.map