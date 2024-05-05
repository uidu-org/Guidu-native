import { GuiText } from '@uidu/native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { replaceMentionValues } from 'react-native-controlled-mentions';
import { ParseShape } from 'react-native-parsed-text';
import { DialogHelper } from '../components/DialogHelper';

export const ALL_PATERNS_SHAPES: ParseShape[] = [
  {
    type: 'url',
    style: {
      color: 'blue',
    },
    onPress: (url, _index) => (
      <DialogHelper
        action={async () => await WebBrowser.openBrowserAsync(url)}
        description="open the url in a external tab"
        title="Open url"
      />
    ),
  },
  {
    pattern: /\B@\w+/g,
    style: {
      color: 'orange',
    },
    onPress: (mailTo, _index) => (
      <DialogHelper
        action={async () => Linking.openURL(`mailto:${mailTo}`)}
        description="open the mail in a external tab"
        title="Open mail"
      />
    ),
  },
  // {
  //   pattern: /#(\w+)/,
  //   style: {
  //     color: 'cyan',
  //   },
  //   onPress: (tag, _index) => Alert.alert(`${tag} has been pressed!`),
  // },
  {
    pattern: /@\[([^)]+)]\(([^)]+)\)/,
    style: {
      color: '#394876',
    },
    onPress: (prop, _index) => {
      const userId = extractIdFromMention(prop);
      console.log(userId);

      return (
        <GuiText backgroundColor={'red'} height={100}>
          {userId}
        </GuiText>
      );
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
    const name = match[1];
    return { userId: id, userName: name };
  }

  return null; // Return null if no match is found
}

// export const ALL_PATERNS_SHAPES: ParseShape[] = [
//   {
//     type: 'url',
//     style: {
//       color: 'blue',
//     },
//     onPress: (url, _index) => (
//       <DialogHelper
//         action={async () => await WebBrowser.openBrowserAsync(url)}
//         description="open the url in a external tab"
//         title="Open url"
//       />
//     ),
//   },
//   {
//     pattern: /\B@\w+/g,
//     style: {
//       color: 'orange',
//     },
//     onPress: (mailTo, _index) => (
//       <DialogHelper
//         action={async () => Linking.openURL(`mailto:${mailTo}`)}
//         description="open the mail in a external tab"
//         title="Open mail"
//       />
//     ),
//   },
//   // {
//   //   pattern: /#(\w+)/,
//   //   style: {
//   //     color: 'cyan',
//   //   },
//   //   onPress: (tag, _index) => Alert.alert(`${tag} has been pressed!`),
//   // },
//   {
//     pattern: /@\[([^)]+)]\(([^)]+)\)/,
//     style: {
//       color: '#394876',
//     },
//     onPress: (prop, _index) => {
//       const userId = extractIdFromMention(prop);
//       return (
//         <DialogHelper
//           action={async () => router.push(`/${userId}`)}
//           description="open the user info"
//           title="Open user tab"
//         />
//       );
//     },
//     renderText: (value) =>
//       replaceMentionValues(value, ({ name }) => `@${name}`),
//   },
// ];
