import { Reply } from '@tamagui/lucide-icons';
import React, { useCallback, useEffect, useRef } from 'react';
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
    return <Reply size={20} />;
  }, []);

  useEffect(() => {
    swipeableRef.current?.close();
  }, []);

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      friction={3}
      overshootFriction={8}
      leftThreshold={70}
      onEnded={() => _onReply()}
      enableTrackpadTwoFingerGesture
      ref={swipeableRef}
    >
      {children ?? <ChatBubble {...props} />}
    </Swipeable>
  );
}

export const SwipeableBubble = React.memo(_SwipeableBubble);
