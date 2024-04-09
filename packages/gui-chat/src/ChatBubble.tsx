import type { ViewSource } from '@muhammedkpln/react-native-image-viewing/dist/ImageViewing';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import ReactNativeParsedText from 'react-native-parsed-text';
import SIZES from './constants';
import { useChatContext } from './context/WrapperContext';
import { GChatBubble, GUrlPreviewBubble } from './types';
import { ALL_PATERNS_SHAPES } from './utils/patterns';

function ChatBubbleComp(props: GChatBubble) {
  const { message, children } = props;
  const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
  const { setShowMedia } = useChatContext();
  const [showUrlPreview, setShowUrlPreview] = useState(false);
  const [urlPreviewData, setUrlPreviewData] = useState<GUrlPreviewBubble>();
  const createdAt = useMemo(() => {
    return message && dayjs(message.createdAt).format('HH:mm');
  }, [message]);

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

  useEffect(() => {
    if (message?.media) {
      message.media.forEach((media) => {
        InteractionManager.runAfterInteractions(() => {
          Image.prefetch(media.uri).then(() => {
            setMediaLoaded(true);
          });
        });
      });
    }

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
  }, [message?.media, message?.text]);

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.bubbleFooter}>
        <Text style={[styles.date]}>{createdAt}</Text>
        {/* {renderTicks()} */}
      </View>
    );
  }, [createdAt, message?.itsMe]);

  const renderMedia = useCallback(() => {
    if (message?.media) {
      const photoViewCompatible: ViewSource[] = [];

      message.media.forEach((media) => {
        // if (media.type === MediaType.Image) {
        //   photoViewCompatible.push({
        //     type: 'image',
        //     source: {
        //       uri: media.uri,
        //     },
        //   });
        // }
        // if (media.type === MediaType.Video) {
        //     photoViewCompatible.push({
        //         type: 'view',
        //         children: <VideoThumbnail media={media} isSelected />,
        //     });
        //     photoViewCompatible.push({
        //         type: 'view',
        //         children: <VideoThumbnail media={media} isSelected />,
        //     });
        // }
      });

      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 5,
            maxWidth: 210,
          }}
        >
          {message?.media.map((media, index) => {
            if (index < 2) {
              return (
                <TouchableWithoutFeedback
                  key={media.uri}
                  onPress={() => {
                    setShowMedia(media.uri);
                    console.log('press');
                  }}
                >
                  <View>
                    <Image source={{ uri: media.uri }} style={styles.media} />
                  </View>

                  {/* {media.type === MediaType.Video && (
                                        <VideoThumbnail media={media} />
                  )} */}
                </TouchableWithoutFeedback>
              );
            }

            return null;
          })}

          {message.media.length > 3 && (
            <TouchableWithoutFeedback
              onPress={() => {
                setShowMedia(true);
                console.log('press');
              }}
            >
              <ImageBackground
                style={styles.media}
                source={{ uri: message.media[3]?.uri }}
                imageStyle={{
                  borderRadius: 15,
                }}
              >
                <View style={styles.backgroundOverlay}>
                  <Text
                    style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}
                  >
                    + {message.media.length - 3}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableWithoutFeedback>
          )}
        </View>
      );
    }

    return null;
  }, [mediaLoaded, message]);

  // const renderUrlPreview = useMemo(() => {
  //     if (showUrlPreview && urlPreviewData && !message?.repliedTo) {
  //         return (
  //             <View style={{ marginTop: 10 }}>
  //                 <UrlPreviewBubble
  //                     title={urlPreviewData.title}
  //                     description={urlPreviewData.description}
  //                     image={urlPreviewData.image}
  //                     url={urlPreviewData.url}
  //                 />
  //             </View>
  //         );
  //     }

  //     return null;
  // }, [message?.repliedTo, showUrlPreview, urlPreviewData]);

  return (
    <View style={[styles.wrapper]}>
      {/* {propsContext.bubbleProps?.trailingAccessory && message?.itsMe && (
                <View>{propsContext.bubbleProps.trailingAccessory}</View>
            )} */}

      {!message?.itsMe && (
        <Image
          source={message?.user.avatar}
          style={[
            styles.avatar,
            {
              width: 40,
              height: 40,
              borderRadius: 40,
              marginTop: 'auto',
            },
          ]}
        />
      )}
      <View
        style={[
          bubbleBackgroundColor,
          styles.container,
          { padding: 10 },
          { marginStart: message?.itsMe ? 'auto' : undefined },
          {
            width:
              message?.media && message?.media?.length
                ? SIZES.MIN_IMAGE_WIDTH
                : undefined,
          },
          { maxWidth: SIZES.BUBBLE_CHAT_WIDTH },
        ]}
      >
        <>
          {/* {message?.repliedTo && (
                            <ReplyingTo
                                username={message?.repliedTo?.user.username}
                                text={message?.repliedTo.text}
                                messageId={message?.repliedTo.id}
                            />
                        )} */}

          <View>
            {renderMedia()}

            <ReactNativeParsedText parse={ALL_PATERNS_SHAPES}>
              {message?.text}
            </ReactNativeParsedText>
            {/* {renderUrlPreview} */}
            {renderFooter()}
          </View>
        </>
        {/* {renderCornerRounding()} */}
      </View>

      {message?.itsMe && (
        <Image
          source={message?.user?.avatar}
          style={[
            styles.avatarMe,
            {
              width: 40,
              height: 40,
              borderRadius: 40,
              marginTop: 'auto',
            },
          ]}
        />
      )}

      {/* {propsContext.bubbleProps?.trailingAccessory && !message?.me && (
                <View>{propsContext.bubbleProps.trailingAccessory}</View>
            )} */}
    </View>
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
    margin: 10,
    borderRadius: 10,
  },
  rightArrow: {
    position: 'absolute',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -7,
  },
  rightArrowOverlap: {
    position: 'absolute',
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },
  leftArrow: {
    position: 'absolute',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: 'absolute',
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
  date: {
    color: '#a8a8a8',
    fontSize: 11,
  },
  avatar: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 5,
    marginBottom: 15,
  },
  avatarMe: {
    marginRight: 10,
    marginBottom: 15,
  },
  bubbleFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
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
    width: SIZES.MIN_IMAGE_WIDTH - 20,
    height: SIZES.IMAGE_HEIGHT,
    borderRadius: 15,
  },
  backgroundOverlay: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
