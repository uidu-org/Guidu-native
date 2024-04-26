import { GMessage, GuiChat } from '@/components/chat';
import { faker } from '@faker-js/faker';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';

export default function DocsChatPage() {
  const listRef = useRef(null);

  const fakeUsers: GMessage[] = useMemo(
    () =>
      new Array(1).fill(null).map(() => {
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

  const [messages, setMessages] = useState<GMessage[]>([
    ...fakeUsers,
    {
      id: faker.number.int({ max: 99999 }).toString(),
      text: textProva,
      itsMe: faker.datatype.boolean(),
      createdAt: faker.date.anytime(),
      user: {
        id: faker.number.int({ max: 99999 }).toString(),
        name: faker.person.fullName(),
        avatar: { uri: faker.image.avatar() },
      },
    },
  ]);

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

const textProva = `Hello bando da Fondazione Brodolini che offre 20k per digitalizzazione.\nIn the framework of the European project SocialTech4EU we have launched a call for social enterprises across Europe, to apply for financial support for training. If selected in this call, the enterprises will also be able to compete for additional funding for innovation and acceleration.\nWe also launched an invitation for stakeholders and providers to join the project registry, which will be used by the social enterprises to purchase their services.\nThe news is now on FGB’s website (https://www.fondazionebrodolini.it/en/news-and-events/socialtech4eu-lookout-social-enterprises-and-stakeholders, https://www.fondazionebrodolini.it/news-ed-eventi/socialtech4eu-cerca-imprese-stakeholder-economia-sociale) and social media.\nWe kindly ask you to help us share the call/invitation\nwithin your networks.\nPrimary countries are Italy, Spain, Belgium, Germany, Romania and Sweden, but we also have to select at least 10 enterprises and 10 stakeholders/providers from other EU countries, so any help with this is mostly welcome.\nThanks a lot, and you can email me at menozzi@fondazionebrodolini.eu for any question or info.\nChe ne pensate? Se lo vincessimo questo comunque rientrerebbe negli obiettivi di budget anche se indiretti. Non abbiamo una cerchia per le Application, non so se può aver senso farla e nel caso creiamo una cerchia!`;
