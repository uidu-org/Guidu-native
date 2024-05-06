import { StarFull } from '@tamagui/lucide-icons';
import { SizableStack, SizeTokens, XStack, XStackProps } from '@uidu/native';
import { ComponentType, useId, useState } from 'react';
import { GFormFieldContainer } from './GuiFormFieldContainer';
import { GuiFormContainerBaseTypes } from './formContainerTypes';

export type GuiStarRatingProps = GuiFormContainerBaseTypes & {
  count?: number;
  onChange?: (rating: number | null) => void;
  value?: number | null;
  size?: SizeTokens;
  disabled?: boolean;
  gap?: XStackProps['gap'];
  Icon?: ComponentType;
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
  gap,
  Icon = StarFull,
  size = '$1',
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
          const currentColor = 'yellow';
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
              <Icon size={size} color={currentColor} />
            </SizableStack>
          );
        })}
      </XStack>
    </GFormFieldContainer>
  );
}
