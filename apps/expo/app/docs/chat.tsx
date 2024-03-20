import { useRef, useState } from 'react';
import { GuiChat, type GMessage } from '../../components/chat-new';

export default function DocsChatPage() {
    const [messages, setMessages] = useState<GMessage[]>
        ([
            {
                id: "1",
                text: 'Hello',
                itsMe: true,
                createdAt: new Date(),
                user: {
                    id: 1,
                    username: 'John Doe',
                    avatar: { uri: 'https://i.pravatar.cc/300' },
                },
                media: [
                    {
                        type: 0,
                        uri: "https://i.pravatar.cc/300",
                    },
                    {
                        type: 0,
                        uri: "https://i.pravatar.cc/300",
                    },
                    {
                        type: 0,
                        uri: "https://i.pravatar.cc/301",
                    },
                    {
                        type: 0,
                        uri: "https://i.pravatar.cc/300",
                    },
                    {
                        type: 0,
                        uri: "https://i.pravatar.cc/300",
                    },
                    {
                        type: 0,
                        uri: "https://i.pravatar.cc/300",
                    },
                ]
            },
            {
                id: "2",
                text: 'Hi there!',
                itsMe: false,
                createdAt: new Date("2024-03-18T09:00:00Z"), // Yesterday at 9:00 AM UTC
                user: {
                    id: 2,
                    username: 'Jane Smith',
                    avatar: { uri: 'https://i.pravatar.cc/200' },
                },
                media: [
                    {
                        type: 0,
                        uri: "https://i.pravatar.cc/300",
                    },
                ]
            },
            {
                id: "3",
                text: 'How are you doing?',
                itsMe: true,
                createdAt: new Date("2024-03-17T15:30:00 PST"), // Two days ago at 3:30 PM PST
                user: {
                    id: 1,
                    username: 'John Doe',
                    avatar: { uri: 'https://i.pravatar.cc/300' },
                }
            },
            {
                id: "4",
                text: 'Great to hear from you!',
                itsMe: false,
                createdAt: new Date(Date.now() + (1000 * 60 * 60)), // One hour from now
                user: {
                    id: 2,
                    username: 'Jane Smith',
                    avatar: { uri: 'https://i.pravatar.cc/200' },
                },
            },
            {
                id: "5",
                text: 'Just checking in!',
                itsMe: false,
                createdAt: new Date("2024-03-16 00:00:00"),  // Last Sunday at midnight
                user: {
                    id: 3,
                    username: 'Alice Jones',
                    avatar: { uri: 'https://i.pravatar.cc/150' },
                }
            },
            {
                id: "6",
                text: 'On my way!',
                itsMe: true,
                createdAt: new Date("2024-07-20T00:00:00"),
                user: {
                    id: 1,
                    username: 'John Doe',
                    avatar: { uri: 'https://i.pravatar.cc/300' },
                }
            },
            {
                id: "7",
                text: 'See you soon!',
                itsMe: false,
                createdAt: new Date("2024-03-20T00:00:00"), // Tomorrow at midnight
                user: {
                    id: 2,
                    username: 'Jane Smith',
                    avatar: { uri: 'https://i.pravatar.cc/200' },
                }
            },
            {
                id: "8",
                text: "Sending you a photo!",
                itsMe: true,
                createdAt: new Date(Date.parse("2024-03-15T12:34:56")), // Specific date and time with parsing
                user: {
                    id: 1,
                    username: "John Doe",
                    avatar: { uri: "https://i.pravatar.cc/300" },
                },
            },
            {
                id: "9",
                text: "What's up?",
                itsMe: false,
                createdAt: (function () {
                    const today = new Date();
                    today.setDate(today.getDate() - Math.floor(Math.random() * 7)); // Random date within the last week
                    return today;
                })(),
                user: {
                    id: 2,
                    username: "Jane Smith",
                    avatar: { uri: "https://i.pravatar.cc/200" },
                },
            },
            {
                id: "10",
                text: "Thinking of you!",
                itsMe: true,
                createdAt: new Date("2024-03-02T00:00:00"),
                user: {
                    id: 1,
                    username: "John Doe",
                    avatar: { uri: "https://i.pravatar.cc/300" },
                },
            },
        ])
    const text = useRef()

    const onPressSend = (data) => {
        // Implement
        console.log(data);
    }
    return (
        <GuiChat messages={messages} />
    )
}
