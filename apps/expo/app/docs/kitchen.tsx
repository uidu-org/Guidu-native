import {
  GAutocompleteRhf,
  GFormRhfProvider,
  YStack
} from '@uidu/native';
import React, { useState } from 'react';

export default function kitchen() {
  const [form, setForm] = useState<any>({
    pre: [{ value: 'Pear', label: 'Pear' }],
    pre_matched: ['Pear'],
  });

  return (
    <GFormRhfProvider
      defaultValues={{
        pre: { value: 'Pear', label: 'Pear' },
        pre_matched: 'Pear',
      }}
    >
      <YStack space>
        <GAutocompleteRhf label={'Single'} name={'autocomplete'} options={options} />
        <GAutocompleteRhf
          label={'With Allow New Hook'}
          name={'with-hook'}
          options={options.map((i) => ({ ...i, otherVal: i.value }))}
          allowNew
          allowNewHook={(newValue) => ({
            label: newValue,
            value: (Math.random() + 1).toString(36).substring(7),
          })}
        />
      </YStack>
    </GFormRhfProvider>
  );
}

const options = [
  { label: 'Apple' },
  { label: 'Pear' },
  { label: 'Blackberry' },
  { label: 'Peach' },
  { label: 'Apricot' },
  { label: 'Melon' },
  { label: 'Honeydew' },
  { label: 'Starfruit' },
  { label: 'Blueberry' },
  { label: 'Rasberry' },
  { label: 'Strawberry' },
  { label: 'Mango' },
  { label: 'Pineapple' },
  { label: 'Lime' },
  { label: 'Lemon' },
  { label: 'Coconut' },
  { label: 'Guava' },
  { label: 'Papaya' },
  { label: 'Orange' },
  { label: 'Grape' },
  { label: 'Jackfruit' },
  { label: 'Durian' },
].map((i) => ({
  value: i.label,
  label: i.label,
}));
