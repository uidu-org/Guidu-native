import { Check, X } from '@tamagui/lucide-icons'
import { useMultipleSelection, useSelect } from 'downshift'
import { useMemo, useState } from 'react'
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import { FlatList } from 'react-native'
import { Checkbox, Separator, Sheet, XStack } from 'tamagui'
import { GuiButton } from './Button'
import { GuiText } from './Text'
import { GuiView } from './View'

export function GuiMultiselect({
  items: itemsFromProps,
  onClick: onItemClick,
  label,
  initialItems = [],
  control,
  name,
  rules,
}: {
  label: string
  items: object[]
  control: Control
  initialItems: object[]
  onClick: (item: any) => void

  name: string
  rules: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}) {
  const [open, setOpen] = useState(false)
  const memoSnapPoints = useMemo(() => [85], [])

  function getArrayFilter(selectedUsers) {
    return function booksFilter(book) {
      return selectedUsers.indexOf(book) < 0
    }
  }

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: initialItems })

  const items = itemsFromProps.filter(getArrayFilter(selectedItems)) || []

  const {
    // selectedItem,
    getToggleButtonProps,
    // getLabelProps,
    getMenuProps,
    // highlightedIndex,
    getItemProps,
  } = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0,
    items,
    onStateChange: ({ type, selectedItem: newSelectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.ToggleButtonBlur:
          if (newSelectedItem) {
            addSelectedItem(newSelectedItem)
          }
          break
        default:
          break
      }
    },
  })

  // console.log('ITEMS ==>', JSON.stringify(initialItems, null, 2));

  return (
    <Controller
      key={'1'}
      control={control}
      rules={rules}
      name={name}
      render={({ field: { value = initialItems, onChange } }) => (
        <>
          <XStack>
            <GuiButton {...getToggleButtonProps()} bg="transparent" onPress={() => setOpen(true)}>
              {label}{' '}
            </GuiButton>
            <GuiView fd="row">
              <GuiView fd="row" p="$2" gap="$2">
                {selectedItems.slice(0, 2).map((selectedItemForRender, index) => (
                  <GuiView
                    jc="center"
                    ai="center"
                    position="relative"
                    w={90}
                    bg="$gray6Light"
                    borderTopRightRadius={10}
                    borderBottomRightRadius={10}
                    key={`selected-item-${selectedItemForRender.id}`}
                    {...getSelectedItemProps({
                      selectedItem: selectedItemForRender,
                      index,
                    })}
                  >
                    <GuiText numberOfLines={1} ellipsizeMode="tail">
                      {selectedItemForRender?.name || 'null'}
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
                        removeSelectedItem(selectedItemForRender)
                        // setValue('testMSelect', selectedItems);
                        onChange(value.filter((val) => val.id !== selectedItemForRender.id))

                        onItemClick(selectedItemForRender)
                      }}
                      size="$1"
                    />
                  </GuiView>
                ))}
                {selectedItems.length - 2 > 0 && (
                  <GuiText>+ {`${selectedItems.length - 2}`}</GuiText>
                )}
              </GuiView>
            </GuiView>
          </XStack>

          <Sheet
            forceRemoveScrollEnabled={open}
            modal
            open={open}
            onOpenChange={setOpen}
            snapPoints={memoSnapPoints}
            dismissOnSnapToBottom
            zIndex={9999999}
            animation="medium"
            {...getDropdownProps()}
          >
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <Sheet.Handle />
            <Sheet.Frame
              // style={{
              //   display: open ? 'flex' : 'none',
              // }}
              {...getMenuProps()}
            >
              <GuiView>
                {selectedItems.length > 0 &&
                  selectedItems.map((selectedItemForRender, index) => (
                    <>
                      <XStack
                        jc="space-between"
                        ai="center"
                        p="$2.5"
                        key={`selected-item-${index}`}
                        {...getSelectedItemProps({
                          selectedItem: selectedItemForRender,
                          index,
                        })}
                      >
                        <GuiText>{selectedItemForRender?.name}</GuiText>

                        <Checkbox
                          defaultChecked
                          id={selectedItemForRender?.id}
                          size="$5"
                          key={selectedItemForRender?.id}
                          p="$2"
                          onPress={async (e) => {
                            e.stopPropagation()
                            removeSelectedItem(selectedItemForRender)
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
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  const {
                    'aria-selected': ariaSelected,
                    onMouseMove,
                    onMouseDown,
                    onClick,
                    onPress,
                    ...rest
                  } = getItemProps({
                    item,
                    index,
                  })

                  return (
                    <>
                      <XStack key={item.id} jc="space-between" ai="center" p="$2.5">
                        <GuiText>{item.name}</GuiText>

                        <Checkbox
                          id={item.id}
                          size="$5"
                          key={item.id}
                          p="$2"
                          onPress={async (e) => {
                            onPress(e)
                            // setValue('testMSelect', selectedItemsRef.current);

                            onChange([...value, item])

                            await onItemClick(item)
                          }}
                          {...rest}
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
            </Sheet.Frame>
          </Sheet>
        </>
      )}
    />
  )
}
