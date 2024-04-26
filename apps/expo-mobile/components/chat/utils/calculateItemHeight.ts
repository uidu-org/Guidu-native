import { PixelRatio } from 'react-native';
import SIZES from '../constants/SIZES';

import { measureHeights } from '@bigbee.dev/expo-measure-text';
import { GMessage } from '../types';

const averageCharWidth = Math.ceil(PixelRatio.get());

const normalThresholdPercentage = 0.51;
const linkThresholdPercentage = 0.9;

export const calculateMessageHeight = (
  message: GMessage,
  prevMessage: GMessage | null
) => {
  const { text } = message;
  let height = 0;
  const maxWidthMessage =
    SIZES.BUBBLE_CHAT_MAX_WIDTH - SIZES.BUBBLE_CHAT_PADDING * 2;

  const measuredHeight = measureHeights({
    texts: [text],
    width: maxWidthMessage,
    lineHeight: SIZES.BUBBLE_CHAT_LINE_HEIGHT,
  });

  if (message?.media) {
    if (message.media.length === 2) {
      height += SIZES.IMAGE_HEIGHT * 2 + SIZES.BUBBLE_CHAT_GAP * 2;
    } else {
      height += SIZES.IMAGE_HEIGHT + SIZES.BUBBLE_CHAT_GAP;
    }
  }

  if (message.repliedTo?.id) {
    const maxWidthMessageReplayed =
      maxWidthMessage - SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_PADDING * 2;
    const { lines } = calculateTextLayout(
      message.repliedTo.text,
      maxWidthMessageReplayed
    );

    height +=
      SIZES.BUBBLE_CHAT_GAP + lines.length >= 2
        ? SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_MAX_HEIGHT
        : 55 + SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_MARGIN_BOTTOM;
  }

  const textLayoutHeight = measuredHeight.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const finalHeight =
    height +
    textLayoutHeight +
    SIZES.BUBBLE_CHAT_FOOTER_HEIGHT +
    SIZES.BUBBLE_CHAT_MARGIN_VERTICAL * 2 +
    SIZES.BUBBLE_CHAT_PADDING * 2;

  return Math.ceil(finalHeight);
};

function calculateTextLayout(text: string, maxWidth: number) {
  if (!text) {
    return { lines: [] };
  }

  const words = text.split(/\s+/);

  let lines = []; // Initialize lines with an empty line
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + ' ' + word;

    // Check if current word is a link (assuming valid URL format)
    if (/^https?:\/\/\S+$/.test(word)) {
      if (
        testLine.length * averageCharWidth <
        maxWidth * linkThresholdPercentage
      ) {
        currentLine = testLine.trim();
      } else {
        console.log('maggiore', testLine);
        lines.push(currentLine.trim());
        currentLine = word;
      }
      if (word.length * averageCharWidth > maxWidth) {
        console.log('huge link');

        lines.push(`huge link: ${word}`);
      }
    } else {
      // For non-links, use the threshold logic
      if (
        testLine.length * averageCharWidth <
        maxWidth * normalThresholdPercentage
      ) {
        currentLine = testLine.trim(); // Trim trailing whitespace
      } else {
        lines.push(currentLine.trim()); // Add current line to lines
        currentLine = word; // Start new line with current word
      }
    }
  }

  // Add the last line (if any)
  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }

  return { lines };
}
