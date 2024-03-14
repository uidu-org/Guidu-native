import { Chatty } from "@uidu/gui-chat"
import { useRef, useState } from 'react'
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function DocsChatPage() {
    const [messages, setMessages] = useState
        ([
            {
                id: 1,
                text: 'Hello',
                me: true,
                createdAt: new Date(),
                user: {
                    id: 1,
                    username: 'John Doe',
                    avatar: { uri: 'https://i.pravatar.cc/300' },
                },
            },
        ])
    const text = useRef()

    const onPressSend = (data) => {
        // Implement
        console.log(data);
    }
    return (
        <SafeAreaProvider>
            <Chatty
                messages={messages}
                headerProps={{
                    id: 0,
                    username: "Muhammed Kaplan",
                    avatar: {
                        uri: "https://blalala.com"
                    }
                }}
                footerProps={{
                    // To prevent any unnecessary re-rendering, we're using ref instead of states.
                    onChangeText: (_text) => text.current = _text,
                    onPressSend
                }}
            />
        </SafeAreaProvider>
    )
}