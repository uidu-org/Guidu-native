
import { CheckCircle2 } from "@tamagui/lucide-icons";
import { Avatar, Button, Image, SizableText, Text, Theme, ThemeableStack, View, XStack, YStack } from "@uidu/native";
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, ImageBackground, InteractionManager, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { PhotoView } from './components/PhotoView';
import PhotoView from "react-native-image-viewing";
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import { MediaType, type GMessage } from "./types";


const ChatBubble = ({ message }: { message: GMessage }) => {
    const { text, user, itsMe } = message

    const [showMedia, setShowMedia] = useState<boolean>(false);
    const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(0)


    const createdAt = useMemo(() => {
        return message && dayjs(message.createdAt).format('HH:mm');
    }, [message]);


    const renderMedia = useCallback(() => {
        if (message?.media) {
            const photoViewCompatible: ImageSource[] = [];

            message.media.forEach((media) => {
                if (media.type === MediaType.Image) {
                    photoViewCompatible.push({
                        uri: media.uri,
                    });
                }

                // if (media.type === MediaType.Video) {
                //   photoViewCompatible.push({
                //     type: 'view',
                //     children: <VideoThumbnail media={media} isSelected />,
                //   });
                //   photoViewCompatible.push({
                //     type: 'view',
                //     children: <VideoThumbnail media={media} isSelected />,
                //   });
                // }
            });

            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {message?.media.map((media, index) => {
                        if (index < 3) {
                            return (
                                <TouchableOpacity onPress={() => { setImageIndex(photoViewCompatible); setShowMedia(true) }}>
                                    {media.type === MediaType.Image && mediaLoaded && (
                                        <View>
                                            <Image source={{ uri: media.uri }} style={styles.media} />
                                        </View>
                                    )}
                                    {/* {media.type === MediaType.Video && (
                                        <VideoThumbnail media={media} />
                                    )} */}
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
                                <View style={styles.backgroundOverlay}>
                                    <Text
                                        style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}
                                    >
                                        + {message.media.length - 3}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}


                    <PhotoView
                        imageIndex={imageIndex}
                        images={photoViewCompatible}
                        visible={showMedia}
                        onRequestClose={() => setShowMedia(false)}
                    />
                </View>
            );
        }

        return null;
    }, [mediaLoaded, message, showMedia]);


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

        // if (propsContext.enableUrlPreviews) {
        //   InteractionManager.runAfterInteractions(async () => {
        //     const url = extractUrlFromString(message?.text ?? '');

        //     if (url) {
        //       const data = await fetchMetaData(url);

        //       if (data) {
        //         setShowUrlPreview(true);
        //         setUrlPreviewData(data);
        //       }
        //     }
        //   });
        // }
    }, [message?.media, message?.text,]);

    return (
        <XStack
            fd={itsMe ? 'row-reverse' : 'row'}
            ai="flex-start"
            gap="$4"
            als={itsMe ? 'flex-end' : 'flex-start'}
            maw="100%"
            marginBottom={"$2"}
        >
            <Button
                size="$5"
                circular
                chromeless
            >
                <XStack>
                    <Avatar circular size="$3">
                        <Avatar.Image resizeMode="cover" source={user?.avatar} />
                        <Avatar.Fallback bc="$background" />
                    </Avatar>
                </XStack>
            </Button>
            <YStack
                ai={itsMe ? 'flex-end' : 'flex-start'}
                gap="$2"
                maw={400}
                jc="center"
                fs={1}
            >
                <Theme name={itsMe ? 'green_alt2' : 'gray_alt1'}>
                    <ThemeableStack
                        backgrounded
                        radiused
                        p="$4"
                        elevation={5}
                        fs={1}
                    >
                        {renderMedia()}
                        <SizableText size="$2" fs={1}>
                            {text}
                        </SizableText>
                    </ThemeableStack>
                </Theme>
                <XStack fd={itsMe ? 'row' : 'row-reverse'} gap="$2">
                    <SizableText size="$1" theme="alt1">
                        {dayjs(createdAt).format('dddd D MMM')}
                    </SizableText>
                    <CheckCircle2 size={16} color="green" />
                </XStack>
            </YStack >
        </XStack >
    )
}
export default React.memo(ChatBubble)


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