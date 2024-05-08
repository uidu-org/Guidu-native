import { Reply } from '@tamagui/lucide-icons';
import React, { useCallback, useEffect, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { useChatContext } from './context/WrapperContext';
import type { GSwipeableBubble } from './types';

function _SwipeableBubble(props: GSwipeableBubble) {
  const { message, children } = props;
  const { setReplyMessage } = useChatContext();
  const swipeableRef = useRef<Swipeable>(null);

  const _onReply = useCallback(() => {
    if (!message) return;

    setReplyMessage!(message);
    swipeableRef.current?.close();
  }, [message, swipeableRef]);

  const renderLeftActions = useCallback(() => {
    return <Reply marginVertical="auto" marginLeft={10} size={25} />;
  }, []);

  useEffect(() => {
    swipeableRef.current?.close();
  }, []);

  const _onEnded = (event) => {
    console.log('event', event);

    if (event.nativeEvent.state > 50) {
      // Adjust threshold value here
      _onReply();
    } else {
      swipeableRef.current?.close(); // Close swipeable if not enough swipe
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      enableTrackpadTwoFingerGesture
      renderLeftActions={renderLeftActions}
      friction={1}
      overshootLeft={false}
      leftThreshold={60}
      onFailed={() => null}
      onSwipeableOpen={(ev) => _onReply()}
    >
      {children}
    </Swipeable>
  );
}

export const SwipeableBubble = React.memo(_SwipeableBubble);
