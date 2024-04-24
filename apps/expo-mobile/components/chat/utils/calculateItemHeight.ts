import { PixelRatio } from 'react-native';
import SIZES from '../constants/SIZES';
import { GMessage } from '../types';

const averageCharWidth = Math.ceil(PixelRatio.get());

const thresholdPercentage = 0.51; // Adjust threshold if needed

export const calculateMessageHeight = (
  message: GMessage,
  prevMessage: GMessage | null
) => {
  const { text } = message;
  let height = 0;
  const maxWidthMessage =
    SIZES.BUBBLE_CHAT_MAX_WIDTH - SIZES.BUBBLE_CHAT_PADDING * 2;

  // Split text into lines based on word boundaries
  const { lines, links } = calculateTextLayout(text, maxWidthMessage);

  const linesNumber = lines.length;
  if (linesNumber) {
    height = +linesNumber * (SIZES.BUBBLE_CHAT_LINE_HEIGHT + 3);
  }

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

  const finalHeight =
    height +
    SIZES.BUBBLE_CHAT_FOOTER_HEIGHT +
    SIZES.BUBBLE_CHAT_MARGIN_VERTICAL * 2 +
    SIZES.BUBBLE_CHAT_PADDING * 2;

  // console.log(
  //   'message_calc_data',
  //   JSON.stringify(
  //     {
  //       message: message.text,
  //       finalHeight,
  //       linesNumber,
  //       links,
  //     },
  //     null,
  //     2
  //   )
  // );
  return Math.ceil(finalHeight);
};

function calculateTextLayout(text: string, maxWidth: number) {
  if (!text) {
    return { lines: [], links: [] };
  }

  const links: string[] = [];

  const textWithoutLinks = text.replace(/\bhttps?:\/\/\S+\b/g, (match) => {
    links.push(match); // Save the link
    return ''; // Replace the link with an empty string
  });

  const words = textWithoutLinks.split(/\s+/);

  let lines = []; // Initialize lines with an empty line
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

  for (const link of links) {
    const lastLine = currentLine.length > 0 ? currentLine.trim() : '';
    const linkWidth = (link.length + lastLine.length) * averageCharWidth;
    const numLines = Math.ceil(linkWidth / maxWidth);
    for (let i = 1; i < numLines; i++) {
      lines.push(''); // Add empty lines for the link
    }
  }

  return { lines, links };
}

function calculateTextLayout1(text: string, maxWidth: number) {
  const words = text.split(/\s+/);

  let lines = []; // Initialize lines with an empty line
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
