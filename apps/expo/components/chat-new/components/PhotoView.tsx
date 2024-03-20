import type { ViewSource } from '@muhammedkpln/react-native-image-viewing/dist/ImageViewing';
import { GuiText } from '@uidu/native';
import { useCallback } from 'react';
import _PhotoView from "react-native-image-viewing";
import { videoRef } from '../utils/videoRenderer';

interface IProps {
  views: ViewSource[];
  visible: boolean;
  imageIndex: number
  onRequestClose: () => void;
}

export const PhotoView = (props: IProps) => {
  const { onRequestClose } = props;

  const _onRequestClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current?.unloadAsync();
    }
    onRequestClose();
  }, [onRequestClose]);

  const _onImageIndexChange = useCallback(() => {
    if (videoRef.current) {
      videoRef.current?.unloadAsync();
    }
  }, []);

  <_PhotoView
    {...props}
    images={props.views}
    imageIndex={props.imageIndex}
    onRequestClose={_onRequestClose}
    onImageIndexChange={_onImageIndexChange}
    swipeToCloseEnabled
  />

  return <GuiText>hey</GuiText>

};
