import { GuiText } from '@uidu/native';
import React, { ForwardedRef, useEffect, useRef } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';
import ChatFooter from './ChatFooter';
import { ChatList } from './ChatList';
import { ChatContextProvider } from './context/WrapperContext';
import { GChatty, ListRef } from './types';

export const GuiChat = React.forwardRef(
  (props: GChatty, ref: ForwardedRef<ListRef>) => {
    const { messages, currentUser, mentions } = props;

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
      <ChatContextProvider>
        <KeyboardAvoidingView
          behavior={Platform.select({
            android: undefined,
            ios: 'padding',
          })}
          // keyboardVerticalOffset={Platform.select({
          //   android: -30,
          //   ios: -30,
          // })}
          style={{
            flex: 1,
            // backgroundColor: 'purple',
          }}
        >
          <View style={{ flex: 1, flexGrow: 1, height: '100%' }}>
            {messages.length < 1 ? (
              <GuiText>Empty chat</GuiText>
            ) : (
              <ChatList
                data={messages}
                //@ts-ignore
                ref={ref ?? listRef}
              />
            )}
          </View>
          <View style={{ maxHeight: 100, flexShrink: 0 }}>
            <ChatFooter
              onChangeText={props?.onChangeText}
              value={props.value}
              mentions={mentions}
              onPressSend={props.onPressSend}
            />
          </View>
        </KeyboardAvoidingView>
      </ChatContextProvider>
    );
  }
);