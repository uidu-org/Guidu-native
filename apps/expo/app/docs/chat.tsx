import { faker } from '@faker-js/faker';
import { GuiChat, type GMessage } from '@uidu/gui-chat';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';

export default function DocsChatPage() {
  const fakeUsers: GMessage[] = useMemo(
    () =>
      new Array(70).fill(null).map(() => ({
        id: faker.number.int({ max: 99999 }),
        text: faker.lorem.sentence(), // Consider using sentence() for chat messages
        itsMe: faker.datatype.boolean(),
        createdAt: faker.date.anytime(),
        user: {
          id: faker.number.int({ max: 99999 }),
          username: faker.person.fullName(),
          avatar: { uri: faker.image.avatar() },
        },
        // ...(faker.datatype.boolean() && {
        //     media: [{
        //         uri: faker.image.url(),
        //         type: 0
        //     }]
        // })
      })),
    []
  );

  const message = useRef<string>('');
  const listRef = useRef(null);

  const fakeUsers: GMessage[] = useMemo(
    () =>
      new Array(70).fill(null).map(() => ({
        id: faker.number.int({ max: 99999 }),
        text: faker.lorem.sentence(), // Consider using sentence() for chat messages
        itsMe: faker.datatype.boolean(),
        createdAt: faker.date.anytime(),
        user: {
          id: faker.number.int({ max: 99999 }),
          name: faker.person.fullName(),
          avatar: { uri: faker.image.avatar() },
        },
        ...(faker.datatype.boolean() && {
          media: [
            {
              uri: faker.image.url(),
              type: 0,
            },
          ],
        }),
      })),
    []
  );

  const [messages, setMessages] = useState<GMessage[]>(fakeUsers);

  const mentions = useMemo(() => {
    return messages.map((m) => m.user);
  }, [messages]);

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
    console.log('hey');
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

const newMessage = {
  id: 11,
  text: 'new message',
  itsMe: true,
  createdAt: new Date('2024-03-05T00:00:00'),
  user: {
    id: 1,
    username: 'John Doe',
    avatar: { uri: 'https://i.pravatar.cc/300' },
  },
};
