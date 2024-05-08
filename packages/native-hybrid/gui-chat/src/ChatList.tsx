import { GuiView } from '@uidu/native';
import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Keyboard, useWindowDimensions } from 'react-native';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';
import { ChatBubble } from './ChatBubble';
import { SwipeableBubble } from './SwipeableBubble';
import { ScrollToBottom } from './components/ScrollToBottom';
import { useChatContext } from './context/WrapperContext';
import { usePrevious } from './hooks/usePrevious';
import {
  GFabRef,
  GListProps,
  GMessage,
  GTypingStatusRef,
  LayoutType,
  ListRef,
} from './types';
import { calculateMessageHeight } from './utils/calculateItemHeight';
import { ChatBubbleEmitter } from './utils/eventEmitter';
import { wait } from './utils/helpers';

export const ChatList = React.forwardRef(
  (props: GListProps, ref: ForwardedRef<ListRef>) => {
    const { setReplyMessage, replyMessage } = useChatContext();
    const recyclerlistviewRef = useRef<RecyclerListView<any, any>>();
    const windowDimensions = useWindowDimensions();
    const fabRef = useRef<GFabRef>(null);
    // const { trigger } = useHaptic();
    // const safeArea = useSafeAreaInsets();
    const typingStatusRef = useRef<GTypingStatusRef>(null);
    const {
      rowRenderer: rowRendererProp,
      data,
      staticPathToUserInfoSection,
      forceNonDeterministicRendering,
    } = props;

    // const listHeight = useMemo(
    //   () => windowDimensions.height - safeArea.bottom - safeArea.top,
    //   [windowDimensions, safeArea]
    // );

    // todo: remove console.log
    // console.log('height', listHeight);
    // console.log('windowDimensions.height', windowDimensions.height);
    // console.log('safeArea.bottom', safeArea.bottom);
    // console.log('safeArea.top', safeArea.top);

    const dataProvider = useMemo<DataProvider>(() => {
      return new DataProvider((r1: GMessage, r2: GMessage) => {
        if (r1.id !== r2.id) {
          return true;
        }
        return false;
      });
    }, []);

    const [messages, setMessages] = useState<DataProvider>(dataProvider);
    const previousMessages = usePrevious<DataProvider>(messages);

    /* This is a React Hook that is used to update the messages list when new messages are added. */
    useEffect(() => {
      setMessages(dataProvider.cloneWithRows(data));
    }, [data]);

    /* This code is listening to the event of a reply bubble being pressed. When it is pressed, it scrolls
to the replied message. */
    useEffect(() => {
      // When reply is pressed, scroll to replied message
      ChatBubbleEmitter.addListener('replyBubblePressed', (messageId) => {
        const index = messages
          .getAllData()
          .findIndex((m) => m.id === messageId);

        if (index !== -1) {
          recyclerlistviewRef.current?.scrollToIndex(index, true);
        }
      });

      return () => {
        ChatBubbleEmitter.removeAllListeners();
      };
    }, [messages, replyMessage, Keyboard]);

    /* This code is checking if the first message in the previous messages is the same as the first message
in the current messages. If it is, then it will not scroll to the bottom. */
    useEffect(() => {
      if (
        previousMessages &&
        previousMessages.getAllData()![0]?.id === messages.getAllData()![0]?.id
      ) {
        wait(100).then(() => {
          recyclerlistviewRef.current?.scrollToEnd(true);
        });
      }
    }, [ref, messages, previousMessages]);

    /* Using the useImperativeHandle hook to expose a function to the parent component that will allow
    it to manipulate the messages list. */
    useImperativeHandle(
      ref,
      () => ({
        appendMessage: (
          message: GMessage | GMessage[],
          firstIndex?: boolean
        ) => {
          if (firstIndex) {
            if (Array.isArray(message)) {
              setMessages(
                dataProvider.cloneWithRows([
                  ...message,
                  ...messages.getAllData(),
                ])
              );
            } else {
              setMessages(
                dataProvider.cloneWithRows([message, ...messages.getAllData()])
              );
            }
          } else {
            if (Array.isArray(message)) {
              setMessages(
                dataProvider.cloneWithRows([
                  ...messages.getAllData(),
                  ...message,
                ])
              );
            } else {
              setMessages(
                dataProvider.cloneWithRows([...messages.getAllData(), message])
              );
            }
          }
        },
        /* This is a function that is used to scroll to the bottom of the list. */
        scrollToEnd: (animated?: boolean) => {
          recyclerlistviewRef.current?.scrollToEnd(animated);
        },
        /* Setting the typing status of the user. */
        setIsTyping: (typing?: boolean) => {
          typingStatusRef.current?.setIsTyping(typing ?? false);
          recyclerlistviewRef.current?.scrollToEnd(true);
        },
        /* Removing a message from the list of messages. */
        removeMessage: (id: number) => {
          setMessages(
            dataProvider.cloneWithRows(
              messages.getAllData().filter((message) => message.id !== id)
            )
          );
        },
      }),
      [dataProvider, messages]
    );

    const layoutProvider = useCallback(() => {
      return new LayoutProvider(
        (index) => {
          const currentMessage: GMessage = messages.getAllData()[index];
          const prevMessage: GMessage =
            index > 0 ? messages.getAllData()[index - 1] : null;

          // Calculate the height based on message content
          const height = calculateMessageHeight(currentMessage, prevMessage);
          // console.log('height', height);

          return height;
        },
        (height, dim) => {
          dim.width = windowDimensions.width;

          dim.height = Math.ceil(+height);
        }
      );
    }, [messages, windowDimensions.width]);

    // Function to calculate the height of each message

    const onScroll = useCallback(
      (e: ScrollEvent, offsetX: number, offsetY: number) => {
        if (e.nativeEvent.contentOffset.y <= 0) {
          fabRef.current?.show();
        } else {
          fabRef.current?.hide();
        }

        if (props.onScroll) {
          props.onScroll(e, offsetX, offsetY);
        }
      },
      [props]
    );

    const scrollToBottom = useCallback(() => {
      recyclerlistviewRef.current?.scrollToEnd(true);
    }, []);

    const renderBubble = useCallback(
      (data: GMessage, withDate?: boolean) => {
        return (
          <SwipeableBubble message={data} onReply={setReplyMessage}>
            <ChatBubble
              staticPathToUserInfoSection={staticPathToUserInfoSection}
              message={data}
            />
          </SwipeableBubble>
        );
      },
      [rowRendererProp]
    );

    const rowRenderer = useCallback(
      (type, data: GMessage) => {
        if (type === LayoutType.Dated) {
          return renderBubble(data, true);
        }

        return renderBubble(data);
      },
      [renderBubble]
    );

    return (
      <GuiView
        minHeight={1}
        minWidth={1}
        // maxHeight={listHeight}
        style={{
          // minHeight: '100%',/
          flex: 1,
          flexGrow: 1,
        }}
      >
        <ScrollToBottom onPress={scrollToBottom} ref={fabRef} />
        <RecyclerListView
          layoutProvider={layoutProvider()}
          //   externalScrollView={ScrollViewWithHeader}
          dataProvider={messages}
          style={{ height: '100%' }}
          ref={recyclerlistviewRef}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'never',
          }}
          onScroll={onScroll}
          optimizeForInsertDeleteAnimations
          // forceNonDeterministicRendering
          canChangeSize
          rowRenderer={rowRenderer}
          initialRenderIndex={messages.getAllData().length - 1}
          // renderFooter={() => {}}
          onEndReached={props?.onEndReached}
          onEndReachedThreshold={props?.onEndReachedThreshold}
          // decelerationRate={Platform.OS == 'ios' ? 0.995 : 0.97
          suppressBoundedSizeException
        />
      </GuiView>
    );
  }
);
