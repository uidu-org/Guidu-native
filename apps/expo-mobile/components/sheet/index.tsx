import { GuiButton, GuiSheet, GuiText, GuiView } from '@uidu/native';
import React, { useState } from 'react';

export function SheetIndex() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GuiView centered>
        <GuiButton onPress={() => setOpen(true)}>Open</GuiButton>
      </GuiView>
      <GuiSheet status={open} setStatus={setOpen} snapPoints={[30, 50, 80]}>
        <GuiText>Hi, this is a custom Sheet</GuiText>
      </GuiSheet>
    </>
  );
}
