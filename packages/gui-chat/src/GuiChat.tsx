import { GuiText } from '@uidu/native'
import React, { ForwardedRef, useEffect, useRef } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import ChatFooter from './ChatFooter'
import { ChatList } from './ChatList'
import { ChatContextProvider } from './context/WrapperContext'
import { GChatty, ListRef } from './types'


export const GuiChat = React.forwardRef(
  (props: GChatty, ref: ForwardedRef<ListRef>) => {
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

    return (
      <SafeAreaView>
        <ChatContextProvider>
          <KeyboardAvoidingView
            behavior={Platform.select({
              android: 'position',
              ios: 'position',
            })}
            keyboardVerticalOffset={Platform.select({
              android: -30,
            })}
          >
            {
              messages.length < 1 ? (
                <GuiText>Empty chat</GuiText>
              ) : (
                <ChatList
                  data={messages}
                  //@ts-ignore
                  ref={ref ?? listRef}
                />
              )
            }
            <ChatFooter onChangeText={props?.onChangeText} value={props.value} mentions={mentions} onPressSend={props.onPressSend} />
          </KeyboardAvoidingView>
        </ChatContextProvider>
      </SafeAreaView>
    )
  })