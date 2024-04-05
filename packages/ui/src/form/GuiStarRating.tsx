import { ComponentType, useId, useState } from 'react';
import { SizableStack, SizeTokens, XStack, XStackProps } from 'tamagui';
import { IconProps, StarFill } from '../content/icons';
import { GFormFieldContainer } from './GuiFormFieldContainer';
import { GuiFormContainerBaseTypes } from './formContainerTypes';

export type GuiStarRatingProps = GuiFormContainerBaseTypes & {
  count?: number;
  onChange?: (rating: number | null) => void;
  value?: number | null;
  size?: SizeTokens;
  disabled?: boolean;
  iconProps?: IconProps;
  gap?: XStackProps['gap'];
  Icon?: ComponentType<IconProps>;
  colorActive?: IconProps['color'];
  colorHover?: IconProps['color'];
  colorActiveHover?: IconProps['color'];
  color?: IconProps['color'];
};

export function GStarRating({
  count = 5,
  onChange,
  value = null,
  disabled,
  required,
  error,
  helperText,
  helperTextProps,
  label,
  labelInline,
  labelProps,
  containerProps,
  iconProps,
  gap,
  Icon = StarFill,
  size = '$1',
  colorHover = '$yellow7',
  colorActiveHover = '$yellow8',
  colorActive = '$yellow10',
  color = '$gray7',
  ...sizeableStackProps
}: GuiStarRatingProps) {
  const id = useId();
  const [rating, setRating] = useState<number | null>(value);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const arr = Array.from(Array(count).keys());
  return (
    <GFormFieldContainer
      id={id}
      required={required}
      error={error}
      helperText={helperText}
      helperTextProps={helperTextProps}
      label={label}
      labelInline={labelInline}
      labelProps={labelProps}
      {...containerProps}
    >
      <XStack gap={gap}>
        {arr.map((value) => {
          const currentRating = value + 1;
          const filled = currentRating <= (rating || 0);
          const hovered = currentRating <= (hoverRating || 0);
          const currentColor = filled
            ? hovered
              ? colorActiveHover
              : colorActive
            : hovered
            ? colorHover
            : color;
          return (
            <SizableStack
              key={`${currentRating}`}
              {...sizeableStackProps}
              size={size}
              circular
              onHoverIn={() => {
                if (disabled) {
                  return;
                }
                setHoverRating(currentRating);
              }}
              onHoverOut={() => {
                if (disabled) {
                  return;
                }
                setHoverRating(null);
              }}
              onPress={() => {
                if (disabled) {
                  return;
                }
                const newRating =
                  rating === currentRating ? null : currentRating;
                setRating(newRating);
                if (typeof onChange === 'function') {
                  onChange(newRating);
                }
              }}
            >
              <Icon {...iconProps} size={size} color={currentColor} />
            </SizableStack>
          );
        })}
      </XStack>
    </GFormFieldContainer>
  );
}
