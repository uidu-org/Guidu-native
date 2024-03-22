import { GuiText } from '@uidu/native'
import { ForwardedRef, useCallback, useEffect, useRef } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import ChatFooter from './ChatFooter'
import { ChatList } from './ChatList'
import { ChatContextProvider } from './context/WrapperContext'
import { GChatty, GMessage, ListRef } from './types'


export const GuiChat = (props: GChatty, ref: ForwardedRef<ListRef>) => {
  const { messages, currentUser, mentions } = props

  const listRef = useRef<ListRef>();

  useEffect(() => {
    const listener = Keyboard.addListener('keyboardDidShow', () => {
      if (listRef.current) {
        listRef.current?.scrollToEnd(true);
      } else if (ref) {
        //@ts-ignore
        ref.current?.scrollToEnd(true);
      } else {
        console.warn('No ref found');
      }
    });

    return () => {
      listener.remove();
    };
  }, [ref]);

  const _onPressSend = useCallback(
    (text: string, repliedTo?: GMessage) => {
      //@ts-ignore
      listRef.current.appendMessage({
        id: messages.length + 1,
        text: text,
        itsMe: true,
        createdAt: new Date(),
        user: currentUser,
        ...(repliedTo && {
          repliedTo: repliedTo
        })
      });
    },
    []
  );

  return (
    <SafeAreaView>
      <ChatContextProvider>
        <KeyboardAvoidingView
          behavior={Platform.select({
            android: 'position',
            ios: 'position',
          })}
          keyboardVerticalOffset={Platform.select({
            android: 10,
          })}
        >
          {
            messages.length < 1 ? (
              <GuiText>Empty chat</GuiText>
            ) : (
              <ChatList
                data={messages}
                //@ts-ignore
                ref={listRef}
              />
            )
          }
          <ChatFooter mentions={mentions} onPressSend={_onPressSend} />
        </KeyboardAvoidingView>
      </ChatContextProvider>
    </SafeAreaView>
  )
}