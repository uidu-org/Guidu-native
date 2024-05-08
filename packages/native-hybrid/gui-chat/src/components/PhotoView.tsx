import { useMemo } from 'react';
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import { useChatContext } from '../context/WrapperContext';

export const PhotoView = ({ images }: { images: ImageSource[] }) => {
  const { setShowMedia, showMedia } = useChatContext();

  const currentIndex = useMemo(
    () => images.findIndex((image) => image.uri === showMedia),
    [images, showMedia]
  );

  return (
    <ImageView
      keyExtractor={(item, index) => index.toString()}
      images={images}
      imageIndex={currentIndex}
      visible={!!showMedia}
      onRequestClose={() => setShowMedia(undefined)}
    />
  );
};
