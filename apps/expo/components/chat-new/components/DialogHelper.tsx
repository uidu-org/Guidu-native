import { AlertDialog, GuiButton, XStack } from '@uidu/native';
import { GDialogHelperProps } from '../types';

export function DialogHelper({
  action,
  title,
  description,
  userInfo,
}: GDialogHelperProps) {
  return (
    <AlertDialog open={true}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>{title}</AlertDialog.Title>
          <AlertDialog.Description>{description}</AlertDialog.Description>
          <XStack gap={20} justifyContent="flex-end">
            <AlertDialog.Cancel asChild>
              <GuiButton>Close</GuiButton>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <GuiButton onPress={action} theme="active">
                Next
              </GuiButton>
            </AlertDialog.Action>
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
