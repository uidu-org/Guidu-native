import { Form, GuiButton, GuiView, XStack } from '@uidu/native';
import { useState } from 'react';

export default function kitchen() {
  const [form, setForm] = useState<any>({
    pre: [{ value: 'Pear', label: 'Pear' }],
    pre_matched: ['Pear'],
  });

  return (
    <>
      <GuiView>
        <GFormRhfProvider
          defaultValues={{
            name: '',
            email: '',
          }}
        >
          {({ control, handleSubmit, reset }) => (
            <Form
              gap={'$3'}
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              <GInputRhf
                name={'name'}
                control={control}
                label={'Name'}
                placeholder={'Type your name...'}
                labelInline
                required
              />
              <GInputRhf
                name={'email'}
                control={control}
                label={'Name'}
                placeholder={'Type your email...'}
                labelInline
              />
              <XStack gap={'$3'}>
                <GuiButton onPress={() => reset()}>Reset</GuiButton>
                <Form.Trigger asChild>
                  <GuiButton>Submit</GuiButton>
                </Form.Trigger>
              </XStack>
            </Form>
          )}
        </GFormRhfProvider>
      </GuiView>
      <GFormRhfProvider
        defaultValues={{
          ...form,
        }}
      >
        <GAutocompleteRhf
          label={'Multiple'}
          name={'autocomplete'}
          options={options}
          multiple
        />

        <GSubmitButtonRhf onSubmit={() => console.log(form)}>
          Submit
        </GSubmitButtonRhf>
      </GFormRhfProvider>
    </>
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
