import dayjs from 'dayjs';
import type { ForwardedRef } from 'react';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Footer } from './Footer';
import { Header } from './Header';
import { List } from './List';
import { ActionsProvider } from "./context/ActionsContext";
import type { IChatty, ListRef } from './types/Chatty.types';

export const PropsContext = React.createContext<IChatty>({} as IChatty);


export const Chatty = React.forwardRef(
  (props: IChatty, ref: ForwardedRef<ListRef>) => {
    const listRef = useRef<ListRef>();
    const { messages } = props;

    /* This is a way to scroll to the end of the list when the keyboard is shown. */
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

    useEffect(() => {
      if (props?.setDateLocale) {
        dayjs.locale(props.setDateLocale);
      }
    }, [props.setDateLocale]);

    const renderLoading = useCallback(() => {
      return (
        <View style={[styles.loadingContainer]}>
          <ActivityIndicator />
        </View>
      );
    }, []);

    return (
      <PropsContext.Provider value={props}>
        {props?.renderHeader ? (
          props.renderHeader(props.headerProps)
        ) : (
          <Header {...props.headerProps} />
        )}
        <KeyboardAvoidingView
          behavior={Platform.select({
            android: 'position',
            ios: 'position',
          })}
          keyboardVerticalOffset={Platform.select({
            android: 20,
          })}
        >
          {props.messages.length < 1 ? (
            renderLoading()
          ) : (
            <>
              <ActionsProvider
                onOpen={() => console.log('Opening actions sheet')} // Handle opening logic (e.g., toggle state)
                onClose={() => console.log('Closing actions sheet')} // Handle closing logic (e.g., toggle state)
              >
                <List
                  data={messages}
                  //@ts-ignore
                  ref={ref ?? listRef}
                  rowRenderer={
                    props?.renderBubble ? props.renderBubble : undefined
                  }
                  {...props.listProps}
                />
              </ActionsProvider>
              {props?.renderFooter ? (
                props.renderFooter(props.footerProps)
              ) : (
                <Footer
                  {...props.footerProps}
                  replyingTo={props.replyingTo}
                />
              )}
            </>
          )}
        </KeyboardAvoidingView>
      </PropsContext.Provider>
    );
  }
);

export const styles = StyleSheet.create({
  loadingContainer: {
    height: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
