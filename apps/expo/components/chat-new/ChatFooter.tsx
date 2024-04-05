import { MarkdownStyle } from '@expensify/react-native-live-markdown';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PlusCircle, SendHorizontal, X } from '@tamagui/lucide-icons';
import { GuiButton, GuiView, Sheet } from '@uidu/native';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  MentionInput,
  MentionSuggestionsProps,
  Suggestion,
} from 'react-native-controlled-mentions';
import { useChatContext } from './context/WrapperContext';
import { GFooterProps, GUser } from './types';

export const _ChatFooter = (props: GFooterProps) => {
  const { mentions, value } = props;
  const { replyMessage, setReplyMessage } = useChatContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [sheetStatus, setSheetStatus] = useState(false);
  const [text, setText] = useState('');
  const snapPoints = useMemo(() => ['30%', '50%'], []);
  const { width: windowWidth } = useWindowDimensions();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    setSheetStatus(!sheetStatus);
  }, []);

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

      const mentions = suggestions
        .map((user) => ({ ...user, id: user.id.toString() }))
        .filter((one) =>
          one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        );

      const renderItem = ({ item: one }: { item: Suggestion }) => {
        return (
          <GuiButton
            key={one.id}
            onPress={() => onSuggestionPress(one)}
            style={{ padding: 12 }}
          >
            <Text>{one.name}</Text>
          </GuiButton>
        );
      };

      return (
        <Sheet
          modal
          open={true}
          onOpenChange={() => {}}
          snapPoints={[60]}
          dismissOnSnapToBottom
          zIndex={100_000}
          animation="medium"
        >
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Sheet.Handle />
          <Sheet.Frame
            padding="$4"
            justifyContent="center"
            alignItems="center"
            space="$5"
          >
            <FlatList
              data={mentions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </Sheet.Frame>
        </Sheet>
      );
    };

  const renderMentionSuggestions = useCallback(
    () => renderSuggestions(mentions),
    [mentions]
  );

  const __onPressSend = useCallback(() => {
    console.log('testo', text);

    props.onPressSend(text!, replyMessage!);
    setText('');
  }, [text, replyMessage]);

  return (
    <>
      <GuiView borderTopWidth={1} borderTopColor="$gray5Light" flexGrow={1}>
        {replyMessage && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 45,
              backgroundColor: 'white',
              padding: 5,
            }}
          >
            <View style={styles.replyBody}>
              <Text style={[styles.replyUsername]}>
                {replyMessage.user.name}
              </Text>
              <Text>{cuttedText}</Text>
            </View>
            <X size={20} onPress={() => setReplyMessage(null)} />
          </View>
        )}
        <GuiView
          flexDirection="row"
          alignItems="center"
          gap="$2"
          paddingHorizontal="$4"
        >
          <View>
            <PlusCircle size={24} onPress={() => handlePresentModalPress()} />
          </View>
          <View style={{ flexDirection: 'row', flexGrow: 1 }}>
            <SafeAreaView>
              <MentionInput
                multiline
                value={text}
                onChange={onChangeText}
                partTypes={[
                  {
                    trigger: '@',
                    renderSuggestions: renderMentionSuggestions,
                    textStyle: { fontWeight: '700', color: 'gray' }, //
                  },
                ]}
                placeholder="Type here..."
                style={{ padding: 12, maxWidth: windowWidth - 120 }}
              />
            </SafeAreaView>
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
              size={14}
              margin={4}
              onPress={__onPressSend}
            />
          </View>
        </GuiView>
      </GuiView>
    </>
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

const markdownStyle: MarkdownStyle = {
  syntax: {
    color: 'gray',
  },
  link: {
    color: 'blue',
  },
  h1: {
    fontSize: 25,
  },
  blockquote: {
    borderColor: 'gray',
    borderWidth: 6,
    marginLeft: 6,
    paddingLeft: 6,
  },
  code: {
    fontFamily: 'monospace',
    color: 'black',
    backgroundColor: 'lightgray',
  },
  pre: {
    fontFamily: 'monospace',
    color: 'black',
    backgroundColor: 'lightgray',
  },
  mentionHere: {
    color: 'green',
    backgroundColor: 'lime',
  },
  mentionUser: {
    color: 'blue',
    backgroundColor: 'cyan',
  },
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

export default React.memo(_ChatFooter);
