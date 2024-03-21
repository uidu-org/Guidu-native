import React, { useRef } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import ChatFooter from './ChatFooter'
import { ChatList } from './ChatList'
import { ChatContextProvider } from './context/WrapperContext'
import { GMessage, ListRef } from './types'


export function GuiChat({ messages, onPressSend }: { messages: GMessage[], onPressSend }) {

  const listRef = useRef<ListRef>();

  const __onPressSend = React.useCallback(
    () => {
      //@ts-ignore
      listRef.current.appendMessage({
        id: 13,
        text: "sss",
        itsMe: Math.floor(Math.random() * 2) === 0,
        createdAt: new Date(),
        user: {
          id: 2,
          username: 'John Doe',
          avatar: { uri: 'https://i.pravatar.cc/300' },
        },
      });
      //@ts-ignor
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
          <ChatList
            data={messages}
            //@ts-ignore
            ref={listRef}
          />
          <ChatFooter onPressSend={__onPressSend} />
        </KeyboardAvoidingView>
      </ChatContextProvider>
    </SafeAreaView>
  )
}

GuiChat.fileName = 'GuiChat'