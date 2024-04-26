import { GMessage, GuiChat } from '@/components/chat';
import { faker } from '@faker-js/faker';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';

export default function DocsChatPage() {
  const listRef = useRef(null);

  const fakeUsers: GMessage[] = useMemo(
    () =>
      new Array(50).fill(null).map(() => {
        const text = faker.lorem.sentence();
        const hasLink = faker.datatype.boolean(); // Determine if the sentence will have a link

        // Function to generate a random link
        const generateLink = () => ({
          uri: faker.internet.url(),
          // type: 0, // Add type property if needed
        });

        // Add a link if 'hasLink' is true
        const link = hasLink ? generateLink() : null;

        return {
          id: faker.number.int({ max: 99999 }).toString(),
          text: hasLink ? `${text}: ${link?.uri}` : text,
          itsMe: faker.datatype.boolean(),
          createdAt: faker.date.anytime(),
          user: {
            id: faker.number.int({ max: 99999 }).toString(),
            name: faker.person.fullName(),
            avatar: { uri: faker.image.avatar() },
          },
          ...(faker.datatype.boolean() && {
            media: Array.from({
              length: Math.floor(Math.random() * 3) + 1,
            }).map(() => ({
              uri: faker.image.url(),
              // type: 0, // Add type property if needed
            })),
          }),
          ...(faker.datatype.boolean() && {
            repliedTo: {
              id: faker.number.int({ max: 99999 }).toString(),
              text: faker.lorem.sentence(),
              itsMe: faker.datatype.boolean(),
              createdAt: faker.date.anytime(),
              user: {
                id: faker.number.int({ max: 99999 }).toString(),
                name: faker.person.fullName(),
                avatar: { uri: faker.image.avatar() },
              },
              ...(faker.datatype.boolean() && {
                media: Array.from({
                  length: Math.floor(Math.random() * 2) + 1,
                }).map(() => ({
                  uri: faker.image.url(),
                })),
              }),
            },
          }),
        };
      }),
    []
  );

  const [messages, setMessages] = useState<GMessage[]>(fakeUsers);

  const mentions = useMemo(() => {
    return messages.map((m) => m.user);
  }, [messages]);

  const message = useRef<string>('');

  const _onPressSend = useCallback((text: string, repliedTo?: GMessage) => {
    console.log('testo parent', text);

    //@ts-ignore
    setMessages((prev) => [
      ...prev,
      {
        id: messages.length + 1,
        text: text,
        itsMe: true,
        createdAt: new Date(),
        user: currentUser,
        ...(repliedTo && {
          repliedTo: repliedTo,
        }),
      },
    ]);

    console.log('message send');
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <GuiChat
        ref={listRef}
        mentions={mentions}
        currentUser={currentUser}
        messages={messages}
        // onChangeText={onChangeText}
        onPressSend={_onPressSend}
        forceNonDeterministicRendering
      />
    </>
  );
}

const currentUser = {
  id: '1',
  name: 'John Doe',
  avatar: { uri: 'https://i.pravatar.cc/300' },
};
