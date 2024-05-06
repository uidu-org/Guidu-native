import { Dispatch, SetStateAction, useState } from 'react';

export type UseGestureState = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  defaultOpen: boolean;
};
export const useGestureState = (defaultOpen?: boolean): UseGestureState => {
  const [open, onOpenChange] = useState<boolean>(!!defaultOpen);
  return {
    open,
    onOpenChange,
    defaultOpen: !!defaultOpen,
  };
};
