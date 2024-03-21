import { View } from '@uidu/native';
import React, { ForwardedRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Dimensions, PixelRatio, Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';
import { ChatBubble } from './ChatBubble';
import { ScrollToBottom } from './components/ScrollToBottom';
import { useChatContext } from './context/WrapperContext';
import { usePrevious } from './hooks/usePrevious';
import { GFabRef, GListProps, GMessage, GTypingStatusRef, LayoutType, ListRef } from './types';
import { ChatBubbleEmitter } from './utils/eventEmitter';
import { wait } from "./utils/helpers";

const averageCharWidth = Math.ceil(PixelRatio.get())
const DIMENSION_WIDTH = Dimensions.get('screen').width

export const ChatList = React.forwardRef((props: GListProps, ref: ForwardedRef<ListRef>) => {
    console.log("width-dimension",  Math.ceil(DIMENSION_WIDTH) - 90 - 20 - 20);

    const { setMessage } = useChatContext()
    const recyclerlistviewRef = useRef<RecyclerListView<any, any>>();
    const windowDimensions = useWindowDimensions();
    const safeArea = useSafeAreaInsets();
    const fabRef = useRef<GFabRef>(null);
    // const { trigger } = useHaptic();
    const typingStatusRef = useRef<GTypingStatusRef>(null);
    const listHeight = useMemo(
        () => windowDimensions.height - safeArea.bottom - (safeArea.top - 10),
        [windowDimensions, safeArea]
    );
    const { rowRenderer: rowRendererProp, data } = props;

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
    }, [messages]);

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
                const prevMessage: GMessage = index > 0 ? messages.getAllData()[index - 1] : null;
    
                // Calculate the height based on message content
                const height = calculateMessageHeight(currentMessage, prevMessage);
    
                return height;
            },
            (type, dim) => {
                dim.width = windowDimensions.width;
                
                dim.height = Math.ceil(+type);
            }
        );
    }, [messages, windowDimensions.width]);
    
    // Function to calculate the height of each message
    const calculateMessageHeight = (message: GMessage, prevMessage: GMessage | null) => {
        const textLength = message.text.length;
        const thresholdPercentage = 0.5;
        const padding = 20
        const margin = 20
        const maxWidth = Math.ceil(DIMENSION_WIDTH) - 90 - padding - margin;

        const textWidth = textLength * averageCharWidth; 
        
        // let linesNumber = Math.ceil(textWidth / maxWidth);
        // if ((textWidth % maxWidth) / maxWidth > thresholdPercentage) {
        //     linesNumber++;
        // }

        const wrappedText = message.text.split(/\r?\n/); // Split by both \r and \n

        // Count lines accurately, considering existing line breaks and wrapping
        let linesNumber = wrappedText.length;
        for (const line of wrappedText) {
            linesNumber += Math.ceil(line.length * averageCharWidth / maxWidth);
        }
        
        console.log("number of lines message", {
            text : message.text,
            textWidth,
            linesNumber
        });
        
          // Calculate height based on number of lines and additional padding
    const lineHeight = 30; // Adjusted line height
    const additionalPadding = 30; // Additional padding

    const height = (linesNumber * lineHeight) + additionalPadding;
        return height;
    };
    

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
            //   if (rowRendererProp) {
            //     return (
            //       <View>
            //         {withDate && (
            //           <RenderDate
            //             date={data.createdAt}
            //             {...propsContext.renderDateProps}
            //           />
            //         )}

            //         <Animated.View entering={FadeInDown} exiting={FadeOutUp}>
            //           <SwipeableBubble message={data} onReply={propsContext.onReply}>
            //             {rowRendererProp(data)}
            //           </SwipeableBubble>
            //         </Animated.View>
            //       </View>
            //     );
            //   }

            return (
                <>
                    {/* {withDate && (
                <RenderDate
                  date={data.createdAt}
                  {...propsContext.renderDateProps}
                />
              )} */}
                    <>
                        {/* {propsContext.onReply ? (
                  <>
                    <SwipeableBubble
                      message={data}
                      onReply={propsContext.onReply}
                    />
                  </>
                ) : (
                  <ChatBubble message={data} />
                )} */}
                        {/* <SwipeableBubble message={data} onReply={setMessage} > */}
                            <ChatBubble message={data} />
                        {/* </SwipeableBubble> */}
                    </>
                </>
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
        <View minHeight={1} minWidth={1} height={listHeight} >

            <ScrollToBottom onPress={scrollToBottom} ref={fabRef} />

            <RecyclerListView
                layoutProvider={layoutProvider()}
                //   externalScrollView={ScrollViewWithHeader}
                dataProvider={messages}
                style={{ height: "100%" }}
                // @ts-ignore
                ref={recyclerlistviewRef}
                // scrollViewProps={{
                //     keyboardShouldPersistTaps: 'never',
                // }}
                onScroll={onScroll}
                // optimizeForInsertDeleteAnimations
                // forceNonDeterministicRendering
                canChangeSize={true}
                rowRenderer={rowRenderer}
                initialRenderIndex={messages.getAllData().length- 1}
                //   renderFooter={() => <TypingStatus ref={typingStatusRef} />}
                onEndReached={props?.onEndReached}
                onEndReachedThreshold={props?.onEndReachedThreshold}
                decelerationRate={Platform.OS == 'ios' ? 0.995 : 0.97}
                optimizeForInsertDeleteAnimations={true}
                suppressBoundedSizeException={true}
            />
        </View>
    )
})


// const _layoutProvider = useMemo(()=>new LayoutProvider(
//     i => {
//     return { item: dataProvider.getDataForIndex(i), index: i }
//     },
//     async ({ item, index }, dim) => {
//     let height = 85
//     dim.width = width
    
//       if (item?.images?.length || (item?.ogImage && item?.ogImage?.url)) {
//         height = height  + s(160)
//       }
    
//       height =height + (item?.titleHeight+10 || 0) + (item?.link ? vs(20) : 0)
    
//       if (item?.contentHeight) {
//         if (item?.contentHeight >= vs(43)) {
//           height = height + vs(55)
//         } else {
//           height = height + (item?.contentHeight || 0)
//         }
//       }
//       height = height + 12 + 34 + 80+5+6
//       dim.height = height
    
//     },
//     ),[dataProvider])