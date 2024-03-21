import React, { useCallback, useEffect, useRef } from 'react';
import { Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ChatBubble } from './ChatBubble';
import { useChatContext } from './context/WrapperContext';
import type { GSwipeableBubble } from './types';

function _SwipeableBubble(props: GSwipeableBubble) {
  const { message, children } = props;
  const { setMessage } = useChatContext()
  const swipeableRef = useRef<Swipeable>(null);

  const _onReply = useCallback(() => {
    if (!message) return;

    setMessage!(message);
    swipeableRef.current?.close();
  }, [message, swipeableRef]);

  const renderLeftActions = useCallback(() => {
    return <Text> </Text>;
  }, []);

  useEffect(() => {
    swipeableRef.current?.close();
  }, []);

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      friction={2}
      overshootFriction={2}
      onEnded={() => _onReply()}
      enableTrackpadTwoFingerGesture
      ref={swipeableRef}
    >
      {children ?? <ChatBubble {...props} />}
    </Swipeable>
  );
}

export const SwipeableBubble = React.memo(_SwipeableBubble);
