import {
  LmPopover,
  LmPopoverProps,
  usePopoverState,
} from "@tamagui-extras/core"
import { forwardRef, useDeferredValue, useEffect, useId, useRef, useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import {
  Button,
  Input,
  ListItem,
  ListItemTitle,
  ScrollView,
  SizeTokens,
  ThemeName,
  XGroup,
  XStack,
  YGroup,
  YStack,
} from 'tamagui'
import {
  CaretDownRegular,
  CheckSquareRegular,
  ListPlusRegular,
  SquareRegular,
} from '../content/icons'
import { GFormFieldContainer } from './GuiFormFieldContainer'
import { GuiFormContainerBaseTypes } from './formContainerTypes'

type Option = { label: string; value: string | number }
export type GuiAutocompleteProps = GuiFormContainerBaseTypes & {
  options: Option[]
  initialOptions?: Option[]
  multiple?: boolean
  value?: null | Option | Option[]
  onChange?: (v: null | Option | Option[]) => void
  placeholderSearch?: string
  disableSearch?: boolean
  theme?: ThemeName
  allowNew?: boolean
  allowNewHook?: (newValue: string) => Option
  popoverProps?: LmPopoverProps
  size?: SizeTokens
  bgItemList?: string
}

type AutocompleteContext = {
  onChangeSelection: (option: Option) => void
  isSelected: (opts: Option) => boolean
}

type ConditionalOption<T extends boolean> = T extends true ? Option[] : Option

export function GAutocomplete({
  options,
  initialOptions,
  labelInline,
  labelProps,
  helperText,
  helperTextProps,
  required,
  label,
  value,
  onChange,
  error,
  theme,
  allowNewHook,
  multiple = false,
  popoverProps,
  containerProps,
  size,
  bgItemList,
  ...rest
}: GuiAutocompleteProps) {
  const id = useId()
  const [opts, setOpts] = useState(options)
  const { width } = useWindowDimensions()
  const popoverState = usePopoverState()
  const [popoverWidth, setPopoverWidth] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [selection, setSelection] = useState<ConditionalOption<typeof multiple> | null>(
    value ?? (multiple ? [] : null)
  )
  const isSelected = (item: Option) =>
    Array.isArray(selection)
      ? !!selection?.some((i) => i.value === item.value)
      : selection?.value === item.value

  const onChangeSelection = (item: Option) => {
    let newVal: ConditionalOption<typeof multiple> | null = null
    if (multiple) {
      const has = isSelected(item)
      newVal = has
        ? (selection as Option[])?.filter((i) => i.value !== item.value) ?? []
        : [...((selection as Option[]) ?? []), item]
    } else {
      newVal = isSelected(item) ? null : item
    }
    setSelection(newVal)
    if (typeof onChange === 'function') {
      onChange(newVal)
    }
  }

  useEffect(() => {
    const elWidth = inputRef.current?.offsetWidth
    if (elWidth) {
      setPopoverWidth(elWidth)
    }
  }, [width])

  useEffect(() => {
    if (popoverState.open) {
      searchInputRef.current?.focus?.() // set the focus on the search input field
    }
  }, [popoverState.open])

  const inputValue = Array.isArray(selection)
    ? selection.map((option) => option?.label).join(', ')
    : selection?.label || ''

  return (
    <GFormFieldContainer
      id={id}
      error={error}
      required={required}
      labelProps={labelProps}
      label={label}
      labelInline={labelInline}
      helperText={helperText}
      helperTextProps={helperTextProps}
      size={size}
      {...containerProps}
    >
      <XGroup ref={inputRef}>
        <XGroup.Item>
          <Input
            flex={1}
            value={inputValue}
            size={size}
            theme={theme}
            textOverflow={'ellipsis'}
            onFocus={(el) => {
              popoverState.onOpenChange(!popoverState.open)
              // @ts-ignore
              el.target.blur?.()
            }}
          />
        </XGroup.Item>
        <XGroup.Item>
          <LmPopover
            isBouncy
            {...popoverProps}
            {...popoverState}
            offset={{
              // alignmentAxis: 20,
              mainAxis: 15,
              crossAxis: -30,
            }}
            contentProps={{
              minWidth: popoverWidth ? popoverWidth : undefined,
              maxWidth: '100%',
              ...popoverProps?.contentProps,
            }}
            trigger={
              <Button
                size={size}
                icon={<CaretDownRegular />}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
              />
            }
          >
            <LmAutocompleteInputContent
              ref={searchInputRef}
              theme={theme}
              options={opts}
              isSelected={isSelected}
              onChangeSelection={onChangeSelection}
              bgItemList={bgItemList}
              onAddNew={(newVal) => {
                if (newVal) {
                  const newItem =
                    typeof allowNewHook === 'function'
                      ? allowNewHook(newVal)
                      : {
                        value: newVal,
                        label: newVal,
                      }
                  setOpts((oldVal) => [newItem, ...oldVal])
                }
              }}
              {...rest}
            />
          </LmPopover>
        </XGroup.Item>
      </XGroup>
    </GFormFieldContainer>
  )
}

type LmAutocompleteInputContentProps = GuiAutocompleteProps &
  AutocompleteContext & {
    onAddNew: (str: string) => void
  }

const LmAutocompleteInputContent = forwardRef(function LmAutocompleteInputContentEl(
  {
    disableSearch,
    theme,
    placeholderSearch,
    options,
    allowNew,
    onAddNew,
    onChangeSelection,
    isSelected,
    bgItemList
  }: LmAutocompleteInputContentProps,
  ref
) {
  const [searchTerm, setSearchTerm] = useState<string>()
  const deferredTerm = useDeferredValue(searchTerm)
  const filteredOptions = deferredTerm?.length
    ? options.filter((i) => i.label.toLowerCase().includes(deferredTerm))
    : options
  const showSearch = !disableSearch || allowNew
  return (
    <>
      {Platform.OS === 'web' ? (
        <>
          {showSearch && (
            <XStack padding={'$4'} width={'100%'}>
              <Input
                theme={theme}
                placeholder={placeholderSearch}
                width={'100%'}
                ref={ref as any}
                onChangeText={(text) => {
                  setSearchTerm(text.toLowerCase())
                }}
              />
            </XStack>
          )}
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            maxHeight={300}
            width={'100%'}
            marginTop={!showSearch ? '$4' : undefined}
            marginBottom={'$4'}
          >
            <LmAutocompleteList
              options={filteredOptions}
              onChangeSelection={onChangeSelection}
              isSelected={isSelected}
            />
            {allowNew && !filteredOptions?.length && deferredTerm && (
              <XStack justifyContent={'flex-start'} marginBottom={'$3'} marginLeft={'$3'}>
                <Button
                  onPress={() => onAddNew(deferredTerm)}
                  chromeless
                  icon={<ListPlusRegular />}
                >
                  {deferredTerm}
                </Button>
              </XStack>
            )}
          </ScrollView>
        </>
      ) : (
        <YStack>
          {showSearch && (
            <XStack padding={'$4'} width={'100%'}>
              <Input
                theme={theme}
                ref={ref as any}
                placeholder={placeholderSearch}
                width={'100%'}
                onChangeText={(text) => {
                  setSearchTerm(text.toLowerCase())
                }}
              />
            </XStack>
          )}
          <ScrollView>
            <LmAutocompleteList
              options={filteredOptions}
              onChangeSelection={onChangeSelection}
              isSelected={isSelected}
              bgItemList={bgItemList}
            />
          </ScrollView>
          {allowNew && !filteredOptions?.length && deferredTerm && (
            <XStack justifyContent={'flex-start'} marginBottom={'$3'} marginLeft={'$3'}>
              <Button onPress={() => onAddNew(deferredTerm)} chromeless icon={<ListPlusRegular />}>
                {deferredTerm}
              </Button>
            </XStack>
          )}
        </YStack>
      )}
    </>
  )
})

type LmAutocompleteListProps = AutocompleteContext & {
  options: GuiAutocompleteProps['options']
  bgItemList?: GuiAutocompleteProps["bgItemList"]
}

function LmAutocompleteList({ options, isSelected, onChangeSelection, bgItemList }: LmAutocompleteListProps) {
  return (
    <YGroup borderRadius={0} gap={"$1.5"}>
      {options.map((item, i) => {
        return (
          <YGroup.Item key={item.value}>
            <ListItem
              hoverTheme
              pressTheme
              focusTheme
              {...(bgItemList ? {
                bw: 1,
                boc: bgItemList,
              } : null)}
              style={{
                borderRadius: bgItemList ? 10 : undefined
              }}
              h={30}
              cursor={'pointer'}
              icon={isSelected(item) ? <CheckSquareRegular /> : <SquareRegular />}
              onPress={() => onChangeSelection(item)}
            >
              <ListItemTitle cursor={'pointer'}>{item.label}</ListItemTitle>
            </ListItem>
          </YGroup.Item>
        )
      })}
    </YGroup>
  )
}