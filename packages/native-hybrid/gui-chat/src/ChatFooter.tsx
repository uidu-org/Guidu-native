import { Image as ImageIcon, SendHorizontal, X } from '@tamagui/lucide-icons';
import { GuiText, GuiView, Image, Sheet, XStack } from '@uidu/native';
import React, { FC, useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  MentionInput,
  MentionSuggestionsProps,
} from 'react-native-controlled-mentions';
import SIZES from './constants/SIZES';
import { useChatContext } from './context/WrapperContext';
import { GFooterProps, GUser } from './types';

const ChatFooterComp: FC<GFooterProps> = (props) => {
  const { width: windowWidth } = useWindowDimensions();
  const { mentions, value, isDark } = props;
  const { replyMessage, setReplyMessage } = useChatContext();
  const [text, setText] = useState('');
  const [offsetReplyMessageHeight, setOffsetReplyMessageHeight] = useState();
  const inputRef = useRef<TextInput>(null);

  const onChangeText = useCallback((text: string) => {
    // props?.onChangeText(text)
    setText(text);
  }, []);

  const onLayout = (event) => {
    const {
      layout: { height },
    } = event.nativeEvent;
    setOffsetReplyMessageHeight(height);
  };

  const renderSuggestions: (
    suggestions: GUser[]
  ) => FC<MentionSuggestionsProps> =
    (suggestions) =>
    ({ keyword, onSuggestionPress }) => {
      if (keyword == null) {
        return null;
      }

      Keyboard.dismiss();

      const mentions = suggestions
        .map((user) => ({ ...user, id: user.id.toString() }))
        .filter((one) =>
          one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        );

      const renderItem = ({ item: one }: { item: GUser }) => {
        return (
          <GuiView
            key={one.id}
            onPress={() => {
              onSuggestionPress({ ...one, id: one.id.toString() });
              inputRef.current?.focus();
            }}
            padding={5}
            flexDirection="row"
            gap={15}
          >
            <Image
              backgroundColor={'#cfcece'}
              borderRadius={30}
              height={30}
              width={30}
              source={one.avatar}
            />

            <Text>{one.name}</Text>
          </GuiView>
        );
      };

      return (
        <Sheet
          modal
          open
          onOpenChange={() => {}}
          snapPoints={[60]}
          dismissOnSnapToBottom
          zIndex={100_000}
          animation="none"
        >
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Sheet.Frame
            padding="$4"
            // justifyContent="center"
            // alignItems="center"
          >
            <FlatList
              data={mentions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ gap: 10 }}
            />
          </Sheet.Frame>
        </Sheet>
      );
    };

  const renderMentionSuggestions = renderSuggestions(mentions);

  const __onPressSend = useCallback(() => {
    props.onPressSend(text!, replyMessage!);
    setText('');
    setReplyMessage(null);
  }, [text, replyMessage]);

  // <View
  //   style={{
  //     width: '100%',
  //     flexDirection: 'row',
  //
  //     backgroundColor: 'white',
  //     padding: 5,
  //   }}
  // >
  //   <View style={styles.replyBody}>
  //     <Text style={[styles.replyUsername]}>{replyMessage.user.name}</Text>
  //     <Text>{cuttedText}</Text>
  //   </View>
  // </View>

  return (
    <GuiView borderTopWidth={1} borderTopColor="#c5c3c3" flexGrow={1}>
      {replyMessage && (
        <XStack
          backgroundColor={'white'}
          position={'absolute'}
          bottom={offsetReplyMessageHeight && offsetReplyMessageHeight}
          width={'100%'}
          padding={5}
        >
          {replyMessage.media && <ImageIcon size={40} strokeWidth={1} />}

          <GuiView
            padding={SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_PADDING}
            borderRadius={5}
            maxHeight={SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_MAX_HEIGHT}
            marginBottom={SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_MARGIN_BOTTOM}
            width={'85%'}
          >
            <GuiText numberOfLines={1} ellipsizeMode="tail" fontWeight={'bold'}>
              {replyMessage.user.name}
            </GuiText>
            <GuiText numberOfLines={2} ellipsizeMode="tail">
              {replyMessage.text}
            </GuiText>
          </GuiView>
          <GuiView
            marginLeft="auto"
            height={32}
            borderRadius={20}
            backgroundColor={'#e24444da'}
          >
            <X size={30} onPress={() => setReplyMessage(null)} />
          </GuiView>
        </XStack>
      )}
      <GuiView
        flexDirection="row"
        alignItems="center"
        gap="$2"
        paddingHorizontal={8}
        onLayout={onLayout}
      >
        {/* <View>
          <PlusCircle size={24} onPress={() => handlePresentModalPress()} />
        </View> */}
        <View style={{ flexDirection: 'row', flexGrow: 1 }}>
          <MentionInput
            inputRef={inputRef}
            multiline
            value={text}
            onChange={onChangeText}
            partTypes={[
              {
                trigger: '@',
                // pattern: new RegExp('(?<!w)@'),
                renderSuggestions: renderMentionSuggestions,
                textStyle: { fontWeight: 'bold', color: 'gray' },
              },
            ]}
            placeholder="Type here..."
            style={{
              padding: 12,
              maxWidth: windowWidth - 120,
              color: isDark ? 'white' : 'black',
            }}
          />
        </View>

        {text && (
          <View
            style={{
              padding: 2,
              backgroundColor: 'green',
              borderRadius: 30,
              margin: 3,
            }}
          >
            <SendHorizontal
              color={'white'}
              size={20}
              margin={4}
              onPress={__onPressSend}
            />
          </View>
        )}
      </GuiView>
    </GuiView>
  );
};

// const renderItem = useCallback(({ item }: { item: GUser }) => {
//     const handleUserClick = () => {
//         console.log("Call handleTextChange to push the mention");
//         handleTextChange(text, item.id.toString(), item.name);
//         handleCloseModalPress()
//     };

//     return (
//         <TouchableOpacity onPress={handleUserClick}>
//             <GuiButton>
//                 <GuiText>{item.name}</GuiText>
//             </GuiButton>
//         </TouchableOpacity>
//     );
// }, [handleTextChange, text]);

// const handleTextChange = useCallback((newText: string, mentionId?: string, mentionName?: string) => {
//     setText(newText);
//     if (newText.endsWith(' @')) {
//         console.log('Mention triggered!');
//         handlePresentModalPress();
//     }
//     if (!newText.includes('@')) {
//         if (sheetStatus) {
//             handleCloseModalPress();
//         }
//     }
//     if (mentionId && mentionName) {
//         const mentionText = `[${mentionName}](${mentionId}) `;
//         setText(newText + mentionText);
//     }
// }, [handleCloseModalPress, handlePresentModalPress]);

export default React.memo(ChatFooterComp);
