import { faker } from '@faker-js/faker';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { GuiChat, type GMessage } from '../../components/chat-new';


export default function DocsChatPage() {

    const [text, setText] = useState("")

    const fakeUsers: GMessage[] = useMemo(() => (
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
                media: [{
                    uri: faker.image.url(),
                    type: 0
                }]
            })
        }))
    ), []);

    const [messages, setMessages] = useState<GMessage[]>
        (fakeUsers)

    const mentions = useMemo(() => {
        return messages.map((m) => m.user)
    }, [messages])
    return (
        <>
            <Stack.Screen options={{
                headerShown: false
            }} />
            <GuiChat
                mentions={mentions}
                currentUser={{
                    id: 1,
                    name: "John Doe",
                    avatar: { uri: "https://i.pravatar.cc/300" },
                }} messages={messages} onChangeText={setText} value={text} />
        </>
    )
}

const newMessage = {
    id: 11,
    text: "new message",
    itsMe: true,
    createdAt: new Date("2024-03-05T00:00:00"),
    user: {
        id: 1,
        username: "John Doe",
        avatar: { uri: "https://i.pravatar.cc/300" },
    }
}