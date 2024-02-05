
import * as Select from '@radix-ui/react-select';
import React from 'react';
import { useList } from "react-use";
import CheckIcon from './icons/Check';
import ChevronDownIcon from './icons/ChevronDown';
import ChevronUpIcon from './icons/ChevronUp';


type Option = {
  id: string
  label: string;
  value: string;
};
type MultiselectProps = {
  options: Option[];
  initialItems: Option[]
};

const Multiselect: React.FC<MultiselectProps> = ({ options, initialItems }) => {


  const [value, { push, removeAt }] = useList<string>(initialItems.map((i) => i.id));
  const selectedItems = options.filter((o) => value.includes(o.value))

  return (
    <>
      <Select.Root onValueChange={(v) => {
        push(v)
      }}
      >
        <Select.Value style={{
          display: 'none',
          backgroundColor: "blue"
        }} />

        <Select.Trigger aria-label="Food" className='inline-flex items-center justify-center rounded-md px-4 font-semibold text-xs leading-4 h-9 gap-1 bg-white text-violet-11 shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring focus:border-violet-11 hover:bg-mauve-3 focus:shadow-outline'>
          <Select.Icon className="text-purple-500 w-5 ">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-lg shadow-xl p-2">
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              <Select.Group className='border border-black p-1 rounded-lg' >
                <Select.Label className="px-6 leading-6 bg-zinc-200 rounded-lg font-bold text-lg">Fruits</Select.Label>
                {options.map((o, idx) => (
                  <Select.Item key={`${o.value}-${idx}`} value={o.value} className='flex justify-between items-center p-1' >
                    <Select.ItemText>{o.label}</Select.ItemText>
                    <Select.ItemIndicator className='flex items-center justify-center border border-black p-1 rounded-md' >
                      <CheckIcon className='w-4 h-4' />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>


            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-violet-11 cursor-default">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>


      <div className='bg-emerald-600 p-2'>

        {selectedItems.map((item, idx) => (
          <button key={idx} onClick={() => removeAt(idx)}>
            | {options.find((o) => o.value === item.value)?.label}
          </button>
        ))}
      </div>
    </>
  )
};

export { Multiselect };
