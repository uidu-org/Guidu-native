import { GuiText } from '@uidu/native'
import { useRef, useState } from 'react'


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
        <GuiText>Ciao</GuiText>
    )
}
