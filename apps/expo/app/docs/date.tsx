import { GFormRhfProvider, GInputRhf, LmDateSelectionRhf } from '@uidu/native';
import { YStack } from 'tamagui';

export default function DocsDatePage() {
  return (
    <GFormRhfProvider
      defaultValues={{
        preselect: '1980-02-21',
      }}
    >
      <YStack space>
        <LmDateSelectionRhf name={'birthday'} label={'Birthday'} required />
      </YStack>

      <GInputRhf name={'input'} label={'Input Field'} />
      <LmDatepickerRhf
        name={'required'}
        label={'Required'}
        required
        fullWidth
      />
    </GFormRhfProvider>
  );
}
