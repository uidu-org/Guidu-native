import { RenderVideoExpo, videoRef } from '../utils/videoRenderer';
import type { IMedia } from './types/Chatty.types';

interface IProps {
  media: IMedia;
}

export const Video = ({ media }: IProps) => {
  return (
    <RenderVideoExpo
      source={{ uri: media.uri, ...media?.videoOptions?.headers }}
      style={{
        width: 300,
        height: 300,
      }}
      pictureInPicture={media?.videoOptions?.pictureInPicture}
      resizeMode="contain"
      useNativeControls
      shouldPlay
      ref={videoRef}
      {...media?.videoOptions}
    />
  );
};
