
import { useCallback, useContext, useState } from 'react';
import { ActionSheetIOS, Platform } from 'react-native';
import ContextMenuView from 'react-native-context-menu-view';
import { H2 } from 'tamagui';
import { GuiSheet } from '../../widget/Sheet';
import { PropsContext } from '../Chatty';
import type { IMessage } from '../components/types/Chatty.types';
import { ChatEmitter } from '../utils/eventEmitter';


interface IProps {
  message: IMessage;
  children: JSX.Element;
}

function ContextMenuWrapper(props: IProps) {
  const [openSheet, setOpenSheet] = useState(false)
  const propsContext = useContext(PropsContext);

  const onPress = useCallback(
    (index) => {
      ChatEmitter.emit('actionPressed', index, props.message);
    },
    [props.message]
  );

  const onLongPress = useCallback(() => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            ...(propsContext.bubbleProps?.actions?.options.map(
              (_) => _.title
            ) as string[]),
            propsContext.bubbleProps?.actions?.cancelButtonLabel ?? 'Close',
          ],
          cancelButtonIndex: propsContext.bubbleProps?.actions?.options.length,
          destructiveButtonIndex:
            propsContext.bubbleProps?.actions?.options.findIndex(
              (_) => _.destructive
            ) || -1,
        },
        onPress
      );
    }
  }, [
    onPress,
    propsContext.bubbleProps?.actions?.cancelButtonLabel,
    propsContext.bubbleProps?.actions?.options,
  ]);

  const onChange = useCallback(() => { }, []);

  // If actions are not defined, just return the children
  if (!propsContext.bubbleProps?.actions) return props.children;

  if (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13) {
    return (
      <ContextMenuView
        actions={propsContext.bubbleProps?.actions?.options}
        onPress={(e: any) => onPress(e.nativeEvent.index)}
      >
        {props.children}
      </ContextMenuView>
    );
  }
  return (
    <GuiSheet snapPoints={[80, 50]} setStatus={setOpenSheet} status={openSheet} >
      <H2>Hi</H2>
    </GuiSheet>
  );
}

export { ContextMenuWrapper };
