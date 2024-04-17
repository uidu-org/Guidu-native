import { faker } from '@faker-js/faker';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { GMessage, GuiChat } from '../../components/chat-new';

export default function DocsChatPage() {
  const listRef = useRef(null);

  const fakeUsers: GMessage[] = useMemo(
    () =>
      new Array(20).fill(null).map(() => ({
        id: faker.number.int({ max: 99999 }),
        text: faker.lorem.sentence(),
        itsMe: faker.datatype.boolean(),
        createdAt: faker.date.anytime(),
        user: {
          id: faker.number.int({ max: 99999 }),
          name: faker.person.fullName(),
          avatar: { uri: faker.image.avatar() },
        },
        ...(faker.datatype.boolean() && {
          media: Array.from({ length: 3 }).map(() => ({
            uri: faker.image.url(),
            // type: 0, // Add type property if needed
          })),
        }),
        ...(faker.datatype.boolean() && {
          repliedTo: {
            id: faker.number.int({ max: 99999 }),
            text: faker.lorem.sentence(),
            itsMe: faker.datatype.boolean(),
            createdAt: faker.date.anytime(),
            user: {
              id: faker.number.int({ max: 99999 }),
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
      })),
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
    listRef.current.appendMessage({
      id: messages.length + 1,
      text: text,
      itsMe: true,
      createdAt: new Date(),
      user: currentUser,
      ...(repliedTo && {
        repliedTo: repliedTo,
      }),
    });
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
      />
    </>
  );
}

const currentUser = {
  id: 1,
  name: 'John Doe',
  avatar: { uri: 'https://i.pravatar.cc/300' },
};
