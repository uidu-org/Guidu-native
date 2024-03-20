import {
  View,
  styled
} from '@uidu/native'
import { useMemo } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ChatBubble from './ChatBubble'
import ChatFooter from './ChatFooter'
import { GMessage } from './types'

const List = styled(FlatList, {
  bg: '$background',
  p: '$3',
  gap: '$3',
})

const renderBubble = ({ item: message }: { item: GMessage }) => {
  return <ChatBubble key={message.id} message={message} />
}

export function GuiChat({ messages }) {
  const windowDimensions = useWindowDimensions();
  const safeArea = useSafeAreaInsets();

  const listHeight = useMemo(
    () => windowDimensions.height - 120 - safeArea.bottom - safeArea.top,
    [windowDimensions, safeArea]
  );

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.select({
          android: 'position',
          ios: 'position',
        })}
        keyboardVerticalOffset={Platform.select({
          android: 20,
        })}
      >
        <View maxHeight={listHeight} >
          <List
            height={"95%"}
            inverted
            data={messages}
            renderItem={renderBubble}
            windowSize={2}
          />
        </View>
        <ChatFooter />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

GuiChat.fileName = 'GuiChat'
