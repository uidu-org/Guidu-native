import {
  Button,
  GFormRhfProvider,
  GuiDatepickerRhf,
  GuiSheet,
  XStack,
  YStack,
} from '@uidu/native';
import { useState } from 'react';

export default function DateDocsPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open</Button>
      <GuiSheet status={open} setStatus={setOpen} snapPoints={[80]}>
        <GFormRhfProvider
          defaultValues={{
            date: new Date(),
          }}
        >
          {({ control, handleSubmit, reset }) => (
            <YStack gap={'$3'}>
              <GuiDatepickerRhf
                control={control}
                name="date"
                defaultDates={[new Date()]}
              />
              <XStack gap={'$3'}>
                <Button onPress={() => reset()}>Reset</Button>
                <Button
                  onPress={handleSubmit((data) => {
                    console.log(data);
                  })}
                >
                  Submit
                </Button>
              </XStack>
            </YStack>
          )}
        </GFormRhfProvider>
      </GuiSheet>
    </>
  );
}
