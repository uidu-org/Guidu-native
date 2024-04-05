import { Check, X } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import { FlatList } from 'react-native'
import { Checkbox, Separator, XStack } from 'tamagui'
import { GuiText } from '../base'
import { GuiButton } from '../base/Button'
import { GuiView } from '../base/View'
import { useList } from '../lib/react-use/useList'
import { GuiSheet } from '../widget/Sheet'

type Option = {
  id: string
  label: string
  value: string
}

export type GuiMultiselectProps = {
  label: string
  control: Control
  initialItems: Option[]
  options: Option[]
  onClick: (item: any) => void
  name: string
  rules: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

export function GuiControlMultiselect({
  onClick: onItemClick,
  label,
  initialItems = [],
  control,
  name,
  rules,
  options,
}: GuiMultiselectProps) {
  const [open, setOpen] = useState(false)

  const [value, { push, removeAt }] = useList<object>(initialItems)
  const selectedItems = options.filter((o) => value.includes(o.value))

  return (
    <Controller
      key={'1'}
      control={control}
      rules={rules}
      name={name}
      render={({ field: { value = initialItems, onChange } }) => (
        <>
          <XStack>
            <GuiButton bg="transparent" onPress={() => setOpen(true)}>
              {label}
            </GuiButton>
            <GuiView fd="row">
              <GuiView fd="row" p="$2" gap="$2">
                {value.slice(0, 2).map((selectedItemForRender, index) => (
                  <GuiView
                    jc="center"
                    ai="center"
                    position="relative"
                    w={90}
                    bg="$gray6Light"
                    borderTopRightRadius={10}
                    borderBottomRightRadius={10}
                    key={`selected-item-${selectedItemForRender.id}`}
                  >
                    <GuiText numberOfLines={1} ellipsizeMode="tail">
                      {selectedItemForRender?.label || 'null'}
                    </GuiText>

                    <X
                      style={{
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: -5,
                        left: -5,
                        borderRadius: 10,
                        padding: 1,
                      }}
                      onPress={() => {
                        removeAt(index)
                        onChange(value.filter((val) => val.id !== selectedItemForRender.id))

                        onItemClick(selectedItemForRender)
                      }}
                      size="$1"
                    />
                  </GuiView>
                ))}
                {value.length - 2 > 0 && <GuiText>+ {`${selectedItems.length - 2}`}</GuiText>}
              </GuiView>
            </GuiView>
          </XStack>

          <GuiSheet setStatus={setOpen} snapPoints={[85]} status={open}>
            <GuiView>
              {value.length > 0 &&
                value.map((selectedItemForRender, index) => (
                  <>
                    <XStack jc="space-between" ai="center" p="$2.5" key={`selected-item-${index}`}>
                      <GuiText>{selectedItemForRender?.label}</GuiText>

                      <Checkbox
                        defaultChecked
                        id={selectedItemForRender?.id}
                        size="$5"
                        key={selectedItemForRender?.id}
                        p="$2"
                        onPress={async (e) => {
                          removeAt(index)
                          await onItemClick(selectedItemForRender)
                        }}
                      >
                        <Checkbox.Indicator>
                          <Check />
                        </Checkbox.Indicator>
                      </Checkbox>
                    </XStack>
                    <Separator />
                  </>
                ))}
            </GuiView>

            <GuiView h={7} bg="$gray7Light" mx="$2" borderRadius={30} my="$4" />

            <FlatList
              data={options.filter((o) => !value.includes(o.value))}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <XStack key={item.id} jc="space-between" ai="center" p="$2.5">
                      <GuiText>{item.label}</GuiText>

                      <Checkbox
                        id={item.id}
                        size="$5"
                        key={item.id}
                        p="$2"
                        onPress={(e) => {
                          push({ id: item.id })
                          // setValue('testMSelect', selectedItemsRef.current);
                          onChange([...value, item])

                          onItemClick(item)
                        }}
                      >
                        <Checkbox.Indicator>
                          <Check />
                        </Checkbox.Indicator>
                      </Checkbox>
                    </XStack>
                    <Separator />
                  </>
                )
              }}
            />
          </GuiSheet>
        </>
      )}
    />
  )
}
