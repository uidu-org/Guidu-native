import { measureHeights } from '@bigbee.dev/expo-measure-text';
import { PixelRatio } from 'react-native';
import { replaceMentionValues } from 'react-native-controlled-mentions';

import SIZES from '../constants/SIZES';
import { GMessage } from '../types';

const averageCharWidth = Math.ceil(PixelRatio.get());
const MAGIC_NUMBER = 3;

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

  const cleanedText = replaceMentionValues(text, ({ name }) => `@${name}`);

  const testText = cleanedText.split('\n');

  const measuredHeight = measureHeights({
    texts: testText.length > 1 ? testText : [cleanedText],
    width: maxWidthMessage,
    lineHeight: SIZES.BUBBLE_CHAT_LINE_HEIGHT,
    fontSize: SIZES.BUBBLE_CHAT_FONT_SIZE,
    fontWeight: SIZES.BUBBLE_CHAT_FONT_WEIGHT,
  });

  if (message?.media) {
    if (message.media.length === 2) {
      height += SIZES.IMAGE_HEIGHT * 2 + SIZES.BUBBLE_CHAT_GAP * 2;
    } else {
      height += SIZES.IMAGE_HEIGHT + SIZES.BUBBLE_CHAT_GAP;
    }
  }

  if (message.repliedTo?.id) {
    const repliedcleanedText = replaceMentionValues(
      message.repliedTo?.text,
      ({ name }) => `@${name}`
    );
    const repliedTextTest = repliedcleanedText.split('\n');

    const maxWidthMessageReplayed =
      maxWidthMessage - SIZES.BUBBLE_CHAT_REPLIED_MESSAGE_PADDING * 2;
    const measuredRepliedMessageHeight = measureHeights({
      texts:
        repliedTextTest.length > 1 ? repliedTextTest : [repliedcleanedText],
      width: maxWidthMessageReplayed,
      lineHeight: SIZES.BUBBLE_CHAT_LINE_HEIGHT,
      fontSize: SIZES.BUBBLE_CHAT_FONT_SIZE,
      fontWeight: SIZES.BUBBLE_CHAT_FONT_WEIGHT,
      maxLines: 2,
    });
    const measuredRepliedMessageUserHeight = measureHeights({
      texts: [message.repliedTo?.user.name],
      width: maxWidthMessageReplayed,
      lineHeight: SIZES.BUBBLE_CHAT_LINE_HEIGHT,
      fontSize: SIZES.BUBBLE_CHAT_FONT_SIZE,
      fontWeight: 'bold',
      maxLines: 1,
    });
    const textLayoutRepliedMessageHeight = measuredRepliedMessageHeight.reduce(
      (accumulator, currentValue) => accumulator + currentValue + MAGIC_NUMBER,
      0
    );
    const textLayoutRepliedMessageUserHeight =
      measuredRepliedMessageUserHeight.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue + MAGIC_NUMBER,
        0
      );
    height +=
      SIZES.BUBBLE_CHAT_GAP +
      textLayoutRepliedMessageHeight +
      textLayoutRepliedMessageUserHeight +
      5;
  }

  const textLayoutHeight = measuredHeight.reduce(
    (accumulator, currentValue) => accumulator + currentValue + MAGIC_NUMBER,
    0
  );

  // if (testText.length > 1) {
  //   //! this is not accurate
  //   height += (testText.length / 2) * (SIZES.BUBBLE_CHAT_LINE_HEIGHT - 3);
  // }

  const finalHeight =
    height +
    textLayoutHeight +
    SIZES.BUBBLE_CHAT_FOOTER_HEIGHT +
    SIZES.BUBBLE_CHAT_MARGIN_VERTICAL * 2 +
    SIZES.BUBBLE_CHAT_PADDING * 2;

  // console.log(
  //   'calc_height',
  //   JSON.stringify(
  //     {
  //       measuredHeight,
  //     },
  //     null,
  //     2
  //   )
  // );

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

function removeMentionFilter(text: string) {
  const mentionRegex = /@\[([^\]]+)]\([^)]+\)/g;
  return text.replace(mentionRegex, (match, p1) => `@${p1}`);
}
