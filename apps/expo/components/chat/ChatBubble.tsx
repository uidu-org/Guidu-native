import { Image as ImageIcon } from '@tamagui/lucide-icons';
import {
  AlertDialog,
  GuiButton,
  GuiText,
  GuiView,
  Image,
  XStack,
} from '@uidu/native';
import dayjs from 'dayjs';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { replaceMentionValues } from 'react-native-controlled-mentions';
import ReactNativeParsedText, { ParseShape } from 'react-native-parsed-text';
import SIZES from './constants/SIZES';
import { useChatContext } from './context/WrapperContext';
import { GChatBubble, GDialogHelperProps } from './types';

function ChatBubbleComp(props: GChatBubble) {
  const { message, staticPathToUserInfoSection, children } = props;
  const { setShowMedia } = useChatContext();
  const [dialogHelperInfo, setDialogHelperInfo] =
    useState<GDialogHelperProps>();
  const createdAt = useMemo(
    () => message && dayjs(message.createdAt).format('HH:mm'),
    [message]
  );

  const bubbleBackgroundColor = useMemo<ViewStyle>(() => {
    if (message?.itsMe) {
      return {
        backgroundColor: '#719198',
      };
    }
    return {
      backgroundColor: '#e0e2db',
    };
  }, [message?.itsMe]);

  // useEffect(() => {
  //   if (message?.media) {
  //     message.media.forEach((media) => {
  //       InteractionManager.runAfterInteractions(() => {
  //         Image.prefetch(media.uri).then(() => {
  //           setMediaLoaded(true);
  //         });
  //       });
  //     });
  //   }

  // if (propsContext.enableUrlPreviews) {
  //     InteractionManager.runAfterInteractions(async () => {
  //         const url = extractUrlFromString(message?.text ?? '');

  //         if (url) {
  //             const data = await fetchMetaData(url);

  //             if (data) {
  //                 setShowUrlPreview(true);
  //                 setUrlPreviewData(data);
  //             }
  //         }
  //     });
  // }
  // }, [message?.media, message?.text]);

  const renderFooter = useCallback(
    () => (
      <View style={styles.bubbleFooter}>
        <Text style={[styles.date]}>{createdAt}</Text>
      </View>
    ),
    [createdAt, message?.itsMe]
  );

  const renderMedia = useCallback(() => {
    if (message?.media) {
      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: SIZES.BUBBLE_CHAT_GAP,
            maxWidth: SIZES.BUBBLE_CHAT_MAX_WIDTH,
          }}
        >
          {message.media.length <= 2 ? (
            message.media.slice(0, 2).map((media) => (
              <TouchableWithoutFeedback
                key={media.uri}
                onPress={() => {
                  setShowMedia(media.uri);
                }}
              >
                <View>
                  <Image source={{ uri: media.uri }} style={styles.media} />
                </View>

                {/* {media.type === MediaType.Video && (
                                        <VideoThumbnail media={media} />
                  )} */}
              </TouchableWithoutFeedback>
            ))
          ) : (
            <ImageBackground
              style={styles.media}
              source={{ uri: message.media[0]?.uri }}
              imageStyle={{ borderRadius: 15 }}
            >
              <GuiView
                onPress={() => setShowMedia(message.media[0]?.uri)}
                style={styles.backgroundOverlay}
              >
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 20,
                  }}
                >
                  + {message.media?.length}
                </Text>
              </GuiView>
            </ImageBackground>
          )}
        </View>
      );
    }

    return null;
  }, [message, setShowMedia]);

  const ALL_PATERNS_SHAPES: ParseShape[] = useMemo(
    () => [
      {
        type: 'url',
        style: {
          color: 'blue',
        },
        onPress: (url, _index) => {
          setDialogHelperInfo({
            action: async () => Linking.openURL(url),
            title: 'Open url',
            description: `Open the url: ${url}`,
          });
        },
      },
      {
        type: 'email',
        style: {
          color: '#872424fa',
        },
        onPress: (mailTo, _index) => {
          setDialogHelperInfo({
            action: async () => Linking.openURL(`mailto:${mailTo}`),
            title: 'Open mail',
            description: `Open the mail: ${mailTo}`,
          });
        },
      },
      {
        type: 'phone',
        // pattern: /#(\w+)/,
        style: {
          color: 'cyan',
        },
        onPress: (phone, _index) => {
          setDialogHelperInfo({
            action: async () => Linking.openURL(`tel:${phone}`),
            title: 'Open dialer',
            description: `Open the phone number: ${phone}`,
          });
        },
      },
      {
        pattern: /@\[([^)]+)]\(([^)]+)\)/,
        style: {
          color: '#394876',
        },
        onPress: (prop, _index) => {
          const { userId, userName } = extractIdFromMention(prop);
          console.log(userId);
          setDialogHelperInfo({
            action: () =>
              router.push(`${staticPathToUserInfoSection}/${userId}`),
            title: ` Open User info`,
            description: `Open ${userName ?? 'User'} info section`,
          });
        },
        renderText: (value) =>
          replaceMentionValues(value, ({ name }) => `@${name}`),
      },
    ],
    []
  );

  return (
    <>
      <View style={[styles.wrapper]}>
        {/* {propsContext.bubbleProps?.trailingAccessory && message?.itsMe && (
                <View>{propsContext.bubbleProps.trailingAccessory}</View>
            )} */}

        {!message?.itsMe && (
          <Image source={message?.user?.avatar} style={styles.avatar} />
        )}
        <View
          style={[
            bubbleBackgroundColor,
            styles.container,
            { marginStart: message?.itsMe ? 'auto' : undefined },
            {
              width:
                message?.media && message?.media?.length
                  ? SIZES.MIN_IMAGE_WIDTH
                  : undefined,
            },
            { marginRight: message?.itsMe ? 15 : undefined },
          ]}
        >
          <>
            {message?.repliedTo && (
              <GuiView
                position="relative"
                backgroundColor={'white'}
                padding={SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_PADDING}
                borderRadius={5}
                maxHeight={SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_MAX_HEIGHT}
                marginBottom={SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_MARGIN_BOTTOM}
              >
                {message.repliedTo.media && (
                  <ImageIcon size={20} position="absolute" right={2} top={2} />
                )}
                <GuiText
                  width={'80%'}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  fontWeight={'bold'}
                >
                  {message.repliedTo.user.name}
                </GuiText>
                <GuiText numberOfLines={2} ellipsizeMode="tail">
                  {message.repliedTo.text}
                </GuiText>
              </GuiView>
            )}

            <View style={{ gap: SIZES.BUBBLE_CHAT_GAP, padding: 0, margin: 0 }}>
              {renderMedia()}

              {message?.text && (
                <ReactNativeParsedText
                  style={{
                    lineHeight: SIZES.BUBBLE_CHAT_LINE_HEIGHT,
                    fontSize: SIZES.BUBBLE_CHAT_FONT_SIZE,
                    fontWeight: SIZES.BUBBLE_CHAT_FONT_WEIGHT,
                  }}
                  parse={ALL_PATERNS_SHAPES}
                >
                  {message?.text}
                </ReactNativeParsedText>
              )}
              {/* {renderUrlPreview} */}
              {renderFooter()}
            </View>
          </>
          {/* <GuiView
            position="absolute"
            bottom={0}
            left={-10}
            width={15}
            height={15}
            backgroundColor={'red'}
          /> */}
        </View>
      </View>
      <AlertDialog key={dialogHelperInfo?.title} open={!!dialogHelperInfo}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content minWidth={300} minHeight={200}>
            <AlertDialog.Title numberOfLines={1} ellipsizeMode="tail">
              {dialogHelperInfo?.title}
            </AlertDialog.Title>
            <AlertDialog.Description>
              {dialogHelperInfo?.description}
            </AlertDialog.Description>
            <XStack gap={20} justifyContent="flex-end" marginTop="auto">
              <AlertDialog.Cancel asChild>
                <GuiButton onPress={() => setDialogHelperInfo(undefined)}>
                  Close
                </GuiButton>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <GuiButton
                  onPress={dialogHelperInfo?.action}
                  onPressOut={() => setDialogHelperInfo(undefined)}
                  theme="active"
                >
                  Open
                </GuiButton>
              </AlertDialog.Action>
            </XStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  );
}

export const ChatBubble = React.memo(ChatBubbleComp);

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: Dimensions.get('screen').width,
  },
  container: {
    position: 'relative',
    marginHorizontal: SIZES.BUBBLE_CHAT_MARGIN_HORIZONTAL,
    marginVertical: SIZES.BUBBLE_CHAT_MARGIN_VERTICAL,
    borderRadius: 10,
    padding: SIZES.BUBBLE_CHAT_PADDING,
    maxWidth: SIZES.BUBBLE_CHAT_MAX_WIDTH,
  },
  date: {
    color: '#a8a8a8',
    fontSize: 11,
  },
  avatar: {
    marginTop: 'auto',
    marginLeft: 10,
    marginBottom: 15,
    padding: 5,
    width: 30,
    height: 30,
    borderRadius: 40,
    backgroundColor: 'gray',
  },
  avatarMe: {
    marginTop: 'auto',
    marginRight: 10,
    marginBottom: 15,
    padding: 5,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'gray',
  },
  bubbleFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: SIZES.BUBBLE_CHAT_FOOTER_HEIGHT,
  },
  moreMedia: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  media: {
    width: SIZES.MIN_IMAGE_WIDTH - SIZES.BUBBLE_CHAT_PADDING * 2,
    height: SIZES.IMAGE_HEIGHT,
    borderRadius: 15,
  },
  backgroundOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

function extractIdFromMention(mentionText: string) {
  const mentionRegex = /@\[([^)]+)]\(([^)]+)\)/;
  const match = mentionText.match(mentionRegex);

  const id = match![2];
  const name = match![1];
  return { userId: id, userName: name };
}
