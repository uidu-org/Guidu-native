import * as Select from '@radix-ui/react-select'
import React from 'react'
import { useList } from 'react-use'
import CheckIcon from './icons/Check'
import ChevronDownIcon from './icons/ChevronDown'
import ChevronUpIcon from './icons/ChevronUp'

type Option = {
  id: string
  label: string
  value: string
}
type MultiselectProps = {
  options: Option[]
  initialItems: Option[]
}

const Multiselect: React.FC<MultiselectProps> = ({ options, initialItems }) => {
  const [value, { push, removeAt }] = useList<string>(initialItems.map((i) => i.id))
  const selectedItems = options.filter((o) => value.includes(o.value))

  return (
    <>
      <Select.Root
        onValueChange={(v) => {
          push(v)
        }}
      >
        <Select.Value
          style={{
            display: 'none',
            backgroundColor: 'blue',
          }}
        />

        <Select.Trigger
          aria-label="Food"
          className="inline-flex items-center justify-center gap-1 px-4 text-xs font-semibold leading-4 transition-all duration-300 ease-in-out bg-white rounded-md shadow-md h-9 text-violet-11 focus:outline-none focus:ring focus:border-violet-11 hover:bg-mauve-3 focus:shadow-outline"
        >
          <Select.Icon className="w-5 text-purple-500 ">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="p-2 overflow-hidden bg-white rounded-lg shadow-xl">
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              <Select.Group className="p-1 border border-black rounded-lg">
                <Select.Label className="px-6 text-lg font-bold leading-6 rounded-lg bg-zinc-200">
                  Fruits
                </Select.Label>
                {options.map((o, idx) => (
                  <Select.Item
                    key={`${o.value}-${idx}`}
                    value={o.value}
                    className="flex items-center justify-between p-1"
                  >
                    <Select.ItemText>{o.label}</Select.ItemText>
                    <Select.ItemIndicator className="flex items-center justify-center p-1 border border-black rounded-md">
                      <CheckIcon className="w-4 h-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default text-violet-11">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div className="p-2 bg-emerald-600">
        {selectedItems.map((item, idx) => (
          <button key={idx} onClick={() => removeAt(idx)}>
            | {options.find((o) => o.value === item.value)?.label}
          </button>
        ))}
      </div>
    </>
  )
}

export { Multiselect }
