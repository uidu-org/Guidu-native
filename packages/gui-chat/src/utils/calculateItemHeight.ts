import { PixelRatio } from 'react-native';
import SIZES from '../constants/SIZES';
import { GMessage } from '../types';

const averageCharWidth = Math.ceil(PixelRatio.get());

const thresholdPercentage = 0.5; // Adjust threshold if needed

export const calculateMessageHeight = (
  message: GMessage,
  prevMessage: GMessage | null
) => {
  const text = message.text;

  const maxWidthMessage =
    SIZES.BUBBLE_CHAT_MAX_WIDTH -
    SIZES.BUBBLE_CHAT_PADDING * 2 -
    SIZES.BUBBLE_CHAT_MARGIN_HORIZONTAL * 2;
  // Split text into lines based on word boundaries

  const { lines } = calculateTextLayout(text, maxWidthMessage);

  const linesNumber = lines.length;
  let height = linesNumber * SIZES.BUBBLE_CHAT_LINE_HEIGHT;

  if (message?.media) {
    if (message.media.length === 2) {
      height += SIZES.IMAGE_HEIGHT * 2 + SIZES.BUBBLE_CHAT_GAP;
    } else {
      height += SIZES.IMAGE_HEIGHT;
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
      lines.length >= 2
        ? SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_MAX_HEIGHT
        : 55 + SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_MARGIN_BOTTOM;
  }

  const finalHeight =
    height +
    SIZES.BUBBLE_CHAT_FOOTER_HEIGHT +
    SIZES.BUBBLE_CHAT_MARGIN_VERTICAL;

  // console.log(
  //   'message_data',
  //   JSON.stringify(
  //     {
  //       linesNumber,
  //       message: message.text,
  //       finalHeight,
  //       replied: message.repliedTo?.id,
  //     },
  //     null,
  //     2
  //   )
  // );
  return finalHeight;
};

function calculateTextLayout(text: string, maxWidth: number) {
  const words = text.split(/\s+/);

  let lines = ['']; // Initialize lines with an empty line
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + ' ' + word;

    // Check if exceeding threshold percentage of max width
    if (testLine.length * averageCharWidth < maxWidth * thresholdPercentage) {
      currentLine = testLine.trim(); // Trim trailing whitespace
    } else {
      lines.push(currentLine.trim()); // Add current line to lines
      currentLine = word; // Start new line with current word
    }
  }

  // Add the last line (if any)
  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }

  return { lines, currentLine };
}
