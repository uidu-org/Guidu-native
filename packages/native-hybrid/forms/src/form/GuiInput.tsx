import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { Input, InputProps, Stack, TextArea } from '@uidu/native';
import { forwardRef, useId, useState } from 'react';
import { Pressable } from 'react-native';
import { GFormFieldContainer } from './GuiFormFieldContainer';
import { GuiFormContainerBaseTypes } from './formContainerTypes';

export type GuiInputProps = InputProps &
  GuiFormContainerBaseTypes & {
    multiline?: boolean;
    isPassword?: boolean;
    fullWidth?: boolean;
  };

export const GInput = forwardRef(
  (
    {
      required,
      error,
      helperText,
      helperTextProps,
      label,
      labelProps,
      labelInline,
      multiline,
      containerProps,
      isPassword,
      fullWidth,
      ...rest
    }: GuiInputProps,
    ref
  ) => {
    const genId = useId();
    const [show, setShow] = useState<boolean>(false);
    const id = rest.id || genId;
    const currentInputProps = {
      ...rest,
    };
    if (error) {
      currentInputProps.theme = 'red';
      currentInputProps.borderColor = error ? '$red8' : undefined;
    }
    if (fullWidth) {
      currentInputProps.minWidth = '100%';
    }

    const secureTextEntry = !!(rest.secureTextEntry || isPassword);

    return (
      <GFormFieldContainer
        id={id}
        error={error}
        required={required}
        labelProps={labelProps}
        label={label}
        fullWidth={fullWidth}
        size={rest.size}
        labelInline={labelInline}
        helperText={helperText}
        helperTextProps={helperTextProps}
        {...containerProps}
      >
        {multiline ? (
          <TextArea
            {...currentInputProps}
            placeholderTextColor={rest.placeholderTextColor}
            ref={ref as any}
          />
        ) : secureTextEntry ? (
          <Stack
            position={'relative'}
            width={fullWidth ? '100%' : currentInputProps?.width}
          >
            <Input
              {...currentInputProps}
              ref={ref as any}
              secureTextEntry={!show}
              autoCapitalize="none"
              placeholderTextColor={
                rest.placeholderTextColor as InputProps['placeholderTextColor']
              }
            />
            <Pressable
              style={{
                position: 'absolute',
                top: '50%',
                transform: [{ translateY: -0.5 * 20 }],
                height: 20,
                ...(rest?.direction === 'rtl'
                  ? {
                      left: 15,
                    }
                  : {
                      right: 15,
                    }),
              }}
              onPress={() => {
                setShow((state) => !state);
              }}
            >
              {show ? <EyeOff /> : <Eye />}
            </Pressable>
          </Stack>
        ) : (
          <Input
            {...currentInputProps}
            autoCapitalize="none"
            ref={ref as any}
          />
        )}
      </GFormFieldContainer>
    );
  }
);
