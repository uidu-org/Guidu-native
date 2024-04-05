import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { GMessage } from "../types";

interface ChatContextValue {
    replyMessage: GMessage | null;
    open: boolean
    setReplyMessage: (message: GMessage) => void
    setOpen: (status: boolean) => void
}

const ChatContext = createContext<
    ChatContextValue | undefined
>(undefined);

interface ChatContextProviderProps {
    children: ReactNode;
}

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [replyMessage, setReplyMessage] = useState<GMessage | null>(null)

    const contextValue: ChatContextValue = useMemo(() => ({
        replyMessage,
        open,
        setReplyMessage,
        setOpen,
    }), [replyMessage, open, setReplyMessage, setOpen])

    return (
        <ChatContext.Provider value={contextValue} >
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error(
            'useChatContext must be used within a HandleGestureProvider'
        );
    }
    return context;
};