import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  InteractionManager,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Video } from './Video';
import type { IMedia } from './types/Chatty.types';

interface IProps {
  media: IMedia;
  isSelected?: boolean;
}

export function VideoThumbnail({ media, isSelected }: IProps) {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [showThumbnail, setShowThumbnail] = useState(false);

  useEffect(() => {
    return () => {
      setShowVideo(false);
    };
  }, []);

  const onPressThumbnail = useCallback(() => {
    setShowVideo(true);
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (media?.videoOptions?.thumbnail) {
        Image.prefetch(media?.videoOptions?.thumbnail).then(() => {
          setShowThumbnail(true);
        });
      } else {
        setShowThumbnail(true);
      }
    });
  }, [media?.videoOptions?.thumbnail]);

  if (showVideo) {
    return <Video media={media} />;
  }

  if (!showThumbnail) {
    <View style={styles.spinner}>
      <ActivityIndicator size="small" />
    </View>;
  }

  return (
    <TouchableWithoutFeedback
      onPress={isSelected ? onPressThumbnail : () => null}
    >
      <ImageBackground
        source={{
          uri: media?.videoOptions?.thumbnail,
        }}
        style={!isSelected ? styles.container : styles.isSelecetedContainer}
        imageStyle={styles.contentContainer}
      >
        <View style={styles.overlay} />
        <Image
          source={{
            uri: "https://w7.pngwing.com/pngs/244/695/png-transparent-play-icon-video-player-information-play-icon-miscellaneous-angle-text-thumbnail.png"
          }}
          style={!isSelected ? styles.image : styles.isSelectedImage}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  isSelecetedContainer: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  contentContainer: {
    borderRadius: 15,
  },
  image: {
    width: 25,
    height: 25,
  },
  isSelectedImage: {
    width: 50,
    height: 50,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
