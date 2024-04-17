import { Image as ImageIcon, SendHorizontal, X } from '@tamagui/lucide-icons';
import { GuiText, GuiView, Image, Sheet, XStack } from '@uidu/native';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
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
  const { mentions, value } = props;
  const { replyMessage, setReplyMessage } = useChatContext();
  const [text, setText] = useState('');
  const { width: windowWidth } = useWindowDimensions();
  const inputRef = useRef<TextInput>(null);

  const onChangeText = useCallback((text: string) => {
    // props?.onChangeText(text)
    setText(text);
  }, []);

  const cuttedText = useMemo(() => {
    if (replyMessage) {
      return replyMessage.text.slice(0, 100) + '...';
    }
    return null;
  }, [replyMessage]);

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
          bottom={45}
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
            style={{ padding: 12, maxWidth: windowWidth - 120 }}
          />
        </View>
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
      </GuiView>
    </GuiView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  shortedTextInput: {
    padding: 10,
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '20%',
    backgroundColor: '#fcba03',
  },
  reply: {
    // flexDirection: 'row',
    // padding: 10,
    // backgroundColor: '#f5f5f5',
    // borderLeftColor: '#c8faaf',
    // borderLeftWidth: 6,
    // position: "absolute",
    // bottom: 45
  },
  replyBody: {
    flex: 1,
  },
  replyUsername: {
    fontWeight: 'bold',
  },

  addMore: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  imageClearButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 18,
    height: 18,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  media: {
    width: 110,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  mediaOverlay: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
  },
  mentionContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    padding: 10,
    backgroundColor: '#E5EEFA',
  },
  mentionLabel: {
    padding: 10,
    color: '#1939B7',
  },
});

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
