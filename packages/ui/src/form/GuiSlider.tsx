import { useId, useState } from 'react'
import { ColorTokens, Slider, SliderProps, SliderThumbProps, Text, XStack, styled } from 'tamagui'
import { GFormFieldContainer } from './GuiFormFieldContainer'
import { GuiFormContainerBaseTypes } from './formContainerTypes'

const CustomSliderTrack = styled(Slider.Track, {
  variants: {
    colorCustom: {
      ':string': (color) => {
        return {
          backgroundColor: color,
        }
      },
    },
  } as const,
})
const CustomSliderTrackActive = styled(Slider.TrackActive, {
  variants: {
    colorCustom: {
      ':string': (color: string) => {
        return {
          backgroundColor: color,
        }
      },
    },
  } as const,
})

export type GuiSliderProps = SliderProps &
  GuiFormContainerBaseTypes & {
    defaultValue?: number[]
    color?: ColorTokens | string
    colorActiveOnly?: boolean
    thumbProps?: SliderThumbProps
    showValue?: boolean
  }

export function GSlider({
  thumbProps,
  color,
  defaultValue = [0],
  label,
  labelProps,
  error,
  required,
  helperText,
  helperTextProps,
  labelInline,
  colorActiveOnly,
  showValue,
  containerProps,
  ...sliderProps
}: GuiSliderProps) {
  const id = useId()
  const [value, setValue] = useState<number[]>(defaultValue)
  const trackColor = color ? `${color}Dark` : undefined
  return (
    <GFormFieldContainer
      id={id}
      label={label}
      error={error}
      required={required}
      labelProps={labelProps}
      size={sliderProps.size}
      labelInline={labelInline}
      helperText={helperText}
      helperTextProps={helperTextProps}
      alignItems={labelInline ? 'center' : undefined}
      {...containerProps}
    >
      <XStack space alignItems={'center'}>
        <Slider
          size="$2"
          width={150}
          defaultValue={value}
          max={5}
          step={1}
          {...sliderProps}
          onValueChange={(v) => {
            setValue(v)
            if (typeof sliderProps.onValueChange === 'function') {
              sliderProps.onValueChange(v)
            }
          }}
        >
          <CustomSliderTrack colorCustom={!colorActiveOnly ? trackColor : undefined}>
            <CustomSliderTrackActive colorCustom={trackColor} />
          </CustomSliderTrack>
          <Slider.Thumb
            bordered={false}
            circular
            pressTheme={false}
            hoverTheme={false}
            focusTheme={false}
            size={'$1'}
            index={0}
            backgroundColor={color}
            {...thumbProps}
          />
        </Slider>
        {showValue && <Text>{value[0]}</Text>}
      </XStack>
    </GFormFieldContainer>
  )
}
