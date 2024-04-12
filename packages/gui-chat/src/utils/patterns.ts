import { Alert } from 'react-native';
import { replaceMentionValues } from 'react-native-controlled-mentions';
import { ParseShape } from 'react-native-parsed-text';

export const ALL_PATERNS_SHAPES: ParseShape[] = [
  {
    type: 'url',
    style: {
      color: 'blue',
    },
    onPress: (url, _index) => Alert.alert(`${url} has been pressed!`),
  },
  {
    pattern: /\B@\w+/g,
    style: {
      color: 'orange',
    },
    onPress: (mention, _index) => Alert.alert(`${mention} has been pressed!`),
  },
  {
    pattern: /#(\w+)/,
    style: {
      color: 'cyan',
    },
    onPress: (mention, _index) => Alert.alert(`${mention} has been pressed!`),
  },
  {
    pattern: /@\[([^)]+)]\(([^)]+)\)/,
    style: {
      color: '#394876',
    },
    onPress: (prop, _index) => {
      const userId = extractIdFromMention(prop);
      Alert.alert(`${userId} has been pressed!`);
    },
    renderText: (value) =>
      replaceMentionValues(value, ({ name }) => `@${name}`),
  },
];

/**
 * Load all the patterns and set the onPress function
 * @param onPress - (pattern: string, index: number) => void
 */
export function LoadAllPaternShapes(
  onPress: (pattern: string, index: number) => void
) {
  ALL_PATERNS_SHAPES.map((pattern) => {
    if (pattern?.onPress) return;

    pattern.onPress = onPress;
    Object.freeze(pattern);
  });
}

function extractIdFromMention(mentionText: string) {
  const mentionRegex = /@\[([^)]+)]\(([^)]+)\)/;
  const match = mentionText.match(mentionRegex);

  if (match) {
    const id = match[2];
    return id;
  }

  return null; // Return null if no match is found
}
