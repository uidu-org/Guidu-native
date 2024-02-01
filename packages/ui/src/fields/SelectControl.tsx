import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Adapt, Select, Sheet, XStack, YStack } from '@uidu/native'
import { ReactNode } from 'react'
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form'

type GuiControlSelectProps = {
  label: string
  control: Control
  name: string
  rules: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  children: ReactNode
  defaultValue?: string
  placeholder: string
  isBox?: boolean
}

export function GuiControlSelect({
  label,
  control,
  name,
  rules = {},
  children,
  placeholder,
  isBox,
  defaultValue,
}: GuiControlSelectProps) {
  const boxStyles = {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    paddingHorizontal: 13,
    paddingVertical: 7,
  }

  return (
    <XStack jc="space-between">
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, onBlur, disabled } }) => (
          <Select
            defaultValue={defaultValue ?? undefined}
            id={name}
            value={value as string}
            onValueChange={onChange}
            disablePreventBodyScroll
          // size={'$2'}
          >
            <Select.Trigger bw="$0" width="100%">
              <Select.Value style={isBox && boxStyles} placeholder={placeholder} />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet
                modal
                dismissOnSnapToBottom
                animationConfig={{
                  type: 'spring',
                  damping: 20,
                  mass: 1.2,
                  stiffness: 250,
                }}
              >
                <Sheet.Frame>
                  <Adapt.Contents />
                </Sheet.Frame>
                <Sheet.Overlay
                  animation="lazy"
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                ai="center"
                jc="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zi={10}>
                  <ChevronUp size={20} />
                </YStack>
              </Select.ScrollUpButton>

              <Select.Viewport
                // to do animations:
                // animation="quick"
                // animateOnly={['transform', 'opacity']}
                // enterStyle={{ o: 0, y: -10 }}
                // exitStyle={{ o: 0, y: 10 }}
                minWidth={200}
              >
                <Select.Group>
                  <Select.Label>Choose the right one</Select.Label>

                  {children}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton
                ai="center"
                jc="center"
                // position="relative"
                w="100%"
                h="$3"
              >
                <YStack zi={10} >
                  <ChevronDown size={20} />
                </YStack>
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        )}
      />
    </XStack>
  )
}
