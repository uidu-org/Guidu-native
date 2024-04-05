import { GuiSheet, GuiText, GuiView } from "@uidu/native";
import React, { useCallback, useContext } from 'react';
import ActionsContext from '../context/ActionsContext';
import type { IMessage } from '../types/Chatty.types';

interface IProps {
  message: IMessage;
  children: JSX.Element;
}

function ContextMenuWrapper(props: IProps) {
  const { actions, isOpen, onClose } = useContext(ActionsContext);

  // const onPress = useCallback(
  //   (index) => {
  //     ChatEmitter.emit('actionPressed', index, props.message);
  //   },
  //   [props.message]
  // );

  // const onLongPress = useCallback(() => {
  //   if (Platform.OS === 'ios') {
  //     ActionSheetIOS.showActionSheetWithOptions(
  //       {
  //         options: [
  //           ...(propsContext.bubbleProps?.actions?.options.map(
  //             (_) => _.title
  //           ) as string[]),
  //           propsContext.bubbleProps?.actions?.cancelButtonLabel ?? 'Close',
  //         ],
  //         cancelButtonIndex: propsContext.bubbleProps?.actions?.options.length,
  //         destructiveButtonIndex:
  //           propsContext.bubbleProps?.actions?.options.findIndex(
  //             (_) => _.destructive
  //           ) || -1,
  //       },
  //       onPress
  //     );
  //   }
  // }, [
  //   onPress,
  //   propsContext.bubbleProps?.actions?.cancelButtonLabel,
  //   propsContext.bubbleProps?.actions?.options,
  // ]);

  const onChange = useCallback(() => { }, []);

  // If actions are not defined, just return the children
  if (!actions.bubbleProps?.actions) return props.children;

  return (
    <GuiSheet
      status={isOpen}
      setStatus={onClose}
      snapPoints={[70]}
      onOpenChange={onChange}
    >
      <GuiView centered>
        <GuiText>Ciao</GuiText>
      </GuiView>
    </GuiSheet>
  );
}

export { ContextMenuWrapper };
