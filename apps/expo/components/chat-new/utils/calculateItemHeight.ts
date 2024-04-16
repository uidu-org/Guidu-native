import { PixelRatio } from 'react-native';
import SIZES from '../constants/SIZES';
import { GMessage } from '../types';

const averageCharWidth = Math.ceil(PixelRatio.get());

const ADDITIONAL_PADDING = 30;

export const calculateMessageHeight = (
  message: GMessage,
  prevMessage: GMessage | null
) => {
  const textLength = message.text.length;
  const thresholdPercentage = 0.5;

  const maxWidth =
    SIZES.BUBBLE_CHAT_WIDTH -
    SIZES.BUBBLE_CHAT_PADDING -
    SIZES.BUBBLE_CHAT_MARGIN;

  const textWidth = textLength * averageCharWidth;

  const wrappedText = message.text.split(/\r?\n/);

  let linesNumber = wrappedText.length;
  for (const line of wrappedText) {
    linesNumber += Math.ceil((line.length * averageCharWidth) / maxWidth);
  }

  let height = linesNumber * SIZES.BUBBLE_CHAT_LINE_HEIGHT + ADDITIONAL_PADDING;

  if (message?.media) {
    if (message.media.length === 2) {
      return (height += SIZES.IMAGE_HEIGHT * 2);
    }

    return (height += SIZES.IMAGE_HEIGHT);
  }
  return height;
};
