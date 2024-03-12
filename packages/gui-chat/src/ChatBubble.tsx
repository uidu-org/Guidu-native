import type { ViewSource } from '@muhammedkpln/react-native-image-viewing/dist/ImageViewing';
import { GuiText, GuiView } from '@uidu/native';
import dayjs from 'dayjs';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import { PropsContext } from './Chatty';
import { PhotoView } from './components/PhotoView';
import { ReplyingTo } from './components/ReplyingTo';
import { UrlPreviewBubble } from './components/UrlPreviewBubble';
import { VideoThumbnail } from './components/VideoThumbnail';
import {
  IChatBubble,
  IMessage,
  IUrlPreviewBubble,
  MediaType,
  MessageStatus,
} from './components/types/Chatty.types';
import { ChatEmitter } from './utils/eventEmitter';
import { extractUrlFromString, fetchMetaData } from './utils/helpers';
import {
  ALL_PATERNS_SHAPES,
  HASHTAG_PATTERN_SHAPE,
  LoadAllPaternShapes,
  MENTION_PATTERN_SHAPE,
  URL_PATTERN_SHAPE,
  loadParsedText,
} from './utils/patterns';
import { ContextMenuWrapper } from './wrappers/ContextMenuWrapper';

const ParsedText = loadParsedText();

function _ChatBubble(props: IChatBubble) {
  const { message, children } = props;
  const propsContext = useContext(PropsContext);
  const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
  const [showMedia, setShowMedia] = useState<boolean>(false);
  const [showUrlPreview, setShowUrlPreview] = useState(false);
  const [urlPreviewData, setUrlPreviewData] = useState<IUrlPreviewBubble>();
  const createdAt = useMemo(() => {
    return message && dayjs(message.createdAt).format('HH:mm');
  }, [message]);

  const avatarSize = useMemo(() => {
    return {
      width: propsContext.bubbleProps?.showAvatars?.width || 40,
      height: propsContext.bubbleProps?.showAvatars?.width || 40,
      borderRadius: propsContext.bubbleProps?.showAvatars?.width || 40,
    };
  }, [propsContext.bubbleProps?.showAvatars?.width]);

  const bubbleBackgroundColor = useMemo<ViewStyle>(() => {
    if (propsContext.bubbleProps?.containerStyle) {
      if (message?.me) {
        return {
          backgroundColor:
            propsContext?.bubbleProps?.selfBubbleColor ?? '#afddfa',
          ...propsContext.bubbleProps.containerStyle,
        };
      } else {
        return {
          backgroundColor:
            propsContext?.bubbleProps?.otherBubbleColor ?? '#c8faaf',

          ...propsContext.bubbleProps.containerStyle,
        };
      }
    }

    if (message?.me) {
      return {
        backgroundColor:
          propsContext?.bubbleProps?.selfBubbleColor ?? '#afddfa',
      };
    }

    return {
      backgroundColor: propsContext?.bubbleProps?.otherBubbleColor ?? '#c8faaf',
    };
  }, [
    message?.me,
    propsContext?.bubbleProps?.otherBubbleColor,
    propsContext?.bubbleProps?.selfBubbleColor,
    propsContext.bubbleProps?.containerStyle,
  ]);

  const bubbleAlignment = useMemo<ViewStyle>(() => {
    if (message?.me) {
      return {
        alignSelf: 'flex-end',
      };
    }

    return {
      alignSelf: 'flex-start',
    };
  }, [message?.me]);

  useEffect(() => {
    if (message?.media) {
      message.media.forEach((media) => {
        if (media.type === MediaType.Image) {
          InteractionManager.runAfterInteractions(() => {
            Image.prefetch(media.uri).then(() => {
              setMediaLoaded(true);
            });
          });
        }
      });
    }

    if (propsContext.enableUrlPreviews) {
      InteractionManager.runAfterInteractions(async () => {
        const url = extractUrlFromString(message?.text ?? '');

        if (url) {
          const data = await fetchMetaData(url);

          if (data) {
            setShowUrlPreview(true);
            setUrlPreviewData(data);
          }
        }
      });
    }
  }, [message?.media, message?.text, propsContext.enableUrlPreviews]);

  const onPressPattern = useCallback(
    (pattern: string, index: number) => {
      if (!message) return;
      ChatEmitter?.emit('patternPressed', pattern, index, message);
    },
    [message]
  );

  const messagePatterns = useMemo(() => {
    const patterns: any[] = [];

    if (!propsContext?.enablePatterns) return;
    if (!ParsedText) return;

    LoadAllPaternShapes(onPressPattern);

    if (propsContext.patternProps?.customPatterns) {
      patterns.push(...propsContext.patternProps.customPatterns);
    }

    if (propsContext?.patternProps?.allowPatterns) {
      propsContext.patternProps.allowPatterns.forEach((pattern) => {
        switch (pattern) {
          case 'hashtag':
            patterns.push(HASHTAG_PATTERN_SHAPE);
            break;
          case 'mention':
            patterns.push(MENTION_PATTERN_SHAPE);
            break;
          case 'url':
            patterns.push(URL_PATTERN_SHAPE);
            break;
        }
      });
    } else {
      ALL_PATERNS_SHAPES.forEach((pattern) => patterns.push(pattern));
    }

    return patterns;
  }, [
    onPressPattern,
    propsContext?.enablePatterns,
    propsContext?.patternProps?.allowPatterns,
    propsContext?.patternProps?.customPatterns,
  ]);

  const renderTicks = useCallback(() => {
    if (message?.status) {
      switch (message.status) {
        case MessageStatus.Sending:
          return (
            propsContext.bubbleProps?.tickProps?.sendingElement ?? (
              <GuiText>🔄</GuiText>
            )
          );

        case MessageStatus.Sent:
          return (
            propsContext.bubbleProps?.tickProps?.sentElement ?? <GuiText>✔</GuiText>
          );

        case MessageStatus.Delivered:
          return (
            propsContext.bubbleProps?.tickProps?.deliveredElement ?? (
              <GuiText>☑</GuiText>
            )
          );

        case MessageStatus.Read:
          return (
            propsContext.bubbleProps?.tickProps?.readElement ?? <GuiText>✅</GuiText>
          );
      }
    }

    return null;
  }, [
    message?.status,
    propsContext.bubbleProps?.tickProps?.deliveredElement,
    propsContext.bubbleProps?.tickProps?.readElement,
    propsContext.bubbleProps?.tickProps?.sendingElement,
    propsContext.bubbleProps?.tickProps?.sentElement,
  ]);

  const renderFooter = useCallback(() => {
    return (
      <GuiView style={styles.bubbleFooter}>
        <GuiText
          style={[
            styles.date,
            propsContext?.bubbleProps?.dateStyle &&
              propsContext?.bubbleProps?.dateStyle!(message?.me ?? false),
          ]}
        >
          {createdAt}
        </GuiText>
        {renderTicks()}
      </GuiView>
    );
  }, [
    createdAt,
    message?.me,
    propsContext?.bubbleProps?.dateStyle,
    renderTicks,
  ]);

  const renderCornerRounding = useCallback(() => {
    if (propsContext.bubbleProps?.enableCornerRounding === false) return null;

    if (message?.me) {
      return (
        <>
          <GuiView style={[styles.rightArrow, bubbleBackgroundColor]}></GuiView>
          <GuiView
            style={[
              styles.rightArrowOverlap,
              {
                backgroundColor:
                  propsContext.listProps?.containerStyle?.backgroundColor ??
                  '#fff',
              },
            ]}
          ></GuiView>
        </>
      );
    } else {
      return (
        <>
          <GuiView style={[styles.leftArrow, bubbleBackgroundColor]}></GuiView>
          <GuiView
            style={[
              styles.leftArrowOverlap,
              {
                backgroundColor:
                  propsContext.listProps?.containerStyle?.backgroundColor ??
                  '#fff',
              },
            ]}
          ></GuiView>
        </>
      );
    }
  }, [
    bubbleBackgroundColor,
    message?.me,
    propsContext.bubbleProps?.enableCornerRounding,
    propsContext.listProps?.containerStyle?.backgroundColor,
  ]);

  const renderMedia = useCallback(() => {
    if (message?.media) {
      const photoViewCompatible: ViewSource[] = [];

      message.media.forEach((media) => {
        if (media.type === MediaType.Image) {
          photoViewCompatible.push({
            type: 'image',
            source: {
              uri: media.uri,
            },
          });
        }

        if (media.type === MediaType.Video) {
          photoViewCompatible.push({
            type: 'view',
            children: <VideoThumbnail media={media} isSelected />,
          });
          photoViewCompatible.push({
            type: 'view',
            children: <VideoThumbnail media={media} isSelected />,
          });
        }
      });

      return (
        <GuiView style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {message?.media.map((media, index) => {
            if (index < 3) {
              return (
                <TouchableOpacity onPress={() => setShowMedia(true)}>
                  {media.type === MediaType.Image && mediaLoaded && (
                    <GuiView>
                      <Image source={{ uri: media.uri }} style={styles.media} />
                    </GuiView>
                  )}
                  {media.type === MediaType.Video && (
                    <VideoThumbnail media={media} />
                  )}
                </TouchableOpacity>
              );
            }

            return null;
          })}

          {message.media.length > 3 && (
            <TouchableOpacity onPress={() => setShowMedia(true)}>
              <ImageBackground
                style={styles.media}
                source={{ uri: message.media[3]?.uri }}
                imageStyle={{
                  borderRadius: 15,
                }}
              >
                <GuiView style={styles.backgroundOverlay}>
                  <GuiText
                    style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}
                  >
                    + {message.media.length - 3}
                  </GuiText>
                </GuiView>
              </ImageBackground>
            </TouchableOpacity>
          )}

          {showMedia && (
            <PhotoView
              views={photoViewCompatible}
              visible={showMedia}
              onRequestClose={() => setShowMedia(false)}
            />
          )}
        </GuiView>
      );
    }

    return null;
  }, [mediaLoaded, message, showMedia]);

  const renderUrlPreview = useMemo(() => {
    if (showUrlPreview && urlPreviewData && !message?.repliedTo) {
      return (
        <GuiView style={{ marginTop: 10 }}>
          <UrlPreviewBubble
            title={urlPreviewData.title}
            description={urlPreviewData.description}
            image={urlPreviewData.image}
            url={urlPreviewData.url}
          />
        </GuiView>
      );
    }

    return null;
  }, [message?.repliedTo, showUrlPreview, urlPreviewData]);

  return (
    <GuiView style={[styles.wrapper, bubbleAlignment]}>
      {propsContext.bubbleProps?.trailingAccessory && message?.me && (
        <GuiView>{propsContext.bubbleProps.trailingAccessory}</GuiView>
      )}

      {propsContext.bubbleProps?.showAvatars?.visible && !message?.me && (
        <Image
          source={
            message?.user.avatar ?? {
              uri: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-372-456324.png',
            }
          }
          style={[styles.avatar, avatarSize]}
        />
      )}

      <ContextMenuWrapper message={message as IMessage}>
        <GuiView
          style={[
            bubbleBackgroundColor,
            styles.container,
            propsContext.bubbleProps?.containerStyle,
            { padding: message?.repliedTo ? 5 : 15 },
          ]}
        >
          {children ? (
            children
          ) : (
            <>
              {message?.repliedTo && (
                <ReplyingTo
                  username={message?.repliedTo?.user.username}
                  text={message?.repliedTo.text}
                  messageId={message?.repliedTo.id}
                />
              )}

              {propsContext?.enablePatterns && ParsedText ? (
                <>
                  {renderMedia()}

                  <ParsedText
                    parse={messagePatterns}
                    style={
                      propsContext?.bubbleProps?.labelStyle &&
                      propsContext.bubbleProps?.labelStyle(message?.me ?? false)
                    }
                  >
                    {message?.text}
                  </ParsedText>
                  {renderUrlPreview}
                  {renderFooter()}
                </>
              ) : (
                <GuiView>
                  {renderMedia()}

                  <GuiText
                    style={
                      propsContext?.bubbleProps?.labelStyle &&
                      propsContext.bubbleProps?.labelStyle(message?.me ?? false)
                    }
                  >
                    {message?.text}
                  </GuiText>
                  {renderUrlPreview}
                  {renderFooter()}
                </GuiView>
              )}
            </>
          )}
          {renderCornerRounding()}
        </GuiView>
      </ContextMenuWrapper>

      {propsContext.bubbleProps?.showAvatars?.visible && message?.me && (
        <Image
          source={
            message?.user.avatar ?? {
              uri: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-372-456324.png',
            }
          }
          style={[styles.avatarMe, avatarSize]}
        />
      )}

      {propsContext.bubbleProps?.trailingAccessory && !message?.me && (
        <GuiView>{propsContext.bubbleProps.trailingAccessory}</GuiView>
      )}
    </GuiView>
  );
}

export const ChatBubble = React.memo(_ChatBubble);

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    margin: 20,
    maxWidth: Dimensions.get('screen').width - 120,
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
  },
  avatarMe: {
    marginRight: 10,
  },
  bubbleFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 5,
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
    width: 110,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  backgroundOverlay: {
    width: 110,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
